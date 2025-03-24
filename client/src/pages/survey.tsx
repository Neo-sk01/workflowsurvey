import React, { useState } from "react";
import { useLocation } from "wouter";
import Logo from "@/components/Logo";
import ProgressTracker from "@/components/survey/ProgressTracker";
import SurveySection from "@/components/survey/SurveySection";
import HelpModal from "@/components/modals/HelpModal";
import SaveProgressModal from "@/components/modals/SaveProgressModal";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { surveyData } from "@/utils/survey-data";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence } from "framer-motion";

const Survey: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  
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

  const handleSectionChange = (section: number) => {
    if (section < currentSection) {
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="medium" className="text-primary" />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSaveModalOpen(true)}
              className="text-sm text-neutral-600 hover:text-primary"
            >
              Save Progress
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHelpModalOpen(true)}
              className="text-sm text-neutral-600 hover:text-primary"
            >
              Need Help?
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20 pb-16 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 mt-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
              Workflow Automation Readiness Assessment
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Discover your business's automation potential and identify
              opportunities to streamline operations.
            </p>
          </div>

          <ProgressTracker
            currentSection={currentSection}
            totalSections={totalSections}
            onSectionClick={handleSectionChange}
          />

          <AnimatePresence mode="wait">
            <SurveySection
              key={currentSection}
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
          </AnimatePresence>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-20">
        <Button
          size="icon"
          className="rounded-full w-12 h-12 bg-cyan-500 hover:bg-cyan-600 shadow-lg"
          onClick={() => setHelpModalOpen(true)}
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>

      <footer className="bg-neutral-900 text-neutral-400 py-6 px-6">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            <Logo size="small" className="text-white" />
          </div>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
          <div className="mt-4 md:mt-0">
            © 2025 Carbo Software. All rights reserved.
          </div>
        </div>
      </footer>

      <HelpModal open={helpModalOpen} onOpenChange={setHelpModalOpen} />
      <SaveProgressModal
        open={saveModalOpen}
        onOpenChange={setSaveModalOpen}
        surveyData={formData}
      />
    </div>
  );
};

export default Survey;
