type AuthErrorShape = { code?: unknown; name?: unknown };

const messages: Record<string, string> = {
  bad_code_verifier: "That sign-in session expired. Please start again.",
  bad_oauth_callback: "We couldn't complete Google sign-in. Please try again.",
  bad_oauth_state: "We couldn't verify that sign-in attempt. Please start again.",
  confirmation_failed: "We couldn't confirm your email. Please request a new confirmation link.",
  email_exists: "An account with this email already exists. Try signing in instead.",
  email_not_confirmed: "Please confirm your email before signing in. Check your inbox for the confirmation email.",
  email_provider_disabled: "Email sign-up is currently unavailable. Please try again later.",
  flow_state_expired: "That sign-in session expired. Please start again.",
  flow_state_not_found: "That sign-in session is no longer valid. Please start again.",
  invalid_credentials: "We couldn't sign you in. Check your email and password and try again.",
  missing_auth_code: "We couldn't verify your sign-in link. Please start again.",
  missing_confirmation_token: "That confirmation link is incomplete. Please request a new one.",
  oauth_callback_failed: "We couldn't finish Google sign-in. Please try again.",
  oauth_provider_not_supported: "Google sign-in is currently unavailable. Please try again later.",
  over_email_send_rate_limit: "Too many emails were requested. Please wait a little and try again.",
  over_request_rate_limit: "Too many attempts were made. Please wait a few minutes and try again.",
  password_mismatch: "Your passwords don't match.",
  provider_disabled: "Google sign-in is currently unavailable. Please try again later.",
  provider_email_needs_verification: "Please verify your email before continuing.",
  request_timeout: "The request took too long. Check your connection and try again.",
  same_password: "Choose a new password that is different from your current one.",
  signup_disabled: "New account creation is currently unavailable. Please try again later.",
  unexpected_failure: "Something went wrong on our side. Please try again.",
  user_already_exists: "An account with this email already exists. Try signing in instead.",
  user_banned: "This account is currently unavailable. Please contact support.",
  weak_password: "Choose a stronger password and try again.",
};

export function getAuthErrorCode(error: unknown) {
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as AuthErrorShape).code;
    if (typeof code === "string") return code;
  }
  if (typeof error === "object" && error !== null && "name" in error) {
    const name = (error as AuthErrorShape).name;
    if (typeof name === "string") return name;
  }
  return null;
}

export function getFriendlyAuthError(error: unknown, fallback = "Something went wrong. Please try again.") {
  const code = getAuthErrorCode(error);
  return (code && messages[code]) || fallback;
}
