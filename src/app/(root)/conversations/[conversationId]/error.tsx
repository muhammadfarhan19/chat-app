"use client";

import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import { useRouter } from "next/navigation";
import React from "react";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  React.useEffect(() => router.push("/conversations"), [router, error]);

  return <ConversationFallback />;
}
