import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import RadioOption from "./RadioOption";
import TextInput from "./TextInput";

interface Option {
  value: string;
  label: string;
  description: string;
}

interface QuestionItemProps {
  id: string;
  text: string;
  hint?: string;
  options: Option[];
  isFirst?: boolean;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  id,
  text,
  hint,
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
        <h4 className="text-xl font-medium text-neutral-800 mb-2">{text}</h4>
        {hint && (
          <div className="flex items-start mt-2 bg-blue-50 p-3 rounded-md border border-blue-100">
            <HelpCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">{hint}</p>
          </div>
        )}
      </motion.div>

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
        name={id}
        placeholder="Share any additional thoughts or context for your answer..."
        label="Additional comments (optional)"
      />
    </motion.div>
  );
};

export default QuestionItem;
