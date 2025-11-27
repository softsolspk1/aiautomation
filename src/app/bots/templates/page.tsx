"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Bot, MessageSquare, FileText, DollarSign, TrendingUp, Users, Sparkles } from "lucide-react";

const BOT_TEMPLATES = [
    {
        id: "1",
        name: "Customer Support Bot",
        description: "Handle customer inquiries, FAQs, and ticket routing with AI",
        category: "Communication",
        icon: MessageSquare,
        features: ["24/7 availability", "Multi-language", "Ticket escalation"],
        popular: true,
    },
    {
        id: "2",
        name: "Invoice Processing Bot",
        description: "Extract data from invoices, validate, and create accounting entries",
        category: "Operations",
        icon: FileText,
        features: ["OCR extraction", "Data validation", "QuickBooks integration"],
        popular: true,
    },
    {
        id: "3",
        name: "Lead Qualification Bot",
        description: "Qualify leads, score prospects, and route to sales team",
        category: "Sales",
        icon: TrendingUp,
        features: ["Lead scoring", "CRM sync", "Email follow-up"],
        popular: false,
    },
    {
        id: "4",
        name: "Expense Categorization Bot",
        description: "Automatically categorize expenses and generate reports",
        category: "Finance",
        icon: DollarSign,
        features: ["Auto-categorization", "Receipt OCR", "Report generation"],
        popular: false,
    },
    {
        id: "5",
        name: "HR Onboarding Bot",
        description: "Automate employee onboarding, document collection, and training",
        category: "Operations",
        icon: Users,
        features: ["Document collection", "Task scheduling", "Training reminders"],
        popular: false,
    },
    {
        id: "6",
        name: "Content Writer Bot",
        description: "Generate blog posts, social media content, and marketing copy",
        category: "Sales",
        icon: Sparkles,
        features: ["SEO optimization", "Multi-format", "Brand voice"],
        popular: true,
    },
];

export default function BotTemplatesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredTemplates = BOT_TEMPLATES.filter((template) => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Bot className="h-8 w-8" />
                        Bot Templates
                    </h2>
                    <p className="text-muted-foreground">
                        Start with pre-built templates and customize to your needs
                    </p>
                </div>
                <Link href="/bots/builder">
                    <Button variant="outline">
                        Build from Scratch
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList>
                    <TabsTrigger value="all">All Templates</TabsTrigger>
                    <TabsTrigger value="Communication">Communication</TabsTrigger>
                    <TabsTrigger value="Operations">Operations</TabsTrigger>
                    <TabsTrigger value="Sales">Sales & Marketing</TabsTrigger>
                    <TabsTrigger value="Finance">Finance</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedCategory} className="mt-6">
                    {/* Popular Templates */}
                    {selectedCategory === "all" && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Popular Templates</h3>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {BOT_TEMPLATES.filter(t => t.popular).map((template) => (
                                    <TemplateCard key={template.id} template={template} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Templates */}
                    <div>
                        {selectedCategory === "all" && (
                            <h3 className="text-lg font-semibold mb-4">All Templates</h3>
                        )}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredTemplates.map((template) => (
                                <TemplateCard key={template.id} template={template} />
                            ))}
                        </div>
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-12">
                            <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                            <p className="text-muted-foreground">
                                Try a different search term or category
                            </p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function TemplateCard({ template }: { template: typeof BOT_TEMPLATES[0] }) {
    const Icon = template.icon;

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {template.popular && (
                        <Badge variant="secondary" className="text-xs">
                            Popular
                        </Badge>
                    )}
                </div>
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription className="text-sm">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Features:</p>
                    <ul className="space-y-1">
                        {template.features.map((feature, idx) => (
                            <li key={idx} className="text-xs flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-primary" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <Link href={`/bots/builder?template=${template.id}`}>
                    <Button className="w-full" size="sm">
                        Use Template
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
