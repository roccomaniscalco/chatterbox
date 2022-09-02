import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useDebouncedMutation = (mutationFn, options) => {
  const mutation = useMutation(mutationFn, options);
  const [isDebouncing, setIsDebouncing] = useState(false);
  let timer;

  const debouncedMutate = (variables, { debounceMs, ...options }) => {
    clearTimeout(timer);
    setIsDebouncing(true);
    timer = setTimeout(() => {
      mutation.mutate(variables, options);
      setIsDebouncing(false);
    }, debounceMs);
  };

  return { isDebouncing, debouncedMutate, ...mutation };
};

export default useDebouncedMutation;