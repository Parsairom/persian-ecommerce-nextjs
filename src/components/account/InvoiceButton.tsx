"use client";

import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

export function InvoiceButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => toast.success("فاکتور به‌زودی برای شما ارسال می‌شود")}
    >
      <Download className="size-4" />
      دانلود فاکتور
    </Button>
  );
}
