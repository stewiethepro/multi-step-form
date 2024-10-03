import { Fragment } from "react";
import { useFormStep } from "../../../hooks/use-form-step";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";

import { TextInput } from "../../Form/TextInput";
import Form from "../../Form";
import { Footer } from "../../Footer";

export function Brand() {
  const { brandField, dispatchBrandField, getAllFormData } = useForm();
  const { handleNextStep } = useFormStep();

  function validateForm() {
    if (!brandField.value) {
      dispatchBrandField({ type: ACTIONS.SET_ERROR, errorMessage: 'Brand is required' });
      return false;
    }
    return true;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      // Log all form data
      console.log('Form data after DMAs step:', getAllFormData());
      handleNextStep();
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Brand Information"
          description="Please provide the brand name."
        />
        <div className="mt-5">
          <TextInput
            label="Brand"
            placeholder="Enter your brand name"
            value={brandField.value}
            onChange={(value: string) => dispatchBrandField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={brandField.errorMessage}
            clearError={() => dispatchBrandField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={brandField.hasError}
          />
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={() => {}}
      />
    </Fragment>
  );
}