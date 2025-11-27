import { AgentForm } from "@/components/agents/AgentForm";

export default function NewAgentPage() {
    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Create New Agent</h2>
                <p className="text-muted-foreground">
                    Configure a new AI agent to automate tasks.
                </p>
            </div>
            <AgentForm />
        </div>
    );
}
