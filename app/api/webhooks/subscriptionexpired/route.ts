import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🔔 Webhook Received (expired):", JSON.stringify(body, null, 2));

    const subscriptionId = body.data.subscription_id;
    const status = body.data.status;

    // Update subscription as expired
    const { error } = await supabase
      .from("subscriptions")
      .update({
        status,
        expired_at: body.timestamp, // store the event timestamp as expiry time
        next_billing_date: null,   // no more billing once expired
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
