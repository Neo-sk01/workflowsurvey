import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import QuestionItem from "./QuestionItem";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save, CheckCircle2 } from "lucide-react";

interface SurveySectionProps {
  section: {
    id: number;
    title: string;
    description: string;
    questions: {
      id: string;
      text: string;
      hint?: string;
      options: {
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

  const { handleSubmit, formState } = methods;

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
              className="mb-8 border-l-4 border-primary pl-4 py-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                {section.title}
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
                  options={question.options}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </div>

          <div className="px-6 py-5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              disabled={isFirst}
              className="text-neutral-700 font-medium mb-3 sm:mb-0 w-full sm:w-auto"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>

            <div className="flex items-center space-x-2 text-sm text-neutral-500 font-medium mb-3 sm:mb-0">
              <Save className="w-4 h-4 text-neutral-400" />
              <span>Progress saved automatically</span>
            </div>

            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-md w-full sm:w-auto"
            >
              {isLast ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete Survey
                </>
              ) : (
                <>
                  Next Section
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </motion.div>
  );
};

export default SurveySection;
