import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = (body?.text ?? "").toString();
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Missing 'text' in request body" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});
    const prompt = `You are an expert AI-content detector embedded in a SaaS. Analyze the input and respond ONLY with strict JSON, no prose, no code fences.
Schema: {"verdict":"AI-generated|Human-written","aiProbability":0-100,"confidence":0-100,"reasons":[string,string,string],"summary":string,"advice":string}
Instructions:
- "aiProbability" is your estimated percentage that the text is AI-generated (0-100)
- "confidence" is how certain you are in the verdict (0-100)
- "reasons" must be 1-3 concise bullets
- Keep "summary" to 1-2 sentences
- "advice" should be short and actionable for the user
Return only valid JSON matching the schema.

Input:\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let raw = response.text();

    // Try to coerce to JSON in case the model adds formatting
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (_err) {
      // Fallback minimal object if parsing fails
      parsed = {
        verdict: "Unknown",
        aiProbability: 0,
        confidence: 0,
        reasons: ["Could not parse model output"],
        summary: "The detector returned an unstructured response.",
        advice: "Try again or adjust the input.",
      };
    }

    // Normalize fields and clamp numbers
    const verdict: string = typeof parsed?.verdict === "string" ? parsed.verdict : "Unknown";
    const aiProbability: number = Math.max(0, Math.min(100, Number(parsed?.aiProbability ?? 0)));
    const confidence: number = Math.max(0, Math.min(100, Number(parsed?.confidence ?? 0)));
    const reasons: string[] = Array.isArray(parsed?.reasons) ? parsed.reasons.slice(0, 3).map((r: any) => String(r)) : [];
    const summary: string = typeof parsed?.summary === "string" ? parsed.summary : "";
    const advice: string = typeof parsed?.advice === "string" ? parsed.advice : "";

    return NextResponse.json({ verdict, aiProbability, confidence, reasons, summary, advice, raw });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Unexpected error" }, { status: 500 });
  }
}


