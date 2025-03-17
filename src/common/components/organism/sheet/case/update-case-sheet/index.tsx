import { Button, ButtonProps } from "@/common/components/atoms/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/common/components/atoms/ui/sheet";
import useMultiStepForm from "@/common/hooks/form/use-multi-step-form";
import CompliantInfoStep from "./steps/compliant-info-step";
import RespondentInfoStep from "./steps/respondent-info-step";
import OtherInfoStep from "./steps/other-info-step";
import { XStack } from "@/common/components/atoms/ui/stack";
import { memo, useCallback } from "react";

interface Props extends ButtonProps {
  label?: string;
  caseId: string;
}

const UpdateCaseSheet = memo(function UpdateCaseSheet({
  caseId,
  label,
  ...props
}: Props) {
  const steps = [
    <CompliantInfoStep />,
    <RespondentInfoStep />,
    <OtherInfoStep />,
  ];

  const { step, isFirstStep, isLastStep, next, back, currentStepIndex } =
    useMultiStepForm({
      steps,
    });

  const getStepTitle = useCallback(() => {
    if (isFirstStep) return "Compliant Information";
    if (isLastStep) return "Other Information";
    return "Respondent Information";
  }, [isFirstStep, isLastStep]);

  const handleNext = useCallback(() => {
    next();
  }, [next]);

  const handleBack = useCallback(() => {
    back();
  }, [back]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button {...props}>{label || `Update case ${caseId}`}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            <span>{getStepTitle()}</span>
            <span className="text-sm text-muted-foreground pr-6">
              {currentStepIndex + 1} / {steps.length}
            </span>
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-2 mb-4">{step}</div>
        <SheetFooter>
          <XStack className="justify-between space-x-2">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </XStack>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});

export default UpdateCaseSheet;
