import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { AboutDialog } from "@/components/AboutDialog";
import { DonateDialog } from "@/components/DonateDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { streamChat } from "@/lib/chatService";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "heyy! i'm lumi 💙 what's on your mind today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    let assistantText = "";
    const assistantId = (Date.now() + 1).toString();

    const updateAssistant = (chunk: string) => {
      assistantText += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.id === assistantId) {
          return prev.map((m) => 
            m.id === assistantId ? { ...m, text: assistantText } : m
          );
        }
        return [
          ...prev,
          {
            id: assistantId,
            text: assistantText,
            isUser: false,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ];
      });
    };

    const chatHistory = messages.map((m) => ({
      role: m.isUser ? "user" as const : "assistant" as const,
      content: m.text,
    }));

    await streamChat({
      messages: [...chatHistory, { role: "user", content: text }],
      onDelta: updateAssistant,
      onDone: () => setIsLoading(false),
      onError: (error) => {
        setIsLoading(false);
        toast.error(error);
      },
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader onAboutClick={() => setAboutOpen(true)} onDonateClick={() => setDonateOpen(true)} />
      
      <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-card border-2 border-secondary animate-pulse" />
              <div className="flex items-center gap-2 bg-card rounded-2xl px-4 py-3 border border-border">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <ChatInput onSendMessage={handleSendMessage} />

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <DonateDialog open={donateOpen} onOpenChange={setDonateOpen} />
    </div>
  );
};

export default Index;
