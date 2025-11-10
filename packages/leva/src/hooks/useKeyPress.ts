import { useEffect, useState } from 'react'

/**
 * Hook to track if a specific key is currently pressed
 * @param targetKey - The keyboard key to track (e.g., 'Control', 'Meta', 'a')
 * @returns boolean - true if key is currently pressed, false otherwise
 * @example const ctrlPressed = useKeyPress('Control')
 */
export function useKeyPress(targetKey: string) {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    // Reset state when targetKey changes to avoid stuck pressed state
    setKeyPressed(false)

    // NOTE: consider event.getModifierState("CapsLock") etc. for future enhancements
    function downHandler(e: KeyboardEvent) {
      if (e.key === targetKey) {
        setKeyPressed(true)
      }
    }

    function upHandler(e: KeyboardEvent) {
      if (e.key === targetKey) {
        setKeyPressed(false)
      }
    }

    function blurHandler() {
      setKeyPressed(false)
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    window.addEventListener('blur', blurHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
      window.removeEventListener('blur', blurHandler)
    }
  }, [targetKey])

  return keyPressed
}
