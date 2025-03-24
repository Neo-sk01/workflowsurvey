import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressTrackerProps {
  currentSection: number;
  totalSections: number;
  onSectionClick: (section: number) => void;
}

const sectionLabels = [
  "Current Tools & Daily Tasks",
  "Repetitive Tasks & Daily Operations",
  "Systems Integration & Data Management",
  "Business Growth & Scalability",
  "Process Clarity & Digital Readiness",
  "Strategic Focus & ROI Potential"
];

const sectionIcons = [
  "📋", // clipboard for tasks
  "🔄", // rotating arrows for integration
  "📈", // chart with upward trend for growth
  "💻", // computer for digital readiness
  "📊", // chart for process clarity
  "💰"  // money bag for ROI
];

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentSection,
  totalSections,
  onSectionClick,
}) => {
  const progress = (currentSection / totalSections) * 100;

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
        <motion.span 
          className="text-sm font-medium text-neutral-800 mb-1 sm:mb-0 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={currentSection}
        >
          <span className="inline-block bg-gradient-to-r from-primary to-blue-500 text-white text-xs px-2 py-1 rounded-md mr-2 shadow-sm">
            {sectionIcons[currentSection - 1]}
          </span>
          Section {currentSection}: <span className="text-primary">{sectionLabels[currentSection - 1]}</span>
        </motion.span>
        <motion.span 
          className="text-sm font-medium bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`progress-${currentSection}`}
        >
          {Math.round(progress)}% Complete
        </motion.span>
      </div>
      
      <div className="h-3 w-full bg-neutral-200 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="relative mt-8 mb-2">
        <div className="absolute h-0.5 bg-neutral-200 top-5 left-0 right-0 z-0" />
        <div className="grid grid-cols-6 gap-1 relative z-10">
          {Array.from({ length: totalSections }).map((_, index) => {
            const sectionNumber = index + 1;
            const isActive = sectionNumber === currentSection;
            const isCompleted = sectionNumber < currentSection;
            
            return (
              <motion.div
                key={sectionNumber}
                className="flex flex-col items-center cursor-pointer"
                whileHover={{ 
                  scale: sectionNumber <= currentSection ? 1.05 : 1.02,
                }}
                onClick={() => onSectionClick(sectionNumber)}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shadow",
                    isActive 
                      ? "bg-gradient-to-r from-primary to-blue-500 text-white scale-110 ring-4 ring-primary/20" 
                      : isCompleted 
                      ? "bg-gradient-to-r from-primary/90 to-blue-500/90 text-white"
                      : "bg-neutral-200 text-neutral-600"
                  )}
                  animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={isActive ? { 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2 
                  } : {}}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    sectionNumber
                  )}
                </motion.div>
                <div className="text-center mt-2">
                  <span className={cn(
                    "text-xs font-medium hidden sm:block",
                    isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-neutral-500"
                  )}>
                    {sectionLabels[index]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
