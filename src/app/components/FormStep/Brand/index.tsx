import { Fragment } from "react";
import { useFormStep } from "../../../hooks/use-form-step";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";
import { Input, Field, Label } from "@headlessui/react";

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
          <Field>
            <Label>Brand</Label>
            <Input
              name="brand"
              type="text"
              placeholder="Enter your brand name"
              value={brandField.value}
              onChange={(e) => dispatchBrandField({ type: ACTIONS.SET_VALUE, value: e.target.value })}
              className="w-full px-3 py-2 border rounded-md data-[focus]:ring-purple600 data-[invalid]:border-red-500"
              invalid={brandField.hasError}
            />
            {brandField.errorMessage && (
              <p className="mt-1 text-sm text-red-500">{brandField.errorMessage}</p>
            )}
          </Field>
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={() => {}}
      />
    </Fragment>
  );
}