import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🔔 Webhook Received (renewed):", JSON.stringify(body, null, 2));

    const subscriptionId = body.data.subscription_id;
    const status = body.data.status;

    // Update subscription as renewed (active again)
    const { error } = await supabase
      .from("subscriptions")
      .update({
        status, // should be "active"
        next_billing_date: body.data.next_billing_date,
        previous_billing_date: body.data.previous_billing_date,
      })
      .eq("subscription_id", subscriptionId);

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
