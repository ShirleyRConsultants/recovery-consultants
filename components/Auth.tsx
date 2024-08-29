"use client";
import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext, use } from "react";
import { createClient } from "@/utils/supabase/client";


const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
  signIn: (email: string, password: string) => void;
  clearSession: () => void;
  loading: boolean;
  caseManagerID: any;

  profile: {
    email: string;
    first_name: string;
    gender: string;
    id: string;
    type_of_user: string;
    last_name: string;
    phone: string;
  } | null;
}>({
  loading: true,
  session: null,
  user: null,
  signOut: () => {},
  profile: null,
  signIn: (email: string, password: string) => {},
  clearSession: () => {},
  caseManagerID: null
});

interface UserProfile {
  email: string;
  first_name: string;
  gender: string;
  id: string;
  type_of_user: string;
  last_name: string;
  phone: string;
}

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>();
  const [caseManagerID, setCaseManagerID] = useState<any>(null);
  const supabaseClient = createClient();

  const signIn = async (email: string, password: string) => {
    console.log("SIGNING IN");
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign-in error:", error.message);
      } else {
        console.log("Sign-in successful:", data.user);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        if (event === "SIGNED_IN") {
          console.log("in the sign in event if statement");
          setSession(session);
          setUser(session?.user);
        }
        if (event === "SIGNED_OUT") {
          console.log("in the signed out event if statement");
          clearSession();
        }
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() =>{
    const fetchCaseManagerId = async () => {
      console.log("before fetch")
      try {
        if (profile?.type_of_user === "case_manager") {
          console.log("in fetch")
          const { data: caseManagerIDdata, error } = await supabaseClient
            .from("case_managers")
            .select("id")
            .eq("auth_id", profile.id)
            .single();
    
          if (error) {
            console.log("Error in case manager ID fetch", error);
            return; // Exit the function if there's an error
          }
    
          if (caseManagerIDdata) {
            console.log("setting casemanager id")
            setCaseManagerID(caseManagerIDdata.id); // Set the ID directly
          }
        }
      } catch (error) {
        console.log("Unexpected error", error);
      }
      
    };
fetchCaseManagerId()


  },[profile?.type_of_user])
  

  useEffect(() => {
    const fetchData = async () => {
      console.log("getting new user data");
      console.log(user?.id);
      if (user?.id) {
        try {
          const userId = user.id;
          const { data: profileData, error } = await supabaseClient
            .from("users")
            .select()
            .match({ id: userId });
          if (error) {
            console.error("Error fetching user profile:", error);
          } else {
            const userProfile = profileData ? profileData[0] : null;
            console.log("NEW USER TYPE", userProfile.type_of_user);
            setProfile(userProfile);
           
          }
        
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      }
      
    };
    fetchData()
  
    setLoading(false);
  }, [user]);

  const clearSession = () => {
    setSession(null);
    setProfile(null);
    setUser(null);
  };

  const value = {
    caseManagerID,
    session,
    user,
    signOut: () => supabaseClient.auth.signOut(),
    signIn,
    clearSession,
    loading,
    profile: profile || null,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
