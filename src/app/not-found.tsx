import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="h-[calc(100vh-65px)] flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-muted rounded-full">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Page Not Found</h2>
            <p className="text-muted-foreground text-center max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/dashboard">
                <Button>Return to Dashboard</Button>
            </Link>
        </div>
    );
}
