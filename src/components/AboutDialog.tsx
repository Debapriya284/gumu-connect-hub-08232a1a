import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AboutDialog = ({ open, onOpenChange }: AboutDialogProps) => {
  const handleWhatsAppClick = () => {
    window.open("https://whatsapp.com/channel/0029VbBa1Es2ER6mgaO0Am2V", "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">About Lumi</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your Empathic AI Companion
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-foreground leading-relaxed">
            Lumi is your personal AI companion designed to provide empathetic conversations and emotional support.
            Whether you need someone to talk to, advice, or just a friendly chat, Lumi is always here for you.
          </p>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Features:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>24/7 availability for conversations</li>
              <li>Empathetic and understanding responses</li>
              <li>Privacy-focused interactions</li>
              <li>Personalized conversation experience</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-border">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-200 shadow-lg hover:shadow-[var(--shadow-glow)]"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Follow on WhatsApp for More Apps
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
