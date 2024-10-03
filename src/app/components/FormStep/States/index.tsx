import { Fragment } from "react";
import { useFormStep } from "../../../hooks/use-form-step";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";

import Form from "../../Form";
import { Footer } from "../../Footer";
import { MultiSelect } from "../../Form/MultiSelect";


const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export function States() {
  const { statesField, dispatchStatesField, getAllFormData } = useForm();
  const { handleNextStep, handlePreviousStep } = useFormStep();

  function validateForm() {
    if (statesField.value.length === 0) {
      dispatchStatesField({ type: ACTIONS.SET_ERROR, errorMessage: 'Please select at least one state' });
      return false;
    }
    return true;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      // Log all form data
      console.log('Form data after States step:', getAllFormData());
      handleNextStep();
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Select States"
          description="Please select the states you're interested in."
        />
        <div className="mt-5">
          <MultiSelect
            label="States"
            options={US_STATES}
            selectedOptions={statesField.value}
            onChange={(value: string[]) => dispatchStatesField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={statesField.errorMessage}
            clearError={() => dispatchStatesField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={statesField.hasError}
          />
          {statesField.value.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-700">Selected States:</h4>
              <ul className="mt-1 list-disc list-inside">
                {statesField.value.map((state) => (
                  <li key={state} className="text-sm text-gray-600">{state}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}