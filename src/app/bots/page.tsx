"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bot, Plus, Search, Play, Pause, Settings, TrendingUp, MessageSquare, Zap } from "lucide-react";

const MOCK_BOTS = [
    {
        id: "1",
        name: "Customer Support Bot",
        type: "Communication",
        status: "active",
        model: "GPT-4",
        queries: 1234,
        accuracy: 94,
        channels: ["Website", "WhatsApp"],
    },
    {
        id: "2",
        name: "Invoice Processor",
        type: "Operations",
        status: "active",
        model: "Gemini Pro",
        queries: 456,
        accuracy: 98,
        channels: ["Email"],
    },
    {
        id: "3",
        name: "Lead Qualification Bot",
        type: "Sales & Marketing",
        status: "paused",
        model: "Claude 3",
        queries: 789,
        accuracy: 91,
        channels: ["Website", "Slack"],
    },
];

export default function BotsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBots = MOCK_BOTS.filter((bot) =>
        bot.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Bot className="h-8 w-8" />
                        AI Bots
                    </h2>
                    <p className="text-muted-foreground">
                        Create and manage your AI-powered automation bots
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href="/bots/templates">
                        <Button variant="outline">
                            Browse Templates
                        </Button>
                    </Link>
                    <Link href="/bots/builder">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Bot
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Bots</CardTitle>
                        <Bot className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{MOCK_BOTS.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {MOCK_BOTS.filter(b => b.status === "active").length} active
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {MOCK_BOTS.reduce((sum, bot) => sum + bot.queries, 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-green-500">+12%</span> from last week
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Accuracy</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Math.round(MOCK_BOTS.reduce((sum, bot) => sum + bot.accuracy, 0) / MOCK_BOTS.length)}%
                        </div>
                        <p className="text-xs text-muted-foreground">Across all bots</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search bots..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Bots List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredBots.map((bot) => (
                    <Card key={bot.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Bot className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">{bot.name}</CardTitle>
                                        <CardDescription className="text-xs">{bot.type}</CardDescription>
                                    </div>
                                </div>
                                <Badge variant={bot.status === "active" ? "default" : "secondary"}>
                                    {bot.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Model</span>
                                    <span className="font-medium">{bot.model}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Queries</span>
                                    <span className="font-medium">{bot.queries.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Accuracy</span>
                                    <span className="font-medium text-green-600">{bot.accuracy}%</span>
                                </div>
                                <div className="flex gap-1 flex-wrap">
                                    {bot.channels.map((channel) => (
                                        <Badge key={channel} variant="outline" className="text-xs">
                                            {channel}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    {bot.status === "active" ? (
                                        <>
                                            <Pause className="h-3 w-3 mr-1" />
                                            Pause
                                        </>
                                    ) : (
                                        <>
                                            <Play className="h-3 w-3 mr-1" />
                                            Activate
                                        </>
                                    )}
                                </Button>
                                <Link href={`/bots/${bot.id}/settings`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Settings className="h-3 w-3 mr-1" />
                                        Configure
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredBots.length === 0 && (
                <div className="text-center py-12">
                    <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No bots found</h3>
                    <p className="text-muted-foreground mb-4">
                        {searchQuery ? "Try a different search term" : "Create your first bot to get started"}
                    </p>
                    <Link href="/bots/builder">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Bot
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
