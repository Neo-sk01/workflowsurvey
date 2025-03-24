import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

interface UrlInputProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({
  id,
  name,
  placeholder = "https://www.example.com",
  required = false,
}) => {
  const { control } = useFormContext();
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const validateUrl = (value: string) => {
    if (!value) return !required;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required,
        validate: validateUrl
      }}
      render={({ field, fieldState }) => (
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Globe className="w-5 h-5 text-neutral-400" />
            </div>
            
            <input
              id={id}
              type="url"
              className={cn(
                "w-full py-3 pl-10 pr-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white",
                fieldState.invalid && isTouched 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-100" 
                  : "border-neutral-300 hover:border-neutral-400"
              )}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                setIsValid(validateUrl(e.target.value));
                if (!isTouched) setIsTouched(true);
              }}
              value={field.value || ''}
              onBlur={field.onBlur}
            />
          </div>
          
          {fieldState.invalid && isTouched && (
            <motion.p 
              className="mt-2 text-sm text-red-600"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {required && !field.value 
                ? "Website URL is required" 
                : "Please enter a valid URL (e.g., https://www.example.com)"
              }
            </motion.p>
          )}
        </div>
      )}
    />
  );
};

export default UrlInput; 