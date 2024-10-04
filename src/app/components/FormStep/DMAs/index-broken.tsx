import { Fragment, useEffect, useState } from "react";
import { useFormStep } from "../../../hooks/use-form-step";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";
import { createClient } from '@supabase/supabase-js'

import Form from "../../Form";
import { Footer } from "../../Footer";
import { MultiSelect } from "../../Form/MultiSelect";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Add this new interface
interface DMA {
  dma_label: string;
  state_name: string;
}

// Update this function to fetch DMAs with state information
async function fetchDMAsForStates(states: string[]): Promise<DMA[]> {
  const { data, error } = await supabase
    .from('dmas')
    .select('dma_label, state_name')
    .in('state_name', states);

  if (error) {
    console.error('Error fetching DMAs:', error);
    return [];
  }
  return data;
}

// Update the DMAScore interface
interface DMAScore {
  dma: string;
  state: string;
  score: number;
}

export function DMAs() {
  const { statesField, dmasField, dispatchDMAsField, getAllFormData } = useForm();
  const { handleNextStep, handlePreviousStep } = useFormStep();
  const [availableDMAs, setAvailableDMAs] = useState<DMA[]>([]);
  const [dmaScores, setDMAScores] = useState<DMAScore[]>([]);

  useEffect(() => {
    async function loadDMAs() {
      const dmas = await fetchDMAsForStates(statesField.value);
      setAvailableDMAs(dmas);
    }
    loadDMAs();
  }, [statesField.value]);

  useEffect(() => {
    // Initialize scores for newly selected DMAs
    const newScores = dmasField.value
      .filter(dma => !dmaScores.some(score => score.dma === dma))
      .map(dma => {
        const dmaInfo = availableDMAs.find(d => d.dma_label === dma);
        return { dma, state: dmaInfo ? dmaInfo.state_name : '', score: 0 };
      });
    setDMAScores(prev => [...prev, ...newScores]);

    // Remove scores for deselected DMAs
    setDMAScores(prev => prev.filter(score => dmasField.value.includes(score.dma)));
  }, [dmasField.value, availableDMAs]);

  function handleScoreChange(dma: string, score: number) {
    setDMAScores(prev => prev.map(item => item.dma === dma ? { ...item, score } : item));
  }

  function validateForm() {
    if (dmasField.value.length === 0) {
      dispatchDMAsField({ type: ACTIONS.SET_ERROR, errorMessage: 'Please select at least one DMA' });
      return false;
    }
    if (dmaScores.some(score => score.score === 0)) {
      dispatchDMAsField({ type: ACTIONS.SET_ERROR, errorMessage: 'Please score all selected DMAs' });
      return false;
    }
    return true;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      // Save DMA scores to form context
      dispatchDMAsField({ type: ACTIONS.SET_SCORES, scores: dmaScores });
      // Log all form data
      console.log('Form data after DMAs step:', getAllFormData());
      handleNextStep();
    }
  }

  // Add this function to group selected DMAs by state
  const groupSelectedDMAsByState = () => {
    const groupedDMAs: { [state: string]: string[] } = {};
    dmasField.value.forEach(selectedDMA => {
      const dma = availableDMAs.find(d => d.dma_label === selectedDMA);
      if (dma) {
        if (!groupedDMAs[dma.state_name]) {
          groupedDMAs[dma.state_name] = [];
        }
        groupedDMAs[dma.state_name].push(dma.dma_label);
      }
    });
    return groupedDMAs;
  };

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Select DMAs"
          description="Please select the DMAs you're interested in."
        />
        <div className="mt-5">
          <MultiSelect
            label="DMAs"
            options={availableDMAs.map(dma => dma.dma_label)}
            selectedOptions={dmasField.value}
            onChange={(value: string[]) => dispatchDMAsField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={dmasField.errorMessage}
            clearError={() => dispatchDMAsField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={dmasField.hasError}
          />
        </div>
        
        {/* Add this section to display selected DMAs grouped by state */}
        {dmasField.value.length > 0 && (
          <div className="mt-5">
            <h3 className="text-lg font-semibold mb-2">Score Selected DMAs:</h3>
            {Object.entries(groupSelectedDMAsByState()).map(([state, dmas]) => (
              <div key={state} className="mb-4">
                <h4 className="font-medium">{state}:</h4>
                <ul className="list-none pl-4">
                  {dmas.map(dma => (
                    <li key={dma} className="mb-2">
                      <span>{dma}</span>
                      <div className="mt-1">
                        {[1, 2, 3, 4, 5].map(score => (
                          <button
                            key={score}
                            className={`mr-2 px-3 py-1 rounded ${
                              dmaScores.find(item => item.dma === dma)?.score === score
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
                            }`}
                            onClick={() => handleScoreChange(dma, score)}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}