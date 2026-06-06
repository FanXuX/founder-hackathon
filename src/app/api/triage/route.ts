import { NextResponse } from "next/server";
import { fallbackResult } from "@/lib/triage/fallback-result";
import { normalizeResult } from "@/lib/triage/normalize";
import { systemPrompt } from "@/lib/triage/prompt";
import type { TriageResult } from "@/lib/triage/types";

const seedHistory = fallbackResult.history;

type AiProviderConfig = {
  apiKey?: string;
  baseUrl: string;
  model: string;
};

function getAiProviderConfig(): AiProviderConfig | null {
  const provider = process.env.AI_PROVIDER ?? "openai";

  if (provider === "qwen") {
    return {
      apiKey: process.env.QWEN_API_KEY,
      baseUrl:
        process.env.QWEN_BASE_URL ??
        "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
      model: process.env.QWEN_MODEL ?? "qwen-plus",
    };
  }

  return {
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: "https://api.openai.com/v1",
    model: process.env.OPENAI_MODEL ?? "gpt-4o",
  };
}

export async function POST(request: Request) {
  const { input } = (await request.json()) as { input?: string };

  if (!input?.trim()) {
    return NextResponse.json(
      { error: "Founder input is required." },
      { status: 400 },
    );
  }

  const providerConfig = getAiProviderConfig();

  if (!providerConfig?.apiKey) {
    return NextResponse.json(fallbackResult);
  }

  try {
    const response = await fetch(`${providerConfig.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${providerConfig.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: providerConfig.model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: JSON.stringify({
              today: new Date().toISOString().slice(0, 10),
              founder_input: input,
              seed_history: seedHistory,
            }),
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(fallbackResult);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(fallbackResult);
    }

    return NextResponse.json(
      normalizeResult(JSON.parse(content) as Partial<TriageResult>),
    );
  } catch {
    return NextResponse.json(fallbackResult);
  }
}
