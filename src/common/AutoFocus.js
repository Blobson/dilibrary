import { useRef, useEffect } from "react"

const useAutoFocus = (autoFocus = true) => {
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus]);

  return inputRef
};

export default useAutoFocus
