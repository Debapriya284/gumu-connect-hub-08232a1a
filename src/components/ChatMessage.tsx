import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import lumiAvatar from "@/assets/lumi-avatar.jpeg";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-3 duration-300", isUser && "flex-row-reverse")}>
      <Avatar className={cn("h-10 w-10 border-2", isUser ? "border-primary" : "border-secondary")}>
        <AvatarImage src={isUser ? undefined : lumiAvatar} alt={isUser ? "You" : "Lumi"} />
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}>
          {isUser ? "U" : "L"}
        </AvatarFallback>
      </Avatar>
      <div className={cn("flex flex-col max-w-[70%]", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-lg",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-card text-card-foreground rounded-tl-sm border border-border"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">{timestamp}</span>
      </div>
    </div>
  );
};
