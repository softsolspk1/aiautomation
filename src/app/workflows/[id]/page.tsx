import { WorkflowEditor } from "@/components/workflow/WorkflowEditor";

export default function WorkflowEditorPage({ params }: { params: { id: string } }) {
    return (
        <div className="h-[calc(100vh-65px)]">
            <WorkflowEditor />
        </div>
    );
}
