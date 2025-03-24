import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface TextInputProps {
  id: string;
  name: string;
  placeholder?: string;
  label?: string;
  maxLength?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  placeholder = "Please provide additional details...",
  label = "Additional comments",
  maxLength = 500,
}) => {
  const { control } = useFormContext();
  const [charCount, setCharCount] = useState(0);

  return (
    <Controller
      control={control}
      name={`${name}_text`}
      render={({ field }) => (
        <motion.div 
          className="mt-6 p-4 border border-neutral-200 rounded-lg bg-neutral-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center mb-2">
            <MessageSquare className="w-4 h-4 text-neutral-500 mr-2" />
            <label htmlFor={`${id}-text`} className="text-sm font-medium text-neutral-700">
              {label}
            </label>
          </div>
          
          <textarea
            id={`${id}-text`}
            className={cn(
              "w-full p-3 min-h-[100px] border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-white resize-none",
            )}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => {
              field.onChange(e);
              setCharCount(e.target.value.length);
            }}
            value={field.value || ''}
            onBlur={field.onBlur}
          />
          
          <div className="flex justify-end mt-1">
            <span className={cn(
              "text-xs",
              charCount > maxLength * 0.8 ? "text-amber-500" : "text-neutral-500",
              charCount === maxLength && "text-red-500"
            )}>
              {charCount}/{maxLength}
            </span>
          </div>
        </motion.div>
      )}
    />
  );
};

export default TextInput; 