import { ReactNode, useState } from "react";

interface UseMultiStepFormProps {
  steps: ReactNode[];
}

const useMultiStepForm = ({ steps }: UseMultiStepFormProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    const isLastStep = currentStepIndex >= steps.length - 1;
    if (isLastStep) {
      return;
    }

    setCurrentStepIndex(currentStepIndex + 1);
  };

  const back = () => {
    const isFirstStep = currentStepIndex <= 0;
    if (isFirstStep) {
      return;
    }

    setCurrentStepIndex(currentStepIndex - 1);
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
    steps,
  };
};

export default useMultiStepForm;
