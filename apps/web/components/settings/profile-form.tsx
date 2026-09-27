"use client";

import { CameraIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/settings/actions";
import type { LearnerSettings } from "@/lib/settings/types";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/avif"];
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts.at(-1)?.[0] ?? ""}`.toUpperCase();
}

export function ProfileForm({ settings }: { settings: LearnerSettings }) {
  const [displayName, setDisplayName] = useState(settings.displayName);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(settings.avatarUrl);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const isDirty = displayName.trim() !== settings.displayName;

  const revokeObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  useEffect(
    () => () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    },
    [],
  );

  const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Choose a PNG, JPG, WebP, or AVIF image.");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setError("Images must be 2 MB or smaller.");
      return;
    }

    setError(null);
    revokeObjectUrl();
    const nextUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextUrl;
    setAvatarUrl(nextUrl);
  };

  const handleRemovePhoto = () => {
    revokeObjectUrl();
    setAvatarUrl(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    const result = await updateProfile({ displayName });
    setIsSaving(false);

    if (!result.ok) {
      if (result.deferred) {
        toast.info(result.error);
        return;
      }
      setError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success("Profile updated.");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex items-center gap-5">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden border border-border bg-muted font-heading text-xl font-bold text-primary">
          {avatarUrl ? (
            // biome-ignore lint/performance/noImgElement: the preview src is a blob: URL, which next/image cannot optimise.
            <img alt="" className="size-full object-cover" src={avatarUrl} />
          ) : (
            <span aria-hidden="true">{getInitials(displayName)}</span>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => fileInputRef.current?.click()} size="sm" type="button" variant="outline">
              <CameraIcon data-icon="inline-start" />
              Change photo
            </Button>
            {avatarUrl ? (
              <Button onClick={handleRemovePhoto} size="sm" type="button" variant="ghost">
                Remove
              </Button>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">PNG, JPG, WebP, or AVIF up to 2 MB.</p>
          <input
            accept="image/png,image/jpeg,image/webp,image/avif"
            className="sr-only"
            onChange={handlePhoto}
            ref={fileInputRef}
            type="file"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="display-name">Display name</Label>
        <Input
          autoComplete="nickname"
          id="display-name"
          maxLength={60}
          onChange={(event) => setDisplayName(event.target.value)}
          pattern=".*\S.*"
          required
          title="Display name cannot be blank."
          value={displayName}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input aria-describedby="email-help" id="email" readOnly value={settings.email} />
        <p className="text-xs text-muted-foreground" id="email-help">
          Email changes are handled separately for security.
        </p>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="space-y-2">
        <Button disabled={isSaving || !isDirty} type="submit">
          {isSaving ? "Saving..." : "Save profile"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Display name changes aren&apos;t stored yet — saving arrives with the profile database.
        </p>
      </div>
    </form>
  );
}
