import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AgentCard } from "@/components/agents/AgentCard";

// Mock data
const AGENTS = [
    {
        id: "1",
        name: "Invoice Extractor",
        role: "Automation Bot",
        description: "Extracts key fields from PDF invoices and validates totals.",
        status: "active" as const,
        tools: ["PDF Extract", "Validation"],
    },
    {
        id: "2",
        name: "Support Triager",
        role: "Customer Support",
        description: "Analyzes incoming tickets and routes them to the correct department.",
        status: "active" as const,
        tools: ["Email Read", "Classification"],
    },
    {
        id: "3",
        name: "Lead Researcher",
        role: "Data Analyst",
        description: "Enriches lead data by searching the web for company info.",
        status: "training" as const,
        tools: ["Web Search", "LinkedIn Scraper"],
    },
];

export default function AgentsPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">AI Agents</h2>
                    <p className="text-muted-foreground">
                        Manage your autonomous workforce.
                    </p>
                </div>
                <Link href="/agents/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Agent
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {AGENTS.map((agent) => (
                    <AgentCard key={agent.id} {...agent} />
                ))}
            </div>
        </div>
    );
}
