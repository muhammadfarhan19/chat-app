import { Card } from "@/components/ui/card";
import React from "react";

const ConversationFallback = () => {
  return (
    <Card className="hidden w-full h-full p-2 items-center justify-center bg-secondary text-secondary-foreground lg:flex ">
        Select/start a conversation to get started!
    </Card>
  );
};

export default ConversationFallback;
