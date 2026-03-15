"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SubscriptionSuccessRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (session_id) {
      router.replace(`/player/subscription/success?session_id=${session_id}`);
    } else {
      router.replace(`/player/subscription`);
    }
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4AA]"></div>
    </div>
  );
}
