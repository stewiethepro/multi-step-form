import { Fragment } from "react";
import { useForm } from "../../../hooks/use-form";
import { useFormStep } from "../../../hooks/use-form-step";
import Form from "../../Form";
import { Footer } from "../../Footer";
import { createClient } from "@supabase/supabase-js";


// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

type RecommendationData = {
  respondent_utilization: number;
  state_score: number;
  state_weighting: number;
  respondent_allocation: number;
  dma_scores_total: number;
};

export function Recommendations() {
  const { getAllFormData, recommendations } = useForm();
  const { handleNextStep, handlePreviousStep } = useFormStep();

  async function submitForm() {
    const formData = getAllFormData();
    
    // Convert recommendations object to an array of objects
    const recommendationsArray = Object.entries(recommendations).map(([state, data]) => ({
      state,
      ...data as RecommendationData
    }));

    try {
      const { data, error } = await supabase
        .from('recommendations')
        .insert(recommendationsArray);

      if (error) throw error;

      console.log('Submission successful:', data);

      // Navigate to the next step
      handleNextStep();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Here you can add logic for handling errors
    }
  }

  function handleGoForwardStep() {
      submitForm();
      // Remove the handleNextStep() call here, as we'll navigate in the submitForm function
    }

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
                <h3 className="font-semibold text-lg mb-2 text-purple600">{state}</h3>
                <ul className="space-y-1">
                  <li className="text-purple800">Respondent Allocation: <span className="font-bold text-purple600">{recommendationData.respondent_allocation.toFixed(2)}</span></li>
                  <li className="text-purple800">Respondent Utilization: <span className="font-bold text-purple600">{(recommendationData.respondent_utilization * 100).toFixed(2)}%</span></li>
                  <li className="text-purple800">State Score: <span className="font-bold text-purple600">{recommendationData.state_score.toFixed(2)}</span></li>
                  <li className="text-purple800">State Weighting: <span className="font-bold text-purple600">{(recommendationData.state_weighting * 100).toFixed(2)}%</span></li>
                  <li className="text-purple800">DMA Scores Total: <span className="font-bold text-purple600">{recommendationData.dma_scores_total.toFixed(2)}</span></li>
                </ul>
              </div>
            );
          })}
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}
