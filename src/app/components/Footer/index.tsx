import { useFormStep } from "../../hooks/use-form-step";

interface FooterProps {
  handleGoBack: () => void;
  handleGoForwardStep: () => void;
}

export function Footer({ handleGoBack, handleGoForwardStep }: FooterProps) {
  const { currentStep, steps } = useFormStep();

  const numberOfSteps = steps.length;
  const isLastStep = currentStep === numberOfSteps;

  return (
    <footer className="p-4 bg-neutral flex justify-between items-center">
      <button
        onClick={handleGoBack}
        className={`${currentStep === 1 ? 'invisible' : 'visible'} bg-purple200 py-3 px-4 rounded text-sm text-purple800 font-medium sm:text-base`}
      >
        Go back
      </button>
      <button
        onClick={handleGoForwardStep}
        className={`${isLastStep ? 'bg-purple600' : 'bg-purple600'} py-3 px-4 rounded text-sm text-purple100 font-medium sm:text-base`}
      >
        {isLastStep ? 'Confirm' : 'Next step'}
      </button>
    </footer >
  )
}