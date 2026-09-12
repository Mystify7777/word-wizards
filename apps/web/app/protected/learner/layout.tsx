import { redirect } from "next/navigation";

import { LearnerShell } from "@/components/learner/learner-shell";
import { createClient } from "@/lib/supabase/server";

export default async function LearnerLayout({ children }: LayoutProps<"/protected/learner">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/protected/learner");
  }

  return <LearnerShell>{children}</LearnerShell>;
}
