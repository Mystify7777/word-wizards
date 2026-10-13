import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import type { LearnerSettings } from "./types";

function displayNameFromEmail(email: string) {
  const [localPart] = email.split("@");
  return localPart || "Learner";
}

export async function getLearnerSettings(): Promise<LearnerSettings> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/auth/login?next=/protected/learner/settings");
  }

  return {
    avatarUrl: null,
    displayName: displayNameFromEmail(user.email),
    email: user.email,
  };
}
