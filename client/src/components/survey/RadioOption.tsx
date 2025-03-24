import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface RadioOptionProps {
  id: string;
  name: string;
  value: string;
  label: string;
  description?: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  id,
  name,
  value,
  label,
  description,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const isSelected = field.value === value;
        
        return (
          <motion.div 
            className="radio-group"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              type="radio"
              id={id}
              className="radio-input sr-only"
              checked={isSelected}
              onChange={() => field.onChange(value)}
              onBlur={field.onBlur}
              name={field.name}
            />
            <label
              htmlFor={id}
              className={cn(
                "flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200",
                isSelected 
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10" 
                  : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
              )}
            >
              <div className={cn(
                "radio-button w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-200",
                isSelected ? "border-primary bg-primary" : "border-neutral-400 bg-white"
              )}>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-white"
                  >
                    <Check className="w-3 h-3" />
                  </motion.div>
                )}
              </div>
              <div className="flex-grow">
                <span className={cn(
                  "font-medium transition-colors duration-200",
                  isSelected ? "text-primary" : "text-neutral-800"
                )}>{label}</span>
                {description && (
                  <p className="text-sm text-neutral-600 mt-1">{description}</p>
                )}
              </div>
            </label>
          </motion.div>
        );
      }}
    />
  );
};

export default RadioOption;
