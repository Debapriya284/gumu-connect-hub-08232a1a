import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Info, Heart } from "lucide-react";
import lumiAvatar from "@/assets/lumi-avatar.jpeg";

interface ChatHeaderProps {
  onAboutClick: () => void;
  onDonateClick: () => void;
}

export const ChatHeader = ({ onAboutClick, onDonateClick }: ChatHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary ring-2 ring-primary/20">
            <AvatarImage src={lumiAvatar} alt="Lumi" />
            <AvatarFallback className="bg-primary text-primary-foreground">L</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold text-foreground">Lumi</h1>
            <p className="text-xs text-muted-foreground">Your Empathic AI Companion</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onAboutClick}
            className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <Info className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDonateClick}
            className="hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
