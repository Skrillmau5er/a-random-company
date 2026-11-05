export type AgentKey = "support" | "billing" | "dashboard";

export interface AgentConfig {
  key: AgentKey;
  name: string;
  // Pendo Agent Analytics agent id on pendo-link sub A_Random_Company, app "A Random Company".
  pendoAgentId: string;
  description: string;
  suggestedPrompts: string[];
}

export const AGENTS: AgentConfig[] = [
  {
    key: "support",
    name: "ARC Assistant",
    pendoAgentId: "xVLI1vZapNGvnC6o1YZ5qLwCSPY",
    description: "General help with your profile, settings and getting around.",
    suggestedPrompts: ["How do I update my email?", "What can you help with?", "How do I reset my password?"],
  },
  {
    key: "billing",
    name: "Billing Assistant",
    pendoAgentId: "_vDYMv8K9j7GoOGQ_pLI4Lcj7xk",
    description: "Plans, pricing, invoices and refunds.",
    suggestedPrompts: ["What plans do you offer?", "Can I get a refund?", "Where are my invoices?"],
  },
  {
    key: "dashboard",
    name: "Dashboard Copilot",
    pendoAgentId: "JkHZjIPIwg5rkKLiFYPi3GxDhrw",
    description: "Explains your metrics and helps you model scenarios.",
    suggestedPrompts: ["Why did revenue drop?", "How do the sliders work?", "Summarize my metrics"],
  },
];
