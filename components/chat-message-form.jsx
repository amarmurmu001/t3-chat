import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { ModelsSelector } from "./models-selector";
import { useCreateChat } from "@/app/modules/chat/hooks/chat";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useAIModels } from "@/app/modules/ai-agents/hook/ai-agents";

export function ChatMessageForm({ initialMessage, onMessageChange }) {
  const { mutateAsync, isPending: isChatPending } = useCreateChat();
  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
      onMessageChange("");
    }
  }, [initialMessage, onMessageChange]);

  const { data: modelsData } = useAIModels();
  const models = modelsData?.models || [];
  console.log(models);

  const [selectedModelId, setSelectedModelId] = useState(null);
  const [message, setMessage] = useState("");

  const onModelChange = (modelId) => {
    setSelectedModelId(modelId);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await mutateAsync({
        content: message,
        model: selectedModelId,
      });
      toast.success("message sent successfully");
      onMessageChange(message);
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "message sent failed");
    }
  };

  return (
    <div className="max-w-3xl  w-full mx-auto relative mb-4">
      <div className="relative mb-2 flex items-center w-full">
        <form action="" onSubmit={handleSubmit} className="w-full">
          <textarea
            className="flex  h-12 lg:h-14 w-full rounded-2xl border border-input bg-background px-4 py-2 text-base ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 pr-12 shadow-sm"
            placeholder="Message T3 Chat..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            disabled={isChatPending}
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 lg:h-10 lg:w-10 rounded-full"
            variant="ghost"
          >
            {isChatPending ? (
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
