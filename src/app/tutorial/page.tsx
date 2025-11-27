import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Bot, Workflow, Zap, FileText, MessageSquare } from "lucide-react";

export default function TutorialPage() {
    return (
        <div className="p-6 space-y-6 max-w-5xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <BookOpen className="h-8 w-8" />
                    Tutorial & User Guide
                </h2>
                <p className="text-muted-foreground mt-2">
                    Learn how to use Softsols AI Automation Platform effectively
                </p>
            </div>

            {/* Getting Started */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        Getting Started
                    </CardTitle>
                    <CardDescription>Welcome to your AI automation journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">1. Dashboard Overview</h4>
                        <p className="text-sm text-muted-foreground">
                            The dashboard provides a real-time view of your automation metrics including:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                            <li>Total active workflows and their execution trends</li>
                            <li>Number of AI agents deployed</li>
                            <li>Tasks automated and cost savings achieved</li>
                            <li>Visual analytics with charts and graphs</li>
                        </ul>
                    </div>

                    <Separator />

                    <div>
                        <h4 className="font-semibold mb-2">2. Navigation</h4>
                        <p className="text-sm text-muted-foreground">
                            Use the left sidebar to navigate between different sections:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                            <li><strong>Dashboard</strong>: View analytics and metrics</li>
                            <li><strong>Workflows</strong>: Create and manage automation flows</li>
                            <li><strong>AI Agents</strong>: Configure intelligent agents</li>
                            <li><strong>Documents</strong>: Upload and process documents with AI</li>
                            <li><strong>Integrations</strong>: Connect external services</li>
                            <li><strong>Chat & Support</strong>: Manage customer conversations</li>
                            <li><strong>Settings</strong>: Configure security, billing, and models</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* How to Create AI Agents */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-pink-700" />
                        How to Create AI Agents
                    </CardTitle>
                    <CardDescription>Build intelligent agents to automate complex tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Step 1: Navigate to AI Agents</h4>
                        <p className="text-sm text-muted-foreground">
                            Click on "AI Agents" in the left sidebar to view your existing agents.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Step 2: Create New Agent</h4>
                        <p className="text-sm text-muted-foreground">
                            Click the "Create Agent" button to open the agent builder form.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Step 3: Configure Agent Details</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li><strong>Name</strong>: Give your agent a descriptive name (e.g., "Invoice Processor")</li>
                            <li><strong>Role</strong>: Select the agent's primary function (Customer Support, Data Analyst, etc.)</li>
                            <li><strong>Description</strong>: Briefly describe what the agent does</li>
                            <li><strong>System Instructions</strong>: Define the agent's behavior and guidelines</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Step 4: Select Capabilities & Tools</h4>
                        <p className="text-sm text-muted-foreground">
                            Choose which tools your agent can access:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                            <li><strong>Email</strong>: Send and read emails</li>
                            <li><strong>Web Search</strong>: Search the internet for information</li>
                            <li><strong>Database</strong>: Query and update databases</li>
                            <li><strong>API Calls</strong>: Interact with external APIs</li>
                            <li><strong>Document Processing</strong>: Extract data from documents</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Step 5: Save and Deploy</h4>
                        <p className="text-sm text-muted-foreground">
                            Click "Create Agent" to save. Your agent will be ready to use in workflows.
                        </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">💡 Pro Tip</p>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            Start with clear, specific instructions. For example: "You are an invoice processing agent.
                            Extract vendor name, amount, and date from invoices. Validate the data and create entries in QuickBooks."
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* How to Build Workflows */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Workflow className="h-5 w-5 text-violet-500" />
                        How to Build AI Workflows
                    </CardTitle>
                    <CardDescription>Create automated processes with drag-and-drop</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Step 1: Open Workflow Builder</h4>
                        <p className="text-sm text-muted-foreground">
                            Navigate to "Workflows" and click "Create Workflow" or select an existing workflow to edit.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Step 2: Add a Trigger</h4>
                        <p className="text-sm text-muted-foreground">
                            Drag a "Trigger" node from the sidebar onto the canvas. Triggers start your workflow:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                            <li><strong>Email Received</strong>: When a new email arrives</li>
                            <li><strong>Document Uploaded</strong>: When a file is uploaded</li>
                            <li><strong>Schedule</strong>: Run at specific times (daily, weekly, etc.)</li>
                            <li><strong>Webhook</strong>: Triggered by external systems</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Step 3: Add Actions</h4>
                        <p className="text-sm text-muted-foreground">
                            Drag "Action" nodes to define what happens next:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                            <li><strong>AI Agent</strong>: Process data with an AI agent</li>
                            <li><strong>Send Email</strong>: Send notifications or responses</li>
                            <li><strong>Update Database</strong>: Store or retrieve data</li>
                            <li><strong>Call API</strong>: Integrate with external services</li>
                            <li><strong>Transform Data</strong>: Format or modify information</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Step 4: Add Conditions (Optional)</h4>
                        <p className="text-sm text-muted-foreground">
                            Use "Condition" nodes to create branching logic:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                            <li>If invoice amount &gt; $1000, send for approval</li>
                            <li>If customer sentiment is negative, escalate to human agent</li>
                            <li>If document type is "receipt", process differently</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Step 5: Connect Nodes</h4>
                        <p className="text-sm text-muted-foreground">
                            Click and drag from the output handle of one node to the input handle of another to create connections.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Step 6: Save and Activate</h4>
                        <p className="text-sm text-muted-foreground">
                            Click "Save" to store your workflow. Toggle the "Active" switch to start automation.
                        </p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">✅ Example Workflow</p>
                        <p className="text-sm text-green-800 dark:text-green-200">
                            <strong>Invoice Processing:</strong> Email Trigger → Extract Invoice Data (AI Agent) →
                            Validate Amount (Condition) → If &gt; $1000: Send Approval Email | If ≤ $1000: Create QuickBooks Entry
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Document AI */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-orange-700" />
                        Using Document AI
                    </CardTitle>
                    <CardDescription>Process documents with intelligent OCR and NLP</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Upload Documents</h4>
                        <p className="text-sm text-muted-foreground">
                            Navigate to "Documents" and drag files into the upload zone. Supported formats: PDF, JPG, PNG.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Processing</h4>
                        <p className="text-sm text-muted-foreground">
                            The AI will automatically:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                            <li>Extract text using OCR (Optical Character Recognition)</li>
                            <li>Classify document type (invoice, receipt, contract, etc.)</li>
                            <li>Extract key fields (dates, amounts, names, etc.)</li>
                            <li>Validate and structure the data</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">View Results</h4>
                        <p className="text-sm text-muted-foreground">
                            Once processing is complete, click "View Data" to see extracted information.
                            You can export this data or use it in workflows.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Chat & Support */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-green-700" />
                        Managing Customer Conversations
                    </CardTitle>
                    <CardDescription>Omnichannel support with AI assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Conversation Dashboard</h4>
                        <p className="text-sm text-muted-foreground">
                            The Chat & Support page shows all customer conversations from multiple channels
                            (Web, WhatsApp, Email) in one unified inbox.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">AI-Assisted Responses</h4>
                        <p className="text-sm text-muted-foreground">
                            AI agents can handle common queries automatically. Human agents can take over
                            for complex issues with full conversation context preserved.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Ticket Management</h4>
                        <p className="text-sm text-muted-foreground">
                            Mark conversations as resolved, assign to team members, and track response times.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle>Best Practices</CardTitle>
                    <CardDescription>Tips for maximizing automation success</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <p className="text-sm font-semibold">🎯 Start Small</p>
                        <p className="text-sm text-muted-foreground">
                            Begin with simple workflows and gradually add complexity as you learn the platform.
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold">🧪 Test Thoroughly</p>
                        <p className="text-sm text-muted-foreground">
                            Always test workflows with sample data before activating them for production use.
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold">📊 Monitor Performance</p>
                        <p className="text-sm text-muted-foreground">
                            Regularly check the dashboard to ensure workflows are running smoothly and achieving desired results.
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold">🔒 Security First</p>
                        <p className="text-sm text-muted-foreground">
                            Configure proper access controls in Settings and enable audit logging for compliance.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
