import { Suspense } from "react";
import { OtpView } from "@/components/auth/OtpView";

export default function OtpPage() {
  return (
    <Suspense fallback={null}>
      <OtpView />
    </Suspense>
  );
}
