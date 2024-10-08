import { Card } from "@/components/ui/card";
import React from "react";

type Props = React.PropsWithChildren<{}>;

const ConversationContainer = ({ children }: Props) => {
  return (
    <Card className="w-full h-[calc(100svh-32px)] p-2 flex flex-col lg:h-full">
      {children}
    </Card>
  );
};

export default ConversationContainer;
