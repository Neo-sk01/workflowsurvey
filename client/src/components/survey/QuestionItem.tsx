import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import RadioOption from "./RadioOption";
import TextInput from "./TextInput";
import UrlInput from "./UrlInput";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Option {
  value: string;
  label: string;
  description: string;
}

interface ValidationRules {
  required?: boolean;
  pattern?: string;
}

interface QuestionItemProps {
  id: string;
  text: string;
  hint?: string;
  type?: string;
  placeholder?: string;
  validation?: ValidationRules;
  options: Option[];
  isFirst?: boolean;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  id,
  text,
  hint,
  type = "radio",
  placeholder,
  validation,
  options,
  isFirst = false,
}) => {
  return (
    <motion.div
      className={`question-item ${!isFirst ? "pt-8 mt-8 border-t border-neutral-200" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-start mb-2">
          <h4 className="text-xl font-medium text-neutral-800">{text}</h4>
          {hint && (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button className="ml-2 text-neutral-400 hover:text-neutral-600 focus:outline-none">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-neutral-800 text-neutral-100 border-0">
                  <p className="text-sm">{hint}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {hint && (
          <p className="text-sm text-neutral-500 mb-4">{hint}</p>
        )}
      </motion.div>

      {type === "text" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <TextInput
            id={id}
            name={id}
            placeholder={placeholder || "Please provide additional details..."}
            label=""
            required={validation?.required}
          />
        </motion.div>
      )}

      {type === "url" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <UrlInput
            id={id}
            name={id}
            placeholder={placeholder || "https://www.example.com"}
            required={validation?.required}
          />
        </motion.div>
      )}

      {type !== "text" && type !== "url" && (
        <>
          <div className="space-y-3 mb-6">
            {options.map((option, index) => (
              <motion.div
                key={`${id}-${option.value}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <RadioOption
                  id={`${id}-${option.value}`}
                  name={id}
                  value={option.value}
                  label={option.label}
                  description={option.description}
                />
              </motion.div>
            ))}
          </div>
          
          <TextInput 
            id={id}
            name={`${id}_text`}
            placeholder="Share any additional thoughts or context for your answer..."
            label="Additional comments (optional)"
          />
        </>
      )}
    </motion.div>
  );
};

export default QuestionItem;
