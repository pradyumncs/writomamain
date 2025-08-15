import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🔔 Webhook Received:", JSON.stringify(body, null, 2));

    const customer = body.data.customer;
    const subscriptionId = body.data.subscription_id;
    const status = body.data.status;

    // Update existing subscription record
    const { error } = await supabase
      .from("subscriptions")
      .update({
        status,  // store cancelled time
        next_billing_date: body.data.next_billing_date,
        previous_billing_date: body.data.previous_billing_date,
      })
      .eq("subscription_id", subscriptionId); // only update that subscription

    if (error) {
      console.error("❌ Supabase Update Error:", error);
      return new NextResponse("Database update failed", { status: 500 });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return new NextResponse("Invalid webhook payload", { status: 400 });
  }
}
