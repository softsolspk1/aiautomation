"use client";

import { useState } from "react";
import { DocumentUpload } from "@/components/documents/DocumentUpload";
import { DocumentList, Document } from "@/components/documents/DocumentList";

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: "1",
            name: "Invoice-INV-2023-001.pdf",
            type: "Invoice",
            date: "2023-11-25",
            status: "Completed",
        },
        {
            id: "2",
            name: "Receipt-Starbucks.jpg",
            type: "Receipt",
            date: "2023-11-26",
            status: "Processing",
        },
    ]);

    const handleUploadComplete = (file: File) => {
        const newDoc: Document = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: "Unknown", // In a real app, this would be detected
            date: new Date().toISOString().split('T')[0],
            status: "Processing",
        };

        setDocuments((prev) => [newDoc, ...prev]);

        // Simulate processing completion
        setTimeout(() => {
            setDocuments((prev) =>
                prev.map((doc) =>
                    doc.id === newDoc.id ? { ...doc, status: "Completed", type: "Invoice" } : doc
                )
            );
        }, 3000);
    };

    return (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Document AI</h2>
                <p className="text-muted-foreground">
                    Upload documents for intelligent extraction and processing.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[350px_1fr]">
                <div className="space-y-4">
                    <h3 className="font-semibold">Upload</h3>
                    <DocumentUpload onUploadComplete={handleUploadComplete} />
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">Recent Documents</h3>
                    <DocumentList documents={documents} />
                </div>
            </div>
        </div>
    );
}
