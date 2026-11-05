"use client";

import { useEffect, useRef, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { initializePendo, trackAgent } from "@/lib/pendo";
import { AGENTS, type AgentConfig } from "@/lib/agents";
import { cn } from "@/lib/utils";

type Reaction = "positive" | "negative";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  reaction?: Reaction;
}

export default function AssistantPage() {
  const [agent, setAgent] = useState<AgentConfig>(AGENTS[0]);
  const [conversationId, setConversationId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializePendo();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (content: string, suggestedPrompt: boolean) => {
    if (!content.trim() || pending) return;
    const promptId = crypto.randomUUID();
    setMessages((prev) => [...prev, { id: promptId, role: "user", content }]);
    setInput("");
    setPending(true);
    trackAgent("prompt", { agentId: agent.pendoAgentId, conversationId, messageId: promptId, content, suggestedPrompt });

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, agent: agent.key }),
      });
      const { reply, toolsUsed, model } = (await res.json()) as { reply: string; toolsUsed: string[]; model: string };
      const responseId = crypto.randomUUID();
      setMessages((prev) => [...prev, { id: responseId, role: "agent", content: reply }]);
      trackAgent("agent_response", {
        agentId: agent.pendoAgentId,
        conversationId,
        messageId: responseId,
        content: reply,
        agentModelsUsed: [model],
        toolsUsed,
      });
    } finally {
      setPending(false);
    }
  };

  const react = (message: Message, reaction: Reaction) => {
    const next = message.reaction === reaction ? undefined : reaction;
    setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, reaction: next } : m)));
    trackAgent("user_reaction", { agentId: agent.pendoAgentId, conversationId, messageId: message.id, content: next ?? "unreact" });
  };

  const newConversation = () => {
    setConversationId(crypto.randomUUID());
    setMessages([]);
  };

  const switchAgent = (next: AgentConfig) => {
    setAgent(next);
    newConversation();
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl space-y-4">
      <div className="flex flex-wrap gap-2">
        {AGENTS.map((candidate) => (
          <Button
            key={candidate.key}
            variant={candidate.key === agent.key ? "default" : "outline"}
            size="sm"
            disabled={pending}
            onClick={() => switchAgent(candidate)}
          >
            {candidate.name}
          </Button>
        ))}
      </div>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle>{agent.name}</CardTitle>
            <CardDescription>{agent.description}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={newConversation}>
            New conversation
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[420px] overflow-y-auto space-y-3 rounded-md border p-4">
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {agent.suggestedPrompts.map((prompt) => (
                  <Button key={prompt} variant="secondary" size="sm" onClick={() => send(prompt, true)}>
                    {prompt}
                  </Button>
                ))}
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div className="max-w-[80%] space-y-1">
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === "agent" && (
                    <div className="flex gap-1">
                      <Button
                        variant={message.reaction === "positive" ? "default" : "ghost"}
                        size="icon"
                        className="h-7 w-7"
                        aria-label="Thumbs up"
                        onClick={() => react(message, "positive")}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant={message.reaction === "negative" ? "default" : "ghost"}
                        size="icon"
                        className="h-7 w-7"
                        aria-label="Thumbs down"
                        onClick={() => react(message, "negative")}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {pending && <Badge variant="outline">Thinking…</Badge>}
            <div ref={bottomRef} />
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input, false);
            }}
          >
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" />
            <Button type="submit" disabled={pending}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
