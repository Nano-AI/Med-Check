import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

const CompactHashInput = ({ searchButtonClass = "", inputClass = "" }) => {
  const [hash, setHash] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    const trimmed = hash.trim();
    navigate(`/verify/${trimmed}`);
  };

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full py-2">
        <Input
          type="text"
          placeholder="Enter hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleVerify()}
          className={inputClass || "h-16 text-lg sm:text-2xl px-6 sm:px-12 w-full sm:w-[64rem] rounded-xl border-2 border-primary"}
        />
        <Button onClick={handleVerify} size="icon" className={searchButtonClass || "h-16 w-16 text-2xl rounded-full flex items-center justify-center"}>
          <Search className="w-7 h-7 mx-auto" />
        </Button>
      </div>
    </div>
  );
};

export default CompactHashInput;
