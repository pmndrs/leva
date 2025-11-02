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

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}
