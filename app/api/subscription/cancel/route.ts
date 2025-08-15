// app/api/subscription/cancel/route.ts
import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

const client = new DodoPayments({
  bearerToken: process.env.DODO_SECRET_KEY!, // keep secret in .env.local
});

export async function PATCH(req: Request) {
  try {
    const { subscriptionId } = await req.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: "subscriptionId is required" }, { status: 400 });
    }

    const updated = await client.subscriptions.update(subscriptionId, {
      cancel_at_next_billing_date: true,
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("❌ Cancel subscription error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to cancel subscription" },
      { status: 401 }
    );
  }
}
