import { AccountSection } from "@/components/settings/account-section";
import { ProfileForm } from "@/components/settings/profile-form";
import { Card, CardContent } from "@/components/ui/card";
import { getLearnerSettings } from "@/lib/settings/service";

export default async function SettingsPage() {
  const settings = await getLearnerSettings();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Your account</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Settings</h1>
        <p className="max-w-2xl text-muted-foreground">Manage your profile and account.</p>
      </section>

      <section aria-labelledby="profile-heading" className="space-y-4">
        <h2 className="font-heading text-xl font-semibold" id="profile-heading">
          Profile
        </h2>
        <Card>
          <CardContent>
            <ProfileForm settings={settings} />
          </CardContent>
        </Card>
      </section>

      <AccountSection />
    </div>
  );
}
