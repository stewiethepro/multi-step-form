import { Fragment } from "react";
import { useForm } from "../../../hooks/use-form";
import { useFormStep } from "../../../hooks/use-form-step";
import Form from "../../Form";
import { Footer } from "../../Footer";

type RecommendationData = {
  respondent_utilization: number;
  state_score: number;
  state_weighting: number;
  respondent_allocation: number;
  dma_scores_total: number;
};

export function Recommendations() {
  const { recommendations } = useForm();
  const { handleNextStep, handlePreviousStep } = useFormStep();

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Sample Recommendations"
          description="Here are the recommended sample sizes and other metrics for each state."
        />
        <div className="mt-5">
          {Object.entries(recommendations).map(([state, data]) => {
            const recommendationData = data as RecommendationData;
            return (
              <div key={state} className="mb-6 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{state}</h3>
                <ul className="space-y-1">
                  <li>Respondent Allocation: {recommendationData.respondent_allocation.toFixed(2)}</li>
                  <li>Respondent Utilization: {(recommendationData.respondent_utilization * 100).toFixed(2)}%</li>
                  <li>State Score: {recommendationData.state_score.toFixed(2)}</li>
                  <li>State Weighting: {(recommendationData.state_weighting * 100).toFixed(2)}%</li>
                  <li>DMA Scores Total: {recommendationData.dma_scores_total.toFixed(2)}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleNextStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}
