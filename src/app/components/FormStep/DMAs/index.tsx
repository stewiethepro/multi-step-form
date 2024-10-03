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

export function DMAs() {
  const { statesField, dmasField, dispatchDMAsField } = useForm();
  const { handleNextStep, handlePreviousStep } = useFormStep();
  const [availableDMAs, setAvailableDMAs] = useState<DMA[]>([]);

  useEffect(() => {
    async function loadDMAs() {
      const dmas = await fetchDMAsForStates(statesField.value);
      setAvailableDMAs(dmas);
    }
    loadDMAs();
  }, [statesField.value]);

  function validateForm() {
    if (dmasField.value.length === 0) {
      dispatchDMAsField({ type: ACTIONS.SET_ERROR, errorMessage: 'Please select at least one DMA' });
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
            <h3 className="text-lg font-semibold mb-2">Selected DMAs by State:</h3>
            {Object.entries(groupSelectedDMAsByState()).map(([state, dmas]) => (
              <div key={state} className="mb-2">
                <h4 className="font-medium">{state}:</h4>
                <ul className="list-disc list-inside pl-4">
                  {dmas.map(dma => (
                    <li key={dma}>{dma}</li>
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