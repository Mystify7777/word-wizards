import { redirect } from "next/navigation";

import { LearnerShell } from "@/components/learner/learner-shell";
import { createClient } from "@/lib/supabase/server";

export default async function LearnerLayout({ children }: LayoutProps<"/learner">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/learner");
  }

  return <LearnerShell>{children}</LearnerShell>;
}
