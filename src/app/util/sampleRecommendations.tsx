import { SupabaseClient } from '@supabase/supabase-js';

interface FormSubmissionData {
  states: string[];
  dmas: string[];
  dma_scores: Array<{ state_name: string; dma: string; score: number }>;
  sample: number;
}

interface RecommendationData {
  [state: string]: {
    respondent_utilization: number;
    state_score: number;
    state_weighting: number;
    respondent_allocation: number;
    dma_scores_total: number;
  };
}

interface OverallData {
  dma_scores_total: number;
  state_score_total: number;
  sample: number;
}

export async function calculateSampleRecommendations(
  formSubmissionData: FormSubmissionData,
  supabase: SupabaseClient
) {
  console.log('Form submission data:', formSubmissionData);

  const recommendation_data: RecommendationData = {};
  const overall_data: OverallData = {
    dma_scores_total: 0,
    state_score_total: 0,
    sample: formSubmissionData.sample,
  };

  // Initialize recommendation_data
  formSubmissionData.states.forEach((state) => {
    recommendation_data[state] = {
      respondent_utilization: 0,
      state_score: 0,
      state_weighting: 0,
      respondent_allocation: 0,
      dma_scores_total: 0,
    };
  });

  // Query Supabase for DMAs
  const { data: supabaseDmas, error } = await supabase
    .from('dmas')
    .select('*')
    .in('state_name', formSubmissionData.states);

  if (error) {
    console.error('Error fetching DMAs from Supabase:', error);
    return null;
  }

  console.log('Supabase DMAs:', supabaseDmas);

  // Process Supabase DMAs
  supabaseDmas.forEach((dma) => {
    if (recommendation_data[dma.state_name]) {
      recommendation_data[dma.state_name].respondent_utilization += dma.dma_prop;
    }
  });

  // Process DMA scores
  formSubmissionData.dma_scores.forEach((score) => {
    if (recommendation_data[score.state_name]) {
      recommendation_data[score.state_name].dma_scores_total += score.score;
      overall_data.dma_scores_total += score.score;
    }
  });

  // Calculate state scores and total
  Object.keys(recommendation_data).forEach((state) => {
    const stateData = recommendation_data[state];
    stateData.state_score =
      stateData.dma_scores_total *
      overall_data.dma_scores_total *
      stateData.respondent_utilization;
    overall_data.state_score_total += stateData.state_score;
  });

  // Calculate state weightings and respondent allocations
  Object.keys(recommendation_data).forEach((state) => {
    const stateData = recommendation_data[state];
    stateData.state_weighting = stateData.state_score / overall_data.state_score_total;
    stateData.respondent_allocation = stateData.state_weighting * overall_data.sample;
  });

  console.log('Final recommendation data:', recommendation_data);
  return recommendation_data;
}