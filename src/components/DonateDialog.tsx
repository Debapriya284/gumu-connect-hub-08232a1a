import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DonateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DonateDialog = ({ open, onOpenChange }: DonateDialogProps) => {
  const { toast } = useToast();
  const upiId = "gumu642@okicici";

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: "UPI ID Copied!",
      description: "Thank you for your support! 💖",
    });
  };

  const handlePayWithUPI = () => {
    window.open(`upi://pay?pa=${upiId}&pn=Gumu&cu=INR`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Heart className="h-6 w-6 text-secondary fill-secondary" />
            Support Lumi
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Help us keep Lumi running and improving
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-foreground leading-relaxed">
            Your donations help us maintain and improve Lumi's capabilities. Every contribution, 
            no matter how small, makes a difference and is greatly appreciated! 💙
          </p>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">UPI ID</p>
                <p className="font-mono font-semibold text-foreground">{upiId}</p>
              </div>
              <Button
                onClick={handleCopyUPI}
                size="icon"
                variant="ghost"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handlePayWithUPI}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white transition-all duration-200 shadow-lg hover:shadow-[var(--shadow-glow)]"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Pay with UPI App
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Thank you for your generosity! Your support means the world to us. 🙏
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
