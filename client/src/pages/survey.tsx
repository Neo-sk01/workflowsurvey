import React, { useState, useEffect } from "react";
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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const totalSections = surveyData.length;
  const currentSectionData = surveyData[currentSection - 1];

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down, hide header after scrolling 100px
        setIsHeaderVisible(false);
      } else {
        // Scrolling up, show header
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
      <header className={`bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-0.5 py-0 flex justify-between items-center max-w-[92%]">
          <div className="flex items-center">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity p-0">
              <Logo size="small" className="scale-90 origin-left" />
            </a>
          </div>
          
          <div className="flex items-center space-x-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="text-neutral-600 border-neutral-300 hover:bg-neutral-100 mr-0.5 text-xs py-0.5 h-7"
            >
              Back to Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-600 hover:text-neutral-800 text-xs py-0.5 h-7"
              onClick={() => setHelpModalOpen(true)}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span className="ml-0.5 hidden sm:inline">Help</span>
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
