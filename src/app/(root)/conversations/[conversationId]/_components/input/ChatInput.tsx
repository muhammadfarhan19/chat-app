"use client";

import { Card } from "@/components/ui/card";
import { useConversation } from "@/hooks/useConversation";
import { useMutationState } from "@/hooks/useMutationState";
import React from "react";
import { z } from "zod";
import { api } from "../../../../../../../convex/_generated/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "convex/values";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import TextAreaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { toast } from "sonner";

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field can't be empty",
  }),
});

const ChatInput = () => {
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const { conversationId } = useConversation();

  const { mutate: createMessage, pending } = useMutationState(
    api.message.create
  );

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (val: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: "text",
      content: [val.content],
    })
      .then(() => form.reset())
      .catch((err) =>
        toast.error(
          err instanceof ConvexError ? err.data : "Unexpected error occured"
        )
      );
  };

  const handleInputChange = (e: any) => {
    const { value, selectionStart } = e.target;
    if (selectionStart !== null) form.setValue("content", value);
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex w-full gap-2 items-end">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full gap-2 items-end"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full h-full">
                  <FormControl>
                    <TextAreaAutosize
                      rows={1}
                      maxRows={3}
                      {...field}
                      onChange={handleInputChange}
                      onClick={handleInputChange}
                      onKeyDown={async (e) => {
                        if (e.key === "enter" && !e.shiftKey) {
                          e.preventDefault();
                          await form.handleSubmit(handleSubmit)();
                        }
                      }}
                      placeholder="Type a message"
                      className="min-h-full w-full risize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={pending} size={"icon"} type="submit">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ChatInput;
