export type LearnerSettings = {
  avatarUrl: string | null;
  displayName: string;
  email: string;
};

export type SettingsActionResult = { ok: true } | { ok: false; error: string; deferred?: boolean };
