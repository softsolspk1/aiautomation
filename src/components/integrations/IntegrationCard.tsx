"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, ExternalLink } from "lucide-react";
import Image from "next/image";

interface IntegrationCardProps {
    id: string;
    name: string;
    description: string;
    category: string;
    logo: string; // In a real app, this would be an image URL
    connected?: boolean;
}

export function IntegrationCard({ id, name, description, category, logo, connected: initialConnected = false }: IntegrationCardProps) {
    const [connected, setConnected] = useState(initialConnected);
    const [loading, setLoading] = useState(false);

    const toggleConnection = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setConnected(!connected);
            setLoading(false);
        }, 1000);
    };

    return (
        <Card className="flex flex-col h-full hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xl font-bold">
                        {/* Placeholder for logo */}
                        {name.charAt(0)}
                    </div>
                    <div>
                        <CardTitle className="text-base">{name}</CardTitle>
                        <span className="text-xs text-muted-foreground">{category}</span>
                    </div>
                </div>
                {connected && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                        Connected
                    </Badge>
                )}
            </CardHeader>
            <CardContent className="flex-1 py-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {description}
                </p>
            </CardContent>
            <CardFooter className="pt-0">
                <Button
                    variant={connected ? "outline" : "default"}
                    className="w-full"
                    onClick={toggleConnection}
                    disabled={loading}
                >
                    {loading ? (
                        "Processing..."
                    ) : connected ? (
                        <>
                            <Check className="mr-2 h-4 w-4" />
                            Manage
                        </>
                    ) : (
                        <>
                            <Plus className="mr-2 h-4 w-4" />
                            Connect
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
