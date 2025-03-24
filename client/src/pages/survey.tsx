import React, { useState } from "react";
import { useLocation } from "wouter";
import Logo from "@/components/Logo";
import ProgressTracker from "@/components/survey/ProgressTracker";
import SurveySection from "@/components/survey/SurveySection";
import AIRecommendations from "@/components/survey/AIRecommendations";
import HelpModal from "@/components/modals/HelpModal";
import SaveProgressModal from "@/components/modals/SaveProgressModal";
import { Button } from "@/components/ui/button";
import { Zap, HelpCircle, Save } from "lucide-react";
import { surveyData } from "@/utils/survey-data";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Footer } from "../components/Footer";

const Survey: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const totalSections = surveyData.length;
  const currentSectionData = surveyData[currentSection - 1];

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Submit the form if it's the last section
      submitSurveyMutation.mutate(formData);
    }
  };

  const handleSectionClick = (section: number) => {
    if (section <= currentSection) {
      setCurrentSection(section);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSaveFormData = (sectionData: Record<string, string>) => {
    setFormData((prev) => ({ ...prev, ...sectionData }));
  };

  const submitSurveyMutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      return apiRequest("POST", "/api/survey/submit", data);
    },
    onSuccess: () => {
      toast({
        title: "Assessment submitted successfully!",
        description: "Thank you for completing the assessment.",
        variant: "default",
      });
      navigate("/thank-you");
    },
    onError: (error) => {
      toast({
        title: "Failed to submit assessment",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 flex flex-col">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-2 py-1 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity p-0">
              <Logo size="small" className="" />
            </a>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="text-neutral-600 border-neutral-300 hover:bg-neutral-100 mr-2"
            >
              Back to Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-600 hover:text-neutral-800"
              onClick={() => setHelpModalOpen(true)}
            >
              <HelpCircle className="h-5 w-5" />
              <span className="ml-1 hidden sm:inline">Help</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex flex-col">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">
              Workflow Automation Readiness Assessment
            </h2>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSaveModalOpen(true)}
            className="hidden sm:flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/5"
          >
            <Save className="h-4 w-4" />
            <span>Save Progress</span>
          </Button>
        </div>
        
        <ProgressTracker 
          currentSection={currentSection}
          totalSections={totalSections}
          onSectionClick={handleSectionClick}
        />

        <SurveySection
          section={currentSectionData}
          onPrevious={handlePrevious}
          onNext={handleNext}
          initialData={formData}
          onSave={handleSaveFormData}
          isFirst={currentSection === 1}
          isLast={currentSection === totalSections}
          currentSection={currentSection}
          totalSections={totalSections}
        />
      </main>

      <Footer />

      <HelpModal open={helpModalOpen} onOpenChange={setHelpModalOpen} />
      <SaveProgressModal
        open={saveModalOpen}
        onOpenChange={setSaveModalOpen}
        data={formData}
      />
    </div>
  );
};

export default Survey;
