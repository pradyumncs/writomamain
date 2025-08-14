import { GoogleGenerativeAI } from "@google/generative-ai";
import {NextResponse} from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({ text });
}
