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

import createScheduleCaseFormConfig from "@/feature/user/page/cases/config/forms/create-schedule-case.form";
import useMultiStepForm from "@/common/hooks/form/use-multi-step-form";
import createRespondentFormConfig from "@/feature/user/page/cases/config/forms/create-respondent.form";

const CreateScheduleCaseSheet = () => {
  const { steps, currentStepIndex, next, back, isLastStep, isFirstStep } =
    useMultiStepForm({
      steps: [
        <FormBuilder key="respondent" fields={createRespondentFormConfig} />,
        <FormBuilder
          key="schedule-case"
          fields={createScheduleCaseFormConfig}
        />,
      ],
    });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Schedule Case
          </DialogTitle>
          <DialogDescription>
            Please fill in the required information for your case.
          </DialogDescription>
        </DialogHeader>

        {steps[currentStepIndex]}

        <DialogFooter>
          <div className="flex justify-between items-center space-x-4">
            {!isFirstStep && (
              <Button variant="outline" onClick={back}>
                Back
              </Button>
            )}
            <Button onClick={next}>
              {isLastStep ? "Schedule Case" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScheduleCaseSheet;
