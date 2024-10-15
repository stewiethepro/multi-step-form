import { useFormStep } from "../../hooks/use-form-step";

import { Brand } from "./Brand";
import { States } from "./States";
import { DMAs } from "./DMAs";
import { Sample } from "./Sample";
import { Recommendations } from "./Recommendations"; // Import the new component

const steps = [
  {
    step: 1,
    component: Brand
  },
  {
    step: 2,
    component: States
  },
  {
    step: 3,
    component: DMAs
  },
  {
    step: 4,
    component: Sample
  },
  {
    step: 5,
    component: Recommendations // Add the new step
  }
]

export function FormStep() {
  const { currentStep } = useFormStep();

  const step = steps.find(({ step }) => step === currentStep);

  return (
    <div className="flex flex-col flex-1 justify-between">
      {step && step.component()}
    </div>
  )
}
