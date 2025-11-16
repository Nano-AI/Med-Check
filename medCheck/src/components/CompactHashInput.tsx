import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, QrCode } from "lucide-react";
import { toast } from "sonner";

const CompactHashInput = () => {
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
  };

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full py-2">
        <Input
          type="text"
          placeholder="Enter verification code"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleVerify()}
          className="h-12 text-base sm:text-xl px-4 sm:px-8 w-full sm:w-[48rem]"
        />
        <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
          <Button onClick={handleVerify} size="lg" className="h-12 text-base sm:text-xl px-6 sm:px-10 w-full sm:w-auto">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            <span className="hidden sm:inline">Verify</span>
            <span className="sm:hidden">Go</span>
          </Button>
          <Button onClick={handleScanQR} variant="outline" size="lg" className="h-12 w-12">
            <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompactHashInput;
