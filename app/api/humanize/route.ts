import { GoogleGenerativeAI } from "@google/generative-ai";
import {NextResponse} from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    const { text } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});
    const prompt = `Humanize the following text while preserving its meaning. Use a natural human tone and organize the result as 2–4 concise paragraphs, separated by a blank line. Do not add claims about detection or guarantees.\n\nText:\n${text}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const humanizedText = response.text();
    return NextResponse.json({ text: humanizedText });
}
