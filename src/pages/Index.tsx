import { useState } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { AboutDialog } from "@/components/AboutDialog";
import { DonateDialog } from "@/components/DonateDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      text: "Hi! I'm Lumi, your empathic AI companion. I'm here to listen, chat, and support you. How are you feeling today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how you feel. Would you like to talk more about it?",
        "That's interesting! Tell me more about your thoughts on this.",
        "I'm here for you. It sounds like you're going through a lot.",
        "Thank you for sharing that with me. How can I support you better?",
        "I appreciate you opening up. Your feelings are valid.",
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader onAboutClick={() => setAboutOpen(true)} onDonateClick={() => setDonateOpen(true)} />
      
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </ScrollArea>

      <ChatInput onSendMessage={handleSendMessage} />

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <DonateDialog open={donateOpen} onOpenChange={setDonateOpen} />
    </div>
  );
};

export default Index;
