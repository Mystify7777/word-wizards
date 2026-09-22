"use client";

import { CheckCircleIcon, InfoIcon, SpinnerIcon, WarningIcon, XCircleIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      icons={{
        error: <XCircleIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        loading: <SpinnerIcon className="size-4 animate-spin" />,
        success: <CheckCircleIcon className="size-4" />,
        warning: <WarningIcon className="size-4" />,
      }}
      style={
        {
          "--border-radius": "var(--radius-md)",
          "--normal-bg": "var(--ww-surface)",
          "--normal-border": "var(--ww-border)",
          "--normal-text": "var(--ww-navy)",
        } as React.CSSProperties
      }
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          toast: "ww-toast",
          success: "ww-toast-success",
          error: "ww-toast-error",
          warning: "ww-toast-warning",
          info: "ww-toast-info",
          loading: "ww-toast-loading",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
