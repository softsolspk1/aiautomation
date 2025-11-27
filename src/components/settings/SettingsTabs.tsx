"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, CreditCard, Cpu, Users, Lock, Activity } from "lucide-react";

export function SettingsTabs() {
    return (
        <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="models">Models</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>
                            Manage your platform preferences and localization.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="name">Organization Name</Label>
                            <Input id="name" defaultValue="Softsols Inc." />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="language">Language (Localization)</Label>
                            <Select defaultValue="en">
                                <SelectTrigger id="language">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English (US)</SelectItem>
                                    <SelectItem value="ur">Urdu (Pakistan)</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Supports Right-to-Left (RTL) layouts for Urdu.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* Security & Governance */}
            <TabsContent value="security">
                <Card>
                    <CardHeader>
                        <CardTitle>Security & Governance</CardTitle>
                        <CardDescription>
                            Configure RBAC, audit logs, and compliance settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                                <Label className="text-base">Audit Logging</Label>
                                <p className="text-sm text-muted-foreground">
                                    Track all user actions and system events.
                                </p>
                            </div>
                            <Switch checked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                                <Label className="text-base">Enforce 2FA</Label>
                                <p className="text-sm text-muted-foreground">
                                    Require two-factor authentication for all members.
                                </p>
                            </div>
                            <Switch />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <Label>Data Residency</Label>
                            <Select defaultValue="us-east">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
                                    <SelectItem value="eu-west">EU (Ireland)</SelectItem>
                                    <SelectItem value="ap-south">Asia Pacific (Mumbai)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Billing & Metering */}
            <TabsContent value="billing">
                <Card>
                    <CardHeader>
                        <CardTitle>Billing & Usage</CardTitle>
                        <CardDescription>
                            Manage your subscription and view usage metrics.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <CreditCard className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">Enterprise Plan</p>
                                    <p className="text-sm text-muted-foreground">Billed monthly</p>
                                </div>
                            </div>
                            <Badge>Active</Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Workflow Executions</span>
                                <span className="font-medium">12,450 / 50,000</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[25%]" />
                            </div>
                            <p className="text-xs text-muted-foreground">Resets on Dec 1st</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>AI Token Usage</span>
                                <span className="font-medium">4.2M / 10M</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[42%]" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline">Manage Subscription</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* Model Management */}
            <TabsContent value="models">
                <Card>
                    <CardHeader>
                        <CardTitle>Model Management</CardTitle>
                        <CardDescription>
                            Configure LLMs and fine-tuning settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Default LLM Provider</Label>
                            <Select defaultValue="openai">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select provider" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                                    <SelectItem value="anthropic">Anthropic (Claude 3)</SelectItem>
                                    <SelectItem value="google">Google (Gemini Pro)</SelectItem>
                                    <SelectItem value="local">Local LLM (Llama 3)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                                <Label className="text-base">Auto-Switching</Label>
                                <p className="text-sm text-muted-foreground">
                                    Automatically switch models based on complexity and cost.
                                </p>
                            </div>
                            <Switch checked={true} />
                        </div>

                        <div className="space-y-2">
                            <Label>Fine-tuned Models</Label>
                            <div className="border rounded-md p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Cpu className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">invoice-extractor-v2</span>
                                    </div>
                                    <Badge variant="outline">Ready</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Cpu className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">support-classifier-v1</span>
                                    </div>
                                    <Badge variant="secondary">Training</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Team Management */}
            <TabsContent value="team">
                <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>
                            Manage access and roles.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="font-bold text-xs">AD</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Admin User</p>
                                        <p className="text-xs text-muted-foreground">admin@softsols.ai</p>
                                    </div>
                                </div>
                                <Select defaultValue="admin">
                                    <SelectTrigger className="w-[110px] h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                        <SelectItem value="viewer">Viewer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                        <span className="font-bold text-xs">JD</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">John Doe</p>
                                        <p className="text-xs text-muted-foreground">john@softsols.ai</p>
                                    </div>
                                </div>
                                <Select defaultValue="editor">
                                    <SelectTrigger className="w-[110px] h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                        <SelectItem value="viewer">Viewer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline">Invite Member</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
