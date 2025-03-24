import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Need Assistance?</DialogTitle>
          <DialogDescription>
            If you have any questions about this assessment or need assistance,
            our team is here to help.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="flex items-start">
            <div className="flex-shrink-0 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-neutral-900">Email Us</h4>
              <p className="text-sm text-neutral-600">
                neosk@carbosftware.tech
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-neutral-900">Call Us</h4>
              <p className="text-sm text-neutral-600">+27 81 359 0062</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" className="w-full">
            Schedule a Consultation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
