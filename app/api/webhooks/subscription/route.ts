import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use service role for insert
);

export async function POST(req: Request) {
  try {
    // Parse JSON body
    const body = await req.json();

    console.log("🔔 Webhook Received:", JSON.stringify(body, null, 2));

    const { data } = body;
    const customer = data?.customer;

    // Extract important values
    const record = {
      subscription_id: data?.subscription_id,
      product_id: data?.product_id,
      status: data?.status,
      customer_id: customer?.customer_id,
      email: customer?.email,
      name: customer?.name,
      billing_city: data?.billing?.city,
      billing_country: data?.billing?.country,
      billing_state: data?.billing?.state,
      billing_zip: data?.billing?.zipcode,
      next_billing_date: data?.next_billing_date,
      currency: data?.currency,
      recurring_amount: data?.recurring_pre_tax_amount,
      created_at: data?.created_at,
    };

    // Insert into Supabase table (example: "subscriptions")
    const { error } = await supabase
      .from("subscriptions")
      .insert([record]);

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return new NextResponse("Database insert failed", { status: 500 });
    }

    return NextResponse.json({ received: true, stored: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return new NextResponse("Invalid webhook payload", { status: 400 });
  }
}
