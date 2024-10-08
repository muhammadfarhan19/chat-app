"use client";

import { Card } from "@/components/ui/card";
import { useConversation } from "@/hooks/useConversation";
import { cn } from "@/lib/utils";
import React from "react";

type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;
const ItemList: React.FC<Props> = ({
  children,
  title,
  action: Action,
}: Props) => {
  const { isActive } = useConversation();
  return (
    <Card
      className={cn("hidden h-full w-full p-2 lg:flex-none lg:w-80", {
        block: !isActive,
        "lg:block": isActive,
      })}
    >
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="w-full h-full flex flex-col items-center justify-start gap-2">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
