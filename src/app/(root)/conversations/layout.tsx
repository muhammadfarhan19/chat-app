"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import DMConversationItem from "./_components/DMConversationItem";
import CreateGroupDialog from "./_components/CreateGroupDialog";
import GroupConversationItem from "./_components/GroupConversationItem";

type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);

  return (
    <>
      <ItemList title="Conversations" action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="flex items-center justify-center w-full h-full">
              No conversations found
            </p>
          ) : (
            conversations.map((conversation) => {
              return conversation.conversation.isGroup ? (
                <GroupConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  name={conversation.conversation.name || ""}
                  lastMessageSender={
                    conversation.lastMessage?.sender.split(" ")[0]
                  }
                  lastMessageContent={conversation.lastMessage?.content}
                  unseenCount={conversation.unseenCount}
                />
              ) : (
                <DMConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  username={conversation.otherMember?.username || ""}
                  imageUrl={conversation.otherMember?.imageUrl || ""}
                  lastMessageSender={
                    conversation.lastMessage?.sender.split(" ")[0]
                  }
                  lastMessageContent={conversation.lastMessage?.content}
                  unseenCount={conversation.unseenCount}
                />
              );
            })
          )
        ) : (
          <Loader2 />
        )}
      </ItemList>
      {children}
    </>
  );
};

export default ConversationsLayout;
