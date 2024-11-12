import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
 
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("id");
  if (!userID) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  console.log(`Attempting to delete user with ID: ${userID}`);

  const supabase = createRouteHandlerClient({ cookies });
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ADMIN!
  );

  try {
    // Attempt to delete the user if the userID is valid
    await supabaseAdmin.auth.admin.deleteUser(userID);

    return NextResponse.json({ status: 200, message: "User deleted successfully" });
  } catch (error: any) {
    // More detailed error handling
    console.error("Error deleting user:", error.message);
    return NextResponse.json(
      { message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  }
}
