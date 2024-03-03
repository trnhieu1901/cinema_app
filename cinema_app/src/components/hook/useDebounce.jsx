import { useEffect, useState } from 'react'

export default function useDebounce(innitialValue = '', delay = 1000) {
  const [debounce, setDebounce] = useState(innitialValue)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(innitialValue)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [delay, innitialValue])
  return debounce
}
