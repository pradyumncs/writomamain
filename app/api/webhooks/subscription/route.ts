import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const webhookData = await req.json();

    // Log the incoming webhook
    console.log("🔔 Webhook received:", webhookData);

    // Always respond quickly to acknowledge
    return NextResponse.json(
      { message: "Webhook received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { message: "Invalid webhook payload" },
      { status: 400 }
    );
  }
}

// (Optional) If you want to block other methods
export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}
