import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function WorkflowsPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Workflows</h2>
                    <p className="text-muted-foreground">
                        Manage and automate your business processes.
                    </p>
                </div>
                <Link href="/workflows/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Workflow
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Placeholder Workflows */}
                <Link href="/workflows/1">
                    <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle>Invoice Processing</CardTitle>
                            <CardDescription>Auto-extract data from PDF invoices</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                Active
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/workflows/2">
                    <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle>Lead Qualification</CardTitle>
                            <CardDescription>Score leads from website forms</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                Active
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/workflows/3">
                    <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle>Customer Onboarding</CardTitle>
                            <CardDescription>Send welcome emails and setup account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                Paused
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
