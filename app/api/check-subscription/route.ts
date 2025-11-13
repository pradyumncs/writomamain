import { NextResponse } from "next/server";
import { auth } from "auth";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ isActive: false }, { status: 200 });
    }

    // Look up subscription and customer_id by email in Supabase
    const { data: subs, error } = await supabase
      .from("subscriptions")
      .select("status, customer_id")
      .eq("email", userEmail)
      .eq("status", "active")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ isActive: false, error: 'Failed to check subscription' }, { status: 500 });
    }

    const isActive = !!subs;

    return NextResponse.json({ isActive }, { status: 200 });
  } catch (error) {
    console.error('Error checking subscription:', error);
    return NextResponse.json({ isActive: false, error: 'Internal server error' }, { status: 500 });
  }
}

