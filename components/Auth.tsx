"use client";
import { Session } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  session: Session | null | undefined;
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
  signOut: () => {},
  profile: null,
  signIn: (email: string, password: string) => {},
  clearSession: () => {},
  caseManagerID: null,
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
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [caseManagerID, setCaseManagerID] = useState<any>(null);
  const supabaseClient = createClient();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        router.push(`/login?message=${error.message}`);
        console.error("Sign-in error:", error.message);
      } else {
        setSession(data.session);
        router.push("/");
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
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          setSession(session);
        } else if (event === "SIGNED_OUT") {
          clearSession();
        }
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          const userId = session.user.id;
          const { data: profileData, error } = await supabaseClient
            .from("users")
            .select()
            .match({ id: userId });
          if (error) {
            console.error("Error fetching user profile:", error);
          } else {
            const userProfile = profileData ? profileData[0] : null;
            setProfile(userProfile);
          }
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      }
    };
    fetchData();
    setLoading(false);
  }, [session]);

  useEffect(() => {
    const fetchCaseManagerId = async () => {
      if (profile?.type_of_user === "case_manager") {
        const { data: caseManagerIDdata, error } = await supabaseClient
          .from("case_managers")
          .select("id")
          .eq("auth_id", profile.id)
          .single();

        if (error) {
          console.error("Error in case manager ID fetch", error);
        } else if (caseManagerIDdata) {
          setCaseManagerID(caseManagerIDdata.id);
        }
      }
    };
    fetchCaseManagerId();
  }, [profile?.type_of_user]);

  const clearSession = () => {
    setSession(null);
    setProfile(null);
  };

  const value = {
    caseManagerID,
    session,
    signOut: () => supabaseClient.auth.signOut(),
    signIn,
    clearSession,
    loading,
    profile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
