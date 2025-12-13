import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { ModelsSelector } from "./models-selector";
import { useCreateChat, useUpdateChat } from "@/app/modules/chat/hooks/chat";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useAIModels } from "@/app/modules/ai-agents/hook/ai-agents";

export function ChatMessageForm({
  initialMessage,
  onMessageChange,
  chatId,
  initialModel,
  onStartStreaming,
  isStreaming = false,
}) {
  const { mutateAsync: createChat, isPending: isCreatePending } =
    useCreateChat();
  const { mutateAsync: updateChat, isPending: isUpdatePending } =
    useUpdateChat();

  const isChatPending = chatId ? isUpdatePending : isCreatePending;
  const isDisabled = isChatPending || isStreaming;

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
      onMessageChange("");
    }
  }, [initialMessage, onMessageChange]);

  const { data: modelsData } = useAIModels();
  const models = modelsData?.models || [];

  const [selectedModelId, setSelectedModelId] = useState(initialModel || null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (initialModel) {
      setSelectedModelId(initialModel);
    } else if (models.length > 0 && !selectedModelId) {
      setSelectedModelId(models[0].id);
    }
  }, [models, selectedModelId, initialModel]);

  const onModelChange = (modelId) => {
    setSelectedModelId(modelId);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!message.trim()) return;

      const currentMessage = message;
      setMessage(""); // Clear immediately for better UX

      if (chatId) {
        // For existing chats: save message then stream
        const response = await updateChat({
          chatId,
          content: currentMessage,
          model: selectedModelId,
        });

        if (response.success && onStartStreaming) {
          // Build messages array including the just-sent message
          const allMessages = response.previousMessages || [];
          await onStartStreaming(allMessages, selectedModelId);
        }
      } else {
        // For new chats: create chat (will redirect to chat page)
        await createChat({
          content: currentMessage,
          model: selectedModelId,
        });
      }

      onMessageChange(currentMessage);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "message sent failed");
      setMessage(message); // Restore message on error
    }
  };

  return (
    <div className="max-w-3xl  w-full mx-auto relative mb-4">
      <div className="relative mb-2 flex items-center w-full">
        <form action="" onSubmit={handleSubmit} className="w-full">
          <textarea
            className="flex h-12 lg:h-14 w-full rounded-2xl border border-input bg-background px-4 py-2 text-base ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 pr-12 shadow-sm resize-none"
            placeholder="Message T3 Chat..."
            value={message}
            disabled={isDisabled}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            disabled={isDisabled || !message.trim()}
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 lg:h-10 lg:w-10 rounded-full"
            variant="ghost"
          >
            {isDisabled ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
      <ModelsSelector
        models={models}
        selectedModelId={selectedModelId}
        onModelChange={onModelChange}
      />
      <p className="text-xs text-center text-muted-foreground mt-2">
        AI can make mistakes. Please verify important information.
      </p>
    </div>
  );
}
