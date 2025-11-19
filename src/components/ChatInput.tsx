import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-sm p-4">
      <div className="flex gap-3 items-end max-w-4xl mx-auto">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message to Lumi..."
          className="min-h-[50px] max-h-[150px] resize-none bg-input border-border focus:border-primary focus:ring-primary transition-colors"
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim()}
          className="h-[50px] w-[50px] bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-200 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};
