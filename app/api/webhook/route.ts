import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const webhookData = await req.json();

    console.log("🔔 Webhook received:", webhookData);

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

// optional: block other methods
export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}
