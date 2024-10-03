import { useContext } from "react";
import { FormContext } from "../contexts/form";

export function useForm() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }

  const getAllFormData = () => {
    return {
      brand: context.brandField.value,
      states: context.statesField.value,
      dmas: context.dmasField.value,
      dmaScores: context.dmasField.scores,
      sample: context.sampleField.value,
    };
  };

  return {
    ...context,
    getAllFormData,
  };
}