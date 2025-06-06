"use client";

import * as React from "react";
import { toast } from "@/components/ui/use-toast";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ToastOptions {
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

const TOAST_STYLES: Record<ToastType, { className: string }> = {
  default: {
    className: "",
  },
  success: {
    className: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/10 dark:border-green-900/20 dark:text-green-100",
  },
  error: {
    className: "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/10 dark:border-red-900/20 dark:text-red-100",
  },
  warning: {
    className: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/10 dark:border-yellow-900/20 dark:text-yellow-100",
  },
  info: {
    className: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/10 dark:border-blue-900/20 dark:text-blue-100",
  },
};

export function useToast() {
  const showToast = React.useCallback(
    ({ title, description, type = "default", duration = 3000 }: ToastOptions) => {
      toast({
        title,
        description,
        duration,
        className: TOAST_STYLES[type].className,
      });
    },
    []
  );

  const success = React.useCallback(
    (options: Omit<ToastOptions, "type">) => {
      showToast({ ...options, type: "success" });
    },
    [showToast]
  );

  const error = React.useCallback(
    (options: Omit<ToastOptions, "type">) => {
      showToast({ ...options, type: "error" });
    },
    [showToast]
  );

  const warning = React.useCallback(
    (options: Omit<ToastOptions, "type">) => {
      showToast({ ...options, type: "warning" });
    },
    [showToast]
  );

  const info = React.useCallback(
    (options: Omit<ToastOptions, "type">) => {
      showToast({ ...options, type: "info" });
    },
    [showToast]
  );

  return {
    toast: showToast,
    success,
    error,
    warning,
    info,
  };
}

export type { ToastOptions };
