import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, QrCode } from "lucide-react";
import { toast } from "sonner";

const HashInput = () => {
  const [hash, setHash] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!hash.trim()) {
      toast.error("Please enter a valid hash");
      return;
    }
    navigate(`/verify/${hash.trim()}`);
  };

  const handleScanQR = () => {
    toast.info("QR Scanner feature coming soon");
    // Future: Implement QR code scanning
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter medication hash (e.g., a3f5c9d2e8b1f4a7)"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleVerify()}
          className="text-lg h-14"
        />
        <Button onClick={handleVerify} size="lg" className="h-14 px-8">
          <Search className="w-5 h-5 mr-2" />
          Verify
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Button 
        onClick={handleScanQR} 
        variant="outline" 
        size="lg" 
        className="w-full h-14"
      >
        <QrCode className="w-5 h-5 mr-2" />
        Scan QR Code
      </Button>
    </div>
  );
};

export default HashInput;
