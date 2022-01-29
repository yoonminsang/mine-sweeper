import { useReducer, useCallback } from 'react';

type TObj = Record<string, string | number>;

const init: TObj = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: any, action: TObj) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name as string]: action.value,
      };
    case 'RESET':
      return Object.keys(state).reduce((acc, cur) => {
        acc[cur] = '';
        return acc;
      }, init);
    default:
      return state;
  }
}

const useInputs = (initialForm: TObj) => {
  const [form, dispatch] = useReducer(reducer, initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', name, value });
  }, []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  return [form, onChange, reset];
};

export default useInputs;
