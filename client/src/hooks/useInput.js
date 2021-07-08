import { useCallback, useMemo, useState } from 'react';

const useInput = (...rest) => {
  let validateValue = () => true;
  let options = {};
  rest.map((r) => {
    typeof r === "function" && (validateValue = r);
    typeof r === "object" && (options = r);
    return false;
  });

  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = useMemo(() => !valueIsValid && isTouched, [valueIsValid, isTouched]);
  const changeHandler = useCallback((event) => setEnteredValue(event.target.value), [])
  const blurHandler = useCallback(() => setIsTouched(true), [])
  const setDefaultValue = useCallback((value) => setEnteredValue(value), [])
  const reset = useCallback(() => {
    setEnteredValue('');
    setIsTouched(false);
  }, []);

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    changeHandler,
    blurHandler,
    setDefaultValue,
    reset,
    ...options,
  };
};

export default useInput;