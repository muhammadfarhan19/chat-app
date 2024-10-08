import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import ItemList from "@/components/shared/item-list/ItemList";
import React from "react";

interface ConversationsPageProps {}

const ConversationsPage = ({}) => {
  return (
    <>
      <ItemList title="Conversations Page">Conversations Page</ItemList>
      <ConversationFallback />
    </>
  );
};

export default ConversationsPage;
