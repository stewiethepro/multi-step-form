import { Fragment } from "react";
import { useFormStep } from "../../../hooks/use-form-step";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";
import { Listbox } from "@headlessui/react";

import Form from "../../Form";
import { Footer } from "../../Footer";

const SAMPLE_OPTIONS = Array.from({ length: 23 }, (_, i) => ({
  value: (4000 + i * 500).toString(),
  label: (4000 + i * 500).toString(),
}));

export function Sample() {
  const { sampleField, dispatchSampleField } = useForm();
  const { handleNextStep, handlePreviousStep } = useFormStep();

  function validateForm() {
    if (!sampleField.value) {
      dispatchSampleField({ type: ACTIONS.SET_ERROR, errorMessage: 'Please select a sample size' });
      return false;
    }
    return true;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      handleNextStep();
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Select Sample Size"
          description="Please select your desired sample size."
        />
        <div className="mt-5 relative">
          <Listbox
            value={sampleField.value}
            onChange={(value: string) => dispatchSampleField({ type: ACTIONS.SET_VALUE, value })}
          >
            <Listbox.Label className="sr-only">Sample Size</Listbox.Label>
            <Listbox.Button className="w-full border rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500">
              {sampleField.value || "Select a sample size"}
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {SAMPLE_OPTIONS.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `${active ? 'text-white bg-blue-600' : 'text-gray-900'}
                    cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                        {option.label}
                      </span>
                      {selected && (
                        <span className={`${active ? 'text-white' : 'text-blue-600'} absolute inset-y-0 left-0 flex items-center pl-3`}>
                          ✓
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          {sampleField.hasError && (
            <p className="mt-2 text-sm text-red-600">{sampleField.errorMessage}</p>
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