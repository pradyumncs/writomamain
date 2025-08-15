import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();

    // Log the webhook event (you can replace this with DB logic later)
    console.log("🔔 Webhook Received:", JSON.stringify(body, null, 2));

    // Respond to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return new NextResponse("Invalid webhook payload", { status: 400 });
  }
}
