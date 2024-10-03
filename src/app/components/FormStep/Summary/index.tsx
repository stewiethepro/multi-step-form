import { Fragment, useEffect, useState } from "react";

import { useForm } from "../../../hooks/use-form";
import { useFormStep } from "../../../hooks/use-form-step";

import { Footer } from "../../Footer";
import Form from "../../Form";
import { PostConfirmation } from "./PostConfirmation";

export function Summary() {
  const [submitted, setSubmitted] = useState(false)

  const { handlePreviousStep, moveToStep } = useFormStep()

  const { brandField, statesField, dmasField, sampleField, clearForm } = useForm()

  function handleGoForwardStep() {
    setSubmitted(true)
  }

  useEffect(() => {
    if (submitted) {
      clearForm()

      setTimeout(() => {
        moveToStep(1)
      }, 4000)
    }
  }, [submitted, moveToStep])

  if (submitted) {
    return (
      <PostConfirmation />
    )
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Summary"
          description="Please review your selections."
        />

        <div className="mt-5 space-y-4">
          <div>
            <strong>Brand:</strong> {brandField.value}
          </div>
          <div>
            <strong>States:</strong> {(statesField.value as string[]).join(', ')}
          </div>
          <div>
            <strong>DMAs:</strong> {(dmasField.value as string[]).join(', ')}
          </div>
          <div>
            <strong>Sample Size:</strong> {sampleField.value}
          </div>
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
}