"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import RemoveGroupDialog from "./_components/dialogs/RemoveGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";

interface ConversationPageProps {
  params: {
    conversationId: Id<"conversations">;
  };
}

const ConversationPage = ({
  params: { conversationId },
}: ConversationPageProps) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] =
    React.useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = React.useState(false);
  const [removeGroupDialogOpen, setRemoveGroupDialogOpen] =
    React.useState(false);
  const [callType, setCallType] = React.useState<"audio" | "video" | null>(
    null
  );

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <ConversationContainer>
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
      />
      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}
      />
      <RemoveGroupDialog
        conversationId={conversationId}
        open={removeGroupDialogOpen}
        setOpen={setRemoveGroupDialogOpen}
      />
      <Header
        imageUrl={
          conversation.isGroup ? undefined : conversation?.otherMember?.imageUrl
        }
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username) || ""
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Leave group",
                  desctructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Delete group",
                  desctructive: true,
                  onClick: () => setRemoveGroupDialogOpen(true),
                },
              ]
            : [
                {
                  label: "Remove friend",
                  desctructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
        }
      />
      <Body
        members={
          conversation.isGroup
            ? conversation.otherMembers
              ?  conversation.otherMembers
              : []
            : conversation.otherMember
              ? [conversation.otherMember]
              : []
        }
      />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
