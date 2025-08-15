import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🔔 Webhook Received:", JSON.stringify(body, null, 2));

    const customer = body.data.customer;
    const subscriptionId = body.data.subscription_id;
    const status = body.data.status;
    const productId = body.data.product_id;
    const currency = body.data.currency;

    // Insert into Supabase
    const { error } = await supabase.from("subscriptions").insert({
      customer_id: customer.customer_id,
      email: customer.email,
      name: customer.name,
      subscription_id: subscriptionId,
      status,
      product_id: productId,
      currency,
      started_at: body.data.created_at,
      next_billing_date: body.data.next_billing_date,
      previous_billing_date: body.data.previous_billing_date,
      business_id: body.business_id,
      payload_type: body.data.payload_type,
    });

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return new NextResponse("Database insert failed", { status: 500 });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return new NextResponse("Invalid webhook payload", { status: 400 });
  }
}
