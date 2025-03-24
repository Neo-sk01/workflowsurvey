import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import QuestionItem from "./QuestionItem";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, ArrowRight, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SurveySectionProps {
  section: {
    id: number;
    title: string;
    description: string;
    questions: {
      id: string;
      text: string;
      hint?: string;
      type?: string;
      placeholder?: string;
      validation?: {
        required?: boolean;
        pattern?: string;
      };
      options?: {
        value: string;
        label: string;
        description: string;
      }[];
    }[];
  };
  onPrevious: () => void;
  onNext: () => void;
  initialData?: Record<string, string>;
  onSave: (data: Record<string, string>) => void;
  isFirst: boolean;
  isLast: boolean;
  currentSection: number;
  totalSections: number;
}

const SurveySection: React.FC<SurveySectionProps> = ({
  section,
  onPrevious,
  onNext,
  initialData = {},
  onSave,
  isFirst,
  isLast,
  currentSection,
  totalSections,
}) => {
  const methods = useForm<Record<string, string>>({
    defaultValues: initialData,
    mode: "onChange",
  });
  const [, navigate] = useLocation();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const { handleSubmit, formState, watch } = methods;
  const allValues = watch();
  
  // Calculate completion percentage for this section
  const totalQuestions = section.questions.length;
  const answeredQuestions = section.questions.filter(q => 
    allValues[q.id] && allValues[q.id].trim() !== ""
  ).length;
  const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

  const onSubmit = (data: Record<string, string>) => {
    onSave(data);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 md:p-8">
            <motion.div 
              className="mb-8 border-l-4 border-gradient-l-primary-to-blue pl-4 py-2 relative"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-500"></div>
              <h3 className="text-2xl font-bold mb-3">
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  {section.title.replace(/^Section \d+: /, '')}
                </span>
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {section.description}
              </p>
            </motion.div>

            <div className="space-y-10">
              {section.questions.map((question, index) => (
                <QuestionItem
                  key={question.id}
                  id={question.id}
                  text={question.text}
                  hint={question.hint}
                  type={question.type}
                  placeholder={question.placeholder}
                  validation={question.validation}
                  options={question.options || []}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </div>

          <div className="px-6 py-5 bg-neutral-50 border-t border-neutral-200">
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onPrevious}
                    disabled={isFirst}
                    className={`text-neutral-700 font-medium ${isFirst ? 'opacity-50' : 'hover:bg-neutral-100'}`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowCancelDialog(true)}
                    className="text-neutral-500 hover:text-neutral-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto transition-all duration-300 ease-in-out"
                >
                  {isLast ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Complete Assessment
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Assessment?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost if you leave now. Are you sure you want to cancel the assessment?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Assessment</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/")} className="bg-red-500 text-white hover:bg-red-600">
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default SurveySection;
