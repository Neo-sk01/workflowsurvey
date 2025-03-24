import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SaveProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  surveyData: Record<string, any>;
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

type FormData = z.infer<typeof formSchema>;

const SaveProgressModal: React.FC<SaveProgressModalProps> = ({
  open,
  onOpenChange,
  surveyData,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  const saveProgressMutation = useMutation({
    mutationFn: async (data: FormData & { surveyData: Record<string, any> }) => {
      return apiRequest("POST", "/api/survey/save-progress", data);
    },
    onSuccess: () => {
      toast({
        title: "Progress saved!",
        description: "We've sent a link to your email to continue later.",
        variant: "default",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to save progress",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (formData: FormData) => {
    saveProgressMutation.mutate({
      ...formData,
      surveyData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Your Progress</DialogTitle>
          <DialogDescription>
            Enter your email to save your progress. We'll send you a link to
            continue where you left off.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-4 flex space-x-2 sm:space-x-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={saveProgressMutation.isPending}
              >
                {saveProgressMutation.isPending
                  ? "Saving..."
                  : "Save Progress"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SaveProgressModal;
