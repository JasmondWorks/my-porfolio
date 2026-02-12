"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import {
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertOctagon,
} from "lucide-react";
import { createPortal } from "react-dom";

type ToastType = "success" | "error" | "warning" | "info" | "destructive";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined,
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    (message: string, type: ToastType = "info", duration = 3000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast],
  );

  const value = React.useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={cn(
                  "pointer-events-auto flex items-center justify-between p-4 rounded-lg shadow-lg border animate-in slide-in-from-right-full fade-in duration-300",
                  "bg-surface-base text-text-primary",
                  toast.type === "success" &&
                    "border-state-success/20 bg-state-success/5",
                  toast.type === "error" &&
                    "border-state-error/20 bg-state-error/5",
                  toast.type === "warning" &&
                    "border-state-warning/20 bg-state-warning/5",
                  toast.type === "info" &&
                    "border-state-info/20 bg-state-info/5",
                )}
              >
                <div className="flex items-center gap-3">
                  {toast.type === "success" && (
                    <CheckCircle className="h-5 w-5 text-state-success" />
                  )}
                  {toast.type === "error" && (
                    <AlertOctagon className="h-5 w-5 text-state-error" />
                  )}
                  {toast.type === "warning" && (
                    <AlertTriangle className="h-5 w-5 text-state-warning" />
                  )}
                  {toast.type === "info" && (
                    <Info className="h-5 w-5 text-state-info" />
                  )}
                  <p className="text-sm font-medium">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="ml-4 text-text-tertiary hover:text-text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
