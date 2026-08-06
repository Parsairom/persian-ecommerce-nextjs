"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "var(--surface)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          fontFamily: "var(--font-vazirmatn)",
          borderRadius: "0.9rem",
        },
      }}
    />
  );
}
