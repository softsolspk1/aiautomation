import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Play, GitBranch, MessageSquare, Mail, Database, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const NodeWrapper = ({ children, selected }: { children: React.ReactNode, selected?: boolean }) => (
    <Card className={`min-w-[200px] shadow-md border-2 transition-colors ${selected ? 'border-primary' : 'border-transparent'}`}>
        {children}
    </Card>
);

const TriggerNode = memo(({ data, selected }: NodeProps) => {
    return (
        <NodeWrapper selected={selected}>
            <CardHeader className="p-3 pb-1 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900 rounded-md">
                        <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className="text-sm font-semibold">{data.label as string}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-3 pt-1">
                <p className="text-xs text-muted-foreground">Starts the workflow</p>
            </CardContent>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-primary" />
        </NodeWrapper>
    );
});

const ActionNode = memo(({ data, selected }: NodeProps) => {
    return (
        <NodeWrapper selected={selected}>
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-primary" />
            <CardHeader className="p-3 pb-1 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-md">
                        <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold">{data.label as string}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-3 pt-1">
                <p className="text-xs text-muted-foreground">Performs an action</p>
            </CardContent>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-primary" />
        </NodeWrapper>
    );
});

const ConditionNode = memo(({ data, selected }: NodeProps) => {
    return (
        <NodeWrapper selected={selected}>
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-primary" />
            <CardHeader className="p-3 pb-1 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900 rounded-md">
                        <GitBranch className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-sm font-semibold">{data.label as string}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-3 pt-1">
                <p className="text-xs text-muted-foreground">Checks a condition</p>
            </CardContent>
            <Handle type="source" position={Position.Bottom} id="true" className="w-3 h-3 bg-green-500 left-1/4" />
            <Handle type="source" position={Position.Bottom} id="false" className="w-3 h-3 bg-red-500 left-3/4" />
            <div className="absolute -bottom-5 left-1/4 text-[10px] text-green-600 font-medium -translate-x-1/2">True</div>
            <div className="absolute -bottom-5 left-3/4 text-[10px] text-red-600 font-medium -translate-x-1/2">False</div>
        </NodeWrapper>
    );
});

TriggerNode.displayName = "TriggerNode";
ActionNode.displayName = "ActionNode";
ConditionNode.displayName = "ConditionNode";

export const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
    condition: ConditionNode,
};
