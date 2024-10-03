import { createContext, useEffect, useReducer, useState } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';

type Field = {
  value: string | string[];
  hasError: boolean;
  errorMessage: string;
}

const initialState = {
  value: '',
  hasError: false,
  errorMessage: ''
}

type FormContextData = {
  brandField: Field;
  dispatchBrandField: React.Dispatch<any>;
  statesField: Field;
  dispatchStatesField: React.Dispatch<any>;
  dmasField: Field;
  dispatchDMAsField: React.Dispatch<any>;
  sampleField: Field;
  dispatchSampleField: React.Dispatch<any>;
  clearForm: () => void;
}

export const FormContext = createContext({
  brandField: initialState,
  dispatchBrandField: () => {},
  statesField: { ...initialState, value: [] },
  dispatchStatesField: () => {},
  dmasField: { ...initialState, value: [] },
  dispatchDMAsField: () => {},
  sampleField: initialState,
  dispatchSampleField: () => {},
  clearForm: () => {}
} as FormContextData);

export const ACTIONS = {
  SET_VALUE: 'SET_VALUE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_SCORES: 'SET_SCORES',
}

function handleFormState(
  state: Field,
  action: any
) {
  switch (action.type) {
    case ACTIONS.SET_VALUE:
      return {
        ...state,
        value: action.value,
        hasError: false,
        errorMessage: ''
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        hasError: true,
        errorMessage: action.errorMessage
      }
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: '',
        hasError: false
      }
      case ACTIONS.SET_SCORES:
      return {
        ...state,
        value: state.value,
        scores: action.scores,
        hasError: false,
        errorMessage: '',
      };
    default:
      return state
  }
}

export type Plan = {
  name: string;
  price: number
}

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [brandField, dispatchBrandField] = useReducer(handleFormState, initialState);
  const [statesField, dispatchStatesField] = useReducer(handleFormState, { ...initialState, value: [] });
  const [dmasField, dispatchDMAsField] = useReducer(handleFormState, { ...initialState, value: [] });
  const [sampleField, dispatchSampleField] = useReducer(handleFormState, initialState);

  const { removeValueFromLocalStorage } = useLocalStorage();

  function clearForm() {
    removeValueFromLocalStorage('brand');
    removeValueFromLocalStorage('states');
    removeValueFromLocalStorage('dmas');
    removeValueFromLocalStorage('sample');

    dispatchBrandField({ type: ACTIONS.SET_VALUE, value: '' });
    dispatchStatesField({ type: ACTIONS.SET_VALUE, value: [] });
    dispatchDMAsField({ type: ACTIONS.SET_VALUE, value: [] });
    dispatchSampleField({ type: ACTIONS.SET_VALUE, value: '' });
  }

  const value = {
    brandField,
    dispatchBrandField,
    statesField,
    dispatchStatesField,
    dmasField,
    dispatchDMAsField,
    sampleField,
    dispatchSampleField,
    clearForm
  }

  return (
    <FormContext.Provider value={{ ...value }}>
      {children}
    </FormContext.Provider>
  );
}
