import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Settings, PlayCircle } from "lucide-react";
import Link from "next/link";

interface AgentCardProps {
    id: string;
    name: string;
    role: string;
    description: string;
    status: "active" | "inactive" | "training";
    tools: string[];
}

export function AgentCard({ id, name, role, description, status, tools }: AgentCardProps) {
    return (
        <Card className="flex flex-col h-full hover:border-primary transition-colors">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{role}</p>
                        </div>
                    </div>
                    <Badge variant={status === "active" ? "default" : "secondary"}>
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-3">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                            {tool}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="pt-3 border-t flex gap-2">
                <Link href={`/agents/${id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                    </Button>
                </Link>
                <Button className="w-full">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Test
                </Button>
            </CardFooter>
        </Card>
    );
}
