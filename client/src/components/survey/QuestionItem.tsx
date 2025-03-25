import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import RadioOption from "./RadioOption";
import TextInput from "./TextInput";
import UrlInput from "./UrlInput";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

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
  type = "text",
  placeholder,
  validation,
  options = [],
  isFirst = false,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  
  const value = watch(id);
  const commentValue = watch(`${id}_comment`);
  
  // Handle radio option selection
  const handleRadioChange = (value: string) => {
    setValue(id, value, { shouldValidate: true });
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean, value: string) => {
    setValue(id, checked ? value : "", { shouldValidate: true });
  };

  // Register with validation rules
  const registerOptions = {
    required: validation?.required ? "This field is required" : false,
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isFirst ? 0.3 : 0 }}
      className="relative"
    >
      <div className="mb-3">
        <Label 
          htmlFor={id} 
          className={cn(
            "text-base md:text-lg font-medium mb-1 block",
            validation?.required && "after:content-['*'] after:ml-1 after:text-red-500"
          )}
        >
          {text}
        </Label>
        {hint && (
          <p className="text-sm text-neutral-500">{hint}</p>
        )}
      </div>

      <div className="space-y-2">
        {type === "textarea" && (
          <div>
            <Textarea
              id={id}
              placeholder={placeholder}
              className={cn(
                "min-h-28 resize-y w-full",
                errors[id] && "border-red-500 focus-visible:ring-red-500"
              )}
              {...register(id, registerOptions)}
            />
            {errors[id] && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {typeof errors[id]?.message === 'string' ? errors[id]?.message : "This field is required"}
              </p>
            )}
          </div>
        )}

        {type === "text" && (
          <div>
            <Input
              id={id}
              type="text"
              placeholder={placeholder}
              className={cn(
                "w-full",
                errors[id] && "border-red-500 focus-visible:ring-red-500"
              )}
              {...register(id, registerOptions)}
            />
            {errors[id] && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {typeof errors[id]?.message === 'string' ? errors[id]?.message : "This field is required"}
              </p>
            )}
          </div>
        )}
        
        {type === "email" && (
          <div>
            <Input
              id={id}
              type="email"
              placeholder={placeholder}
              className={cn(
                "w-full",
                errors[id] && "border-red-500 focus-visible:ring-red-500"
              )}
              {...register(id, {
                ...registerOptions,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors[id] && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {typeof errors[id]?.message === 'string' ? errors[id]?.message : "Invalid email address"}
              </p>
            )}
          </div>
        )}
        
        {type === "url" && (
          <div>
            <Input
              id={id}
              type="url"
              placeholder={placeholder}
              className={cn(
                "w-full",
                errors[id] && "border-red-500 focus-visible:ring-red-500"
              )}
              {...register(id, {
                ...registerOptions,
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i,
                  message: "Please enter a valid URL",
                },
              })}
            />
            {errors[id] && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {typeof errors[id]?.message === 'string' ? errors[id]?.message : "Please enter a valid URL"}
              </p>
            )}
          </div>
        )}

        {type === "checkbox" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div 
                className={cn(
                  "flex items-center gap-3 border rounded-lg p-4 transition-all cursor-pointer flex-1",
                  value === "yes" 
                    ? "border-green-500/70 bg-green-50" 
                    : "border-neutral-200 hover:border-neutral-300"
                )}
                onClick={() => handleCheckboxChange(true, "yes")}
              >
                <Checkbox 
                  id={`${id}-yes`}
                  checked={value === "yes"}
                  onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "yes")}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label 
                  htmlFor={`${id}-yes`} 
                  className="text-base font-medium cursor-pointer"
                >
                  Yes
                </Label>
              </div>

              <div 
                className={cn(
                  "flex items-center gap-3 border rounded-lg p-4 transition-all cursor-pointer flex-1",
                  value === "no" 
                    ? "border-red-500/70 bg-red-50" 
                    : "border-neutral-200 hover:border-neutral-300"
                )}
                onClick={() => handleCheckboxChange(true, "no")}
              >
                <Checkbox 
                  id={`${id}-no`}
                  checked={value === "no"}
                  onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "no")}
                  className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                />
                <Label 
                  htmlFor={`${id}-no`} 
                  className="text-base font-medium cursor-pointer"
                >
                  No
                </Label>
              </div>
            </div>
            
            {errors[id] && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {typeof errors[id]?.message === 'string' ? errors[id]?.message : "Please select an option"}
              </p>
            )}
          </div>
        )}

        {type === "radio" && options.length > 0 && (
          <>
            <RadioGroup
              value={value}
              onValueChange={handleRadioChange}
              className="space-y-3"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center space-x-3 border rounded-lg p-4 transition-all cursor-pointer",
                    value === option.value
                      ? "border-primary/70 bg-primary/5"
                      : "border-neutral-200 hover:border-neutral-300"
                  )}
                  onClick={() => handleRadioChange(option.value)}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`${id}-${option.value}`}
                    className="data-[state=checked]:border-primary data-[state=checked]:text-primary"
                  />
                  <div className="flex flex-col">
                    <Label
                      htmlFor={`${id}-${option.value}`}
                      className="text-base font-medium cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-sm text-neutral-500 mt-1">{option.description}</p>
                    )}
                  </div>
                </div>
              ))}
              {errors[id] && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {typeof errors[id]?.message === 'string' ? errors[id]?.message : "Please select an option"}
                </p>
              )}
            </RadioGroup>

            {/* Additional comments textarea for radio questions */}
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <Label 
                htmlFor={`${id}_comment`} 
                className="text-sm font-medium text-neutral-700 mb-2 block"
              >
                Additional comments (optional)
              </Label>
              <Textarea
                id={`${id}_comment`}
                placeholder="Add any additional details or context to your answer..."
                className="min-h-20 resize-y w-full"
                {...register(`${id}_comment`)}
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionItem;
