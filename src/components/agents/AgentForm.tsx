"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AVAILABLE_TOOLS = [
    { id: "email_read", label: "Read Emails" },
    { id: "email_send", label: "Send Emails" },
    { id: "pdf_extract", label: "Extract Data from PDF" },
    { id: "web_search", label: "Web Search" },
    { id: "slack_msg", label: "Send Slack Message" },
    { id: "db_query", label: "Query Database" },
];

export function AgentForm() {
    const [selectedTools, setSelectedTools] = useState<string[]>([]);

    const toggleTool = (toolId: string) => {
        setSelectedTools(prev =>
            prev.includes(toolId)
                ? prev.filter(id => id !== toolId)
                : [...prev, toolId]
        );
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Agent Configuration</CardTitle>
                <CardDescription>Define the personality, role, and capabilities of your AI agent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Agent Name</Label>
                        <Input id="name" placeholder="e.g., Invoice Processor" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="assistant">General Assistant</SelectItem>
                                <SelectItem value="analyst">Data Analyst</SelectItem>
                                <SelectItem value="support">Customer Support</SelectItem>
                                <SelectItem value="automation">Automation Bot</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Briefly describe what this agent does..." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="instructions">System Instructions (Prompt)</Label>
                    <Textarea
                        id="instructions"
                        placeholder="You are a helpful assistant that processes invoices..."
                        className="min-h-[150px] font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                        These instructions define how the agent behaves and makes decisions.
                    </p>
                </div>

                <div className="space-y-3">
                    <Label>Capabilities & Tools</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {AVAILABLE_TOOLS.map((tool) => (
                            <div key={tool.id} className="flex items-center space-x-2 border p-3 rounded-md">
                                <Checkbox
                                    id={tool.id}
                                    checked={selectedTools.includes(tool.id)}
                                    onCheckedChange={() => toggleTool(tool.id)}
                                />
                                <Label htmlFor={tool.id} className="text-sm font-normal cursor-pointer">
                                    {tool.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Create Agent</Button>
            </CardFooter>
        </Card>
    );
}
