import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ShieldCheck,
  Pill,
  Calendar,
  MapPin,
  Building,
  FileCheck,
  Package,
  AlertTriangle
} from "lucide-react";
import { PrescriptionUtils } from "@/lib/prescriptionUtils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const prescriptionUtils = new PrescriptionUtils();

const Verify = () => {
  const { hash } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState<any | null>(null);
  const [message, setMessage] = useState("");
  const [warnings, setWarnings] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrescription = async () => {
      if (!hash) return;
      try {
        const result = await prescriptionUtils.getPrescription(hash);
        if (result && result[4]) {
          setPrescription(result);
          setMessage("");
        } else {
          setPrescription(null);
          setMessage("Prescription not found or not verified.");
        }
      } catch (err: any) {
        setPrescription(null);
        setMessage("Error: " + err.message);
      }
    };
    fetchPrescription();
  }, [hash]);

  useEffect(() => {
    // Query backend for warnings matching prescription medicine and company hash
    if (prescription && prescription[0] && prescription[3]) {
      const medicine = encodeURIComponent(prescription[0]);
      const companyHash = encodeURIComponent(prescription[3]); // 'Added By' is companyHash
      fetch(`http://localhost:3001/warnings?companyHash=${companyHash}&medicine=${medicine}`)
        .then(res => res.json())
        .then(data => setWarnings(data));
    } else {
      setWarnings([]);
    }
  }, [prescription]);

  if (!prescription) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
        <Card className="w-full max-w-md p-4 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Prescription Not Found
            </h2>
            <p className="text-muted-foreground break-all">
              The hash "{hash}" could not be verified in our system.
            </p>
            {message && <p className="text-muted-foreground mt-2">{message}</p>}
          </div>
          <Button onClick={() => navigate("/")} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Try Another Hash
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 sm:mb-0">
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </div>
          {/* Warnings Section - show at top */}
          {warnings.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Related Warnings</h2>
              <Accordion type="single" collapsible className="bg-white rounded-lg shadow p-4">
                {warnings.map((w, idx) => (
                  <AccordionItem key={idx} value={String(idx)} className="border-b last:border-b-0">
                    <AccordionTrigger className="py-3 px-2 hover:bg-gray-50 rounded transition flex items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-destructive mr-2 text-lg">{w.title}</span>
                        <Badge className={w.severity === 1 || w.severity === "1" ? "bg-destructive text-destructive-foreground" : w.severity === 2 || w.severity === "2" ? "bg-orange-500 text-white" : "bg-primary text-primary-foreground"}>
                          {w.severity === 1 || w.severity === "1" ? "High" : w.severity === 2 || w.severity === "2" ? "Medium" : "Low"}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-gray-50 rounded-b-lg p-4">
                      <div className="text-muted-foreground text-base mb-2">{w.description}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div><span className="font-semibold">Company Hash:</span> <span className="break-all">{w.companyHash}</span></div>
                        <div><span className="font-semibold">Dose:</span> {w.dose}</div>
                        <div><span className="font-semibold">Production Location:</span> {w.productionLocation}</div>
                        <div><span className="font-semibold">Provider:</span> <span className="break-all">{w.provider}</span></div>
                        <div><span className="font-semibold">Manufacture Date Range:</span> {w.manufactureDateStart} - {w.manufactureDateEnd}</div>
                        <div><span className="font-semibold">Medicine:</span> {w.medicine}</div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
          {/* Main Info Card */}
          <Card className="p-4 sm:p-8 shadow-xl border-verified/20">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-4">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
                    {prescription[0]}
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground">
                    {prescription[1]}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Hash</p>
                  <code className="bg-secondary px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono break-all">{hash}</code>
                </div>
                <div>
                  <Badge className="bg-verified text-verified-foreground px-2 sm:px-4 py-2">
                    <ShieldCheck className="w-4 h-4 mr-2" /> Verified
                  </Badge>
                </div>
              </div>
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-border">
                {/* Dosage */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Dosage</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{prescription[1]}</p>
                  </div>
                </div>
                {/* Timestamp */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Timestamp</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{new Date(Number(prescription[2]) * 1000).toLocaleString()}</p>
                  </div>
                </div>
                {/* Added By */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Added By</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{prescription[3]}</p>
                  </div>
                </div>
                {/* Verified */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-verified/10 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-verified" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Verified</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{prescription[4] ? "Yes" : "No"}</p>
                  </div>
                </div>
                {/* Provider */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Provider</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base break-words max-w-[180px] sm:max-w-none">{prescription[5]}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verify;
