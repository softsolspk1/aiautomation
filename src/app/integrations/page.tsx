"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { IntegrationCard } from "@/components/integrations/IntegrationCard";

const INTEGRATIONS = [
    {
        id: "gmail",
        name: "Gmail",
        description: "Read and send emails, organize threads, and manage attachments.",
        category: "Communication",
        logo: "/logos/gmail.png",
        connected: true,
    },
    {
        id: "slack",
        name: "Slack",
        description: "Send notifications, create channels, and manage workspace messages.",
        category: "Communication",
        logo: "/logos/slack.png",
        connected: false,
    },
    {
        id: "salesforce",
        name: "Salesforce",
        description: "Sync leads, contacts, and opportunities with your CRM.",
        category: "CRM",
        logo: "/logos/salesforce.png",
        connected: false,
    },
    {
        id: "hubspot",
        name: "HubSpot",
        description: "Manage marketing campaigns and customer relationships.",
        category: "CRM",
        logo: "/logos/hubspot.png",
        connected: true,
    },
    {
        id: "postgres",
        name: "PostgreSQL",
        description: "Connect to your PostgreSQL database to query and write data.",
        category: "Database",
        logo: "/logos/postgres.png",
        connected: false,
    },
    {
        id: "stripe",
        name: "Stripe",
        description: "Process payments and manage subscriptions.",
        category: "Finance",
        logo: "/logos/stripe.png",
        connected: false,
    },
];

const CATEGORIES = ["All", "Communication", "CRM", "Database", "Finance"];

export default function IntegrationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredIntegrations = INTEGRATIONS.filter((integration) => {
        const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || integration.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
                    <p className="text-muted-foreground">
                        Connect your favorite tools to supercharge your workflows.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search integrations..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {CATEGORIES.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="whitespace-nowrap"
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredIntegrations.map((integration) => (
                    <IntegrationCard key={integration.id} {...integration} />
                ))}
            </div>
        </div>
    );
}
