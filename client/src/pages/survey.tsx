import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Logo from "@/components/Logo";
import ProgressTracker from "@/components/survey/ProgressTracker";
import SurveySection from "@/components/survey/SurveySection";
import AIRecommendations from "@/components/survey/AIRecommendations";
import HelpModal from "@/components/modals/HelpModal";
import SaveProgressModal from "@/components/modals/SaveProgressModal";
import { Button } from "@/components/ui/button";
import { Zap, HelpCircle, Save, Upload, Paperclip, X, Star, ExternalLink, ArrowUpRight, AlertTriangle, Check } from "lucide-react";
import { surveyData } from "@/utils/survey-data";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Footer } from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";

// Custom promotional modal component
const PromoModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-gradient-to-br from-white to-neutral-50 border-none shadow-xl">
        <div className="absolute top-2 right-2 z-50">
          <Button
            variant="ghost"
            className="h-7 w-7 p-0 rounded-full hover:bg-neutral-100"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <DialogHeader className="mb-4">
          <div className="relative w-full flex justify-center mb-2">
            <div className="absolute -top-7 -left-7 bg-primary/10 w-16 h-16 rounded-full blur-2xl"></div>
            <div className="absolute -top-2 right-16 bg-blue-400/20 w-12 h-12 rounded-full blur-xl"></div>
            <div className="bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <Star className="h-4 w-4 fill-white" />
              <span className="text-sm font-medium">Premium Offer</span>
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Get Your Custom-Tailored Survey Solution</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          <p className="text-neutral-600 text-center mb-5">
            Enhance your assessment experience with our premium custom survey solution, designed specifically for your organization's unique needs.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-3 rounded-lg border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-sm">Advanced Analytics</span>
              </div>
              <p className="text-xs text-neutral-500">Detailed insights and custom reporting tailored to your industry</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-500/10 p-1.5 rounded-full">
                  <Upload className="h-4 w-4 text-blue-500" />
                </div>
                <span className="font-medium text-sm">White Labeling</span>
              </div>
              <p className="text-xs text-neutral-500">Branded with your logo and company colors</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-purple-500/10 p-1.5 rounded-full">
                  <HelpCircle className="h-4 w-4 text-purple-500" />
                </div>
                <span className="font-medium text-sm">Custom Questions</span>
              </div>
              <p className="text-xs text-neutral-500">Tailor questions specific to your business needs</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-amber-500/10 p-1.5 rounded-full">
                  <Star className="h-4 w-4 text-amber-500" />
                </div>
                <span className="font-medium text-sm">Integration</span>
              </div>
              <p className="text-xs text-neutral-500">Seamlessly connect with your existing systems</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-col gap-3">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white shadow-md"
            onClick={() => onOpenChange(false)}
          >
            Learn More <ArrowUpRight className="h-4 w-4 ml-1.5" />
          </Button>
          <p className="text-xs text-center text-neutral-500 mt-1">
            Contact us at <a href="mailto:neosk@carbosftware.tech" className="text-primary hover:underline">neosk@carbosftware.tech</a> or call <a href="tel:+27813590062" className="text-primary hover:underline">+27 81 359 0062</a> for pricing details
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Component for file attachment
const FileAttachment: React.FC<{
  onFileChange: (file: File | null) => void;
  selectedFile: File | null;
}> = ({ onFileChange, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile && !selectedFile.type.includes('pdf')) {
      alert('Please upload a PDF file');
      return;
    }
    onFileChange(selectedFile);
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mt-6">
      <div className="relative border-2 border-dashed border-primary/30 rounded-lg bg-neutral-50 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-lg opacity-50"></div>
        
        {/* Softer glowing animation effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 rounded-lg blur opacity-20 group-hover:opacity-30 animate-[pulse_4s_ease-in-out_infinite] transition-all duration-500"></div>
        
        {/* Content container */}
        <div className="relative p-6">
          <Label htmlFor="company-profile" className="mb-2 block font-medium text-neutral-700">
            Attach Company Profile (PDF)
          </Label>
          
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="animate-[bounce_3s_ease-in-out_infinite] mb-3 p-3 bg-primary/5 rounded-full">
                <Paperclip className="h-10 w-10 text-primary/80 drop-shadow-sm" />
              </div>
              <p className="text-sm text-neutral-600 mb-4 font-medium text-center max-w-md">
                Upload your company profile to help us provide a more accurate assessment of your automation needs
              </p>
              <div className="flex items-center gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-500 text-white hover:from-primary/90 hover:to-blue-500/90 border-none shadow-md hover:shadow-lg transition-all"
                >
                  <Upload className="h-4 w-4" />
                  Browse files
                </Button>
                <span className="text-xs text-neutral-500">PDF files only, max 10MB</span>
              </div>
              <input
                type="file"
                id="company-profile"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between bg-white p-4 rounded border border-neutral-200 my-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Paperclip className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium truncate max-w-[200px] block">{selectedFile.name}</span>
                  <span className="text-xs text-neutral-500">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={handleRemoveFile}
                className="h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Survey: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [companyProfileFile, setCompanyProfileFile] = useState<File | null>(null);
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const totalSections = surveyData.length;
  const currentSectionData = surveyData[currentSection];

  // Show promo modal after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPromoModalOpen(true);
    }, 20000); // Show after 20 seconds
    
    return () => clearTimeout(timer);
  }, []);

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
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setValidationErrors([]);
    } else {
      handleSubmit();
    }
  };

  const handleSectionClick = (section: number) => {
    if (section <= currentSection) {
      setCurrentSection(section);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSaveSection = (data: Record<string, string>) => {
    setFormData(prev => ({
      ...prev,
      [currentSection]: data
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setValidationErrors([]);
      
      // Validate all sections before submitting
      const missingFields: string[] = [];
      
      surveyData.forEach((section, sectionIndex) => {
        const sectionData = formData[sectionIndex] || {};
        
        section.questions
          .filter(q => q.validation?.required)
          .forEach(q => {
            if (!sectionData[q.id] || sectionData[q.id].trim() === "") {
              missingFields.push(`Section ${sectionIndex + 1}: ${q.text}`);
            }
          });
      });
      
      if (missingFields.length > 0) {
        setValidationErrors(missingFields);
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      // Flatten form data for submission
      const flattenedData: Record<string, string> = {};
      Object.values(formData).forEach(sectionData => {
        Object.entries(sectionData).forEach(([key, value]) => {
          flattenedData[key] = value;
        });
      });
      
      const formDataToSend = new FormData();
      
      // Append all the survey data as a JSON string to one field
      formDataToSend.append('surveyData', JSON.stringify(flattenedData));
      
      // If there's a file, append it
      if (selectedFile) {
        formDataToSend.append('companyProfile', selectedFile);
      }
      
      const response = await apiRequest<{ success: boolean; id: string; analysis: string }>(
        '/api/survey/submit',
        'POST',
        formDataToSend,
        { isFormData: true }
      );
      
      if (response.success) {
        setSubmitSuccess(true);
        
        // Store assessment ID for redirection
        localStorage.setItem('latestAssessmentId', response.id);
        
        // Redirect to results page after a delay
        setTimeout(() => {
          window.location.href = `/results/${response.id}`;
        }, 2000);
      } else {
        setSubmitError('Failed to submit survey. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setSubmitError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 flex flex-col">
      <header className={`bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-1 py-0.5 flex justify-between items-center max-w-[92%]">
          <div className="flex items-center">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity p-0">
              <Logo size="small" className="scale-75 origin-left" />
            </a>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="text-neutral-600 border-neutral-300 hover:bg-neutral-100 mr-0.5 text-xs py-0.5 h-6"
            >
              Back to Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-600 hover:text-neutral-800 text-xs py-0.5 h-6"
              onClick={() => setHelpModalOpen(true)}
            >
              <HelpCircle className="h-3 w-3" />
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

        {validationErrors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-red-800 font-medium mb-2">Please fix the following issues:</h3>
                <ul className="list-disc pl-5 text-red-700 text-sm space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {isSubmitting ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Spinner size="large" />
            <p className="mt-4 text-neutral-600">Submitting your assessment...</p>
          </div>
        ) : submitSuccess ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Assessment Submitted!</h2>
            <p className="text-neutral-600 mb-6">
              Thank you for completing the assessment. Redirecting you to your results...
            </p>
            <Spinner size="small" />
          </div>
        ) : (
          <>
            <SurveySection
              section={currentSectionData}
              onPrevious={handlePrevious}
              onNext={handleNext}
              initialData={formData[currentSection] || {}}
              onSave={handleSaveSection}
              isFirst={currentSection === 0}
              isLast={currentSection === totalSections - 1}
              currentSection={currentSection + 1}
              totalSections={totalSections}
            />
            
            {currentSection === totalSections - 2 && (
              <div className="mt-8">
                <FileAttachment
                  onFileChange={handleFileChange}
                  selectedFile={selectedFile}
                />
              </div>
            )}
          </>
        )}
        
        {submitError && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{submitError}</p>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <HelpModal open={helpModalOpen} onOpenChange={setHelpModalOpen} />
      <SaveProgressModal
        open={saveModalOpen}
        onOpenChange={setSaveModalOpen}
        data={formData}
      />
      <PromoModal 
        open={promoModalOpen}
        onOpenChange={setPromoModalOpen}
      />
    </div>
  );
};

export default Survey;
