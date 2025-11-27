"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Bot, Sparkles, Save } from "lucide-react";
import { toast } from "sonner";

const AI_MODELS = [
    { value: "gpt-4", label: "GPT-4 (OpenAI)", description: "Best for complex reasoning" },
    { value: "gpt-3.5", label: "GPT-3.5 Turbo (OpenAI)", description: "Fast and cost-effective" },
    { value: "gemini-pro", label: "Gemini Pro (Google)", description: "Multimodal capabilities" },
    { value: "claude-3", label: "Claude 3 (Anthropic)", description: "Long context understanding" },
    { value: "llama-3", label: "Llama 3 (Local)", description: "Privacy-focused, on-premise" },
];

const BOT_TYPES = [
    { value: "communication", label: "Communication Bot" },
    { value: "operations", label: "Operations & Workflow Bot" },
    { value: "sales", label: "Sales & Marketing Bot" },
    { value: "finance", label: "Finance & Accounting Bot" },
    { value: "productivity", label: "Personal Productivity Bot" },
];

const BOT_SKILLS = [
    { id: "ocr", label: "Document OCR", description: "Extract text from images and PDFs" },
    { id: "extraction", label: "Data Extraction", description: "Extract structured data from documents" },
    { id: "conversation", label: "Conversational AI", description: "Natural dialogue capabilities" },
    { id: "email", label: "Email Integration", description: "Send and read emails" },
    { id: "api", label: "API Calls", description: "Interact with external services" },
    { id: "database", label: "Database Access", description: "Query and update databases" },
    { id: "search", label: "Web Search", description: "Search the internet for information" },
    { id: "voice", label: "Speech-to-Text", description: "Convert voice to text" },
];

export default function BotBuilderPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const templateId = searchParams.get("template");

    const [botName, setBotName] = useState("");
    const [botType, setBotType] = useState("");
    const [selectedModel, setSelectedModel] = useState("gpt-4");
    const [systemPrompt, setSystemPrompt] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleSkillToggle = (skillId: string) => {
        setSelectedSkills(prev =>
            prev.includes(skillId)
                ? prev.filter(id => id !== skillId)
                : [...prev, skillId]
        );
    };

    const handleSave = () => {
        if (!botName || !botType) {
            toast.error("Please fill in all required fields");
            return;
        }

        toast.success("Bot created successfully!");
        router.push("/bots");
    };

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Bot className="h-8 w-8" />
                    {templateId ? "Customize Template" : "Create New Bot"}
                </h2>
                <p className="text-muted-foreground">
                    Configure your AI bot with custom instructions and capabilities
                </p>
            </div>

            {/* Basic Configuration */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Configuration</CardTitle>
                    <CardDescription>Define your bot's identity and purpose</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bot-name">Bot Name *</Label>
                        <Input
                            id="bot-name"
                            placeholder="e.g., Customer Support Bot"
                            value={botName}
                            onChange={(e) => setBotName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bot-type">Bot Type *</Label>
                        <Select value={botType} onValueChange={setBotType}>
                            <SelectTrigger id="bot-type">
                                <SelectValue placeholder="Select bot type" />
                            </SelectTrigger>
                            <SelectContent>
                                {BOT_TYPES.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* AI Model Selection */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        AI Model Selection
                    </CardTitle>
                    <CardDescription>Choose the AI model that powers your bot</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="model">AI Model</Label>
                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                            <SelectTrigger id="model">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {AI_MODELS.map((model) => (
                                    <SelectItem key={model.value} value={model.value}>
                                        <div className="flex flex-col">
                                            <span>{model.label}</span>
                                            <span className="text-xs text-muted-foreground">{model.description}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* System Instructions */}
            <Card>
                <CardHeader>
                    <CardTitle>System Instructions</CardTitle>
                    <CardDescription>Define how your bot should behave and respond</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="prompt">System Prompt</Label>
                        <Textarea
                            id="prompt"
                            placeholder="You are a helpful customer support assistant. Your role is to..."
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            rows={8}
                            className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                            Tip: Be specific about the bot's role, tone, and limitations
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Skills & Capabilities */}
            <Card>
                <CardHeader>
                    <CardTitle>Skills & Capabilities</CardTitle>
                    <CardDescription>Select what your bot can do</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {BOT_SKILLS.map((skill) => (
                            <div key={skill.id} className="flex items-start space-x-3 space-y-0">
                                <Checkbox
                                    id={skill.id}
                                    checked={selectedSkills.includes(skill.id)}
                                    onCheckedChange={() => handleSkillToggle(skill.id)}
                                />
                                <div className="space-y-1 leading-none">
                                    <Label
                                        htmlFor={skill.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {skill.label}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => router.push("/bots")}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Create Bot
                </Button>
            </div>
        </div>
    );
}
