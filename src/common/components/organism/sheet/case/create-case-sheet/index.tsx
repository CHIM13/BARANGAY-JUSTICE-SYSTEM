import { Button } from "@/common/components/atoms/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/atoms/ui/dialog";

import FormBuilder from "@/utils/form/form-builder";
import {
  caseInfoStep,
  compliantInfoStep,
  defendantInfoStep,
} from "./create-case.builder";

import { useState } from "react";
import ComboboxInput from "@/common/components/atoms/ui/combobox";

const CreateCaseSheet = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: "Case Information",
      component: <FormBuilder fields={caseInfoStep} />,
    },
    {
      title: "Compliant Information",
      component: <FormBuilder fields={compliantInfoStep} />,
    },
    {
      title: "Defendant Information",
      component: <FormBuilder fields={defendantInfoStep} />,
    },
  ];

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const next = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{steps[currentStep].title}</span>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </span>
          </DialogTitle>
          <DialogDescription>
            Fill in the required information for your case.
          </DialogDescription>
        </DialogHeader>

        <ComboboxInput />

        <div className="py-4">{steps[currentStep].component}</div>

        <DialogFooter>
          <div className="flex gap-4 items-center">
            {!isFirstStep && (
              <Button variant="outline" onClick={back}>
                Back
              </Button>
            )}
            <Button onClick={next} className="ml-auto">
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCaseSheet;
