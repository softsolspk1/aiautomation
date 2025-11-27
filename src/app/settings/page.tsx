import { SettingsTabs } from "@/components/settings/SettingsTabs";

export default function SettingsPage() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your organization, security, billing, and AI models.
                </p>
            </div>
            <SettingsTabs />
        </div>
    );
}
