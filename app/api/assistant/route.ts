import type { AgentKey } from "@/lib/agents";

const MODEL = "arc-scripted-v1";

interface Intent {
  keywords: string[];
  tool?: string;
  reply: string;
}

// Scripted stand-in for an LLM; varied intents give AA enrichment distinct use cases and issues to find.
const INTENTS: Record<AgentKey, Intent[]> = {
  support: [
    {
      keywords: ["email", "name", "profile"],
      tool: "get_user_profile",
      reply: "You can change your name and email on the User page, then click Save. Changes apply right away.",
    },
    {
      keywords: ["notification", "settings", "dark mode"],
      tool: "get_user_settings",
      reply: "Notification and display settings are on the User page under the Settings tab.",
    },
    {
      keywords: ["password", "login", "sign in", "locked"],
      reply: "Password resets aren't supported in this demo yet. Please contact support@arandomcompany.example.",
    },
    {
      keywords: ["help", "what can you"],
      reply: "I can help with your profile, settings and finding your way around. For billing, try the Billing Assistant.",
    },
  ],
  billing: [
    {
      keywords: ["plan", "pricing", "price", "cost", "upgrade"],
      tool: "lookup_pricing",
      reply:
        "We have three plans: Starter ($0), Pro ($29/user/month) and Enterprise (custom). Pro adds the dashboard sliders and unlimited refreshes.",
    },
    {
      keywords: ["invoice", "receipt", "billing history"],
      tool: "list_invoices",
      reply: "Your last three invoices were $29.00 each, paid on the 1st of the month. Want me to email them to you?",
    },
    {
      keywords: ["refund", "cancel", "charged twice", "overcharged"],
      reply: "Sorry, I can't process refunds or cancellations. Please contact support@arandomcompany.example.",
    },
  ],
  dashboard: [
    {
      keywords: ["revenue", "drop", "down", "decline"],
      tool: "get_dashboard_metrics",
      reply: "Revenue is down 12% week over week, mostly from fewer Pro upgrades. Users and performance are flat.",
    },
    {
      keywords: ["slider", "scenario", "model", "what if"],
      reply: "Drag the revenue, users and performance sliders on the Dashboard to model scenarios. Refresh resets them.",
    },
    {
      keywords: ["summary", "summarize", "metrics", "kpi"],
      tool: "get_dashboard_metrics",
      reply: "Revenue 75, users 60, performance 85. Performance is your strongest metric this week.",
    },
    {
      keywords: ["export", "csv", "download"],
      reply: "Exporting dashboard data isn't available yet.",
    },
  ],
};

export async function POST(request: Request) {
  const { message, agent } = (await request.json()) as { message: string; agent: AgentKey };
  const text = message.toLowerCase();
  const intent = (INTENTS[agent] ?? INTENTS.support).find((candidate) =>
    candidate.keywords.some((keyword) => text.includes(keyword))
  );

  // Simulated model latency so the UI behaves like a real agent.
  await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 600));

  return Response.json({
    reply: intent?.reply ?? `I'm not sure how to help with "${message}". Could you rephrase that?`,
    toolsUsed: intent?.tool ? [intent.tool] : [],
    model: MODEL,
  });
}
