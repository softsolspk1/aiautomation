import React from 'react';
import { Card } from "@/components/ui/card";
import { Zap, Play, GitBranch, MessageSquare, Mail, Database, Clock } from "lucide-react";

export const WorkflowSidebar = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/reactflow/label', label);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 border-r bg-background p-4 flex flex-col gap-4 h-full overflow-y-auto">
            <div className="font-semibold text-lg">Components</div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Triggers</h3>
                    <div className="space-y-2">
                        <Card
                            className="p-3 cursor-grab hover:border-primary transition-colors flex items-center gap-2"
                            draggable
                            onDragStart={(event) => onDragStart(event, 'trigger', 'Webhook')}
                        >
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">Webhook</span>
                        </Card>
                        <Card
                            className="p-3 cursor-grab hover:border-primary transition-colors flex items-center gap-2"
                            draggable
                            onDragStart={(event) => onDragStart(event, 'trigger', 'Schedule')}
                        >
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">Schedule</span>
                        </Card>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Actions</h3>
                    <div className="space-y-2">
                        <Card
                            className="p-3 cursor-grab hover:border-primary transition-colors flex items-center gap-2"
                            draggable
                            onDragStart={(event) => onDragStart(event, 'action', 'Send Email')}
                        >
                            <Mail className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Send Email</span>
                        </Card>
                        <Card
                            className="p-3 cursor-grab hover:border-primary transition-colors flex items-center gap-2"
                            draggable
                            onDragStart={(event) => onDragStart(event, 'action', 'AI Agent')}
                        >
                            <MessageSquare className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">AI Agent</span>
                        </Card>
                        <Card
                            className="p-3 cursor-grab hover:border-primary transition-colors flex items-center gap-2"
                            draggable
                            onDragStart={(event) => onDragStart(event, 'action', 'Database')}
                        >
                            <Database className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Database</span>
                        </Card>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Logic</h3>
                    <div className="space-y-2">
                        <Card
                            className="p-3 cursor-grab hover:border-primary transition-colors flex items-center gap-2"
                            draggable
                            onDragStart={(event) => onDragStart(event, 'condition', 'Condition')}
                        >
                            <GitBranch className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">Condition</span>
                        </Card>
                    </div>
                </div>
            </div>
        </aside>
    );
};
