import { useState, useRef, useLayoutEffect, useCallback } from 'react'
import { parseNumber } from '../math'

export function useOverlay(height: number | string, margin = 3) {
  const popinRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [popinDirection, setPopinDirection] = useState<'up' | 'down' | false>(false)

  const show = useCallback(() => {
    const { bottom } = popinRef.current!.getBoundingClientRect()
    const direction = bottom + parseNumber(height) > window.innerHeight - 40 ? 'up' : 'down'
    setPopinDirection(direction)
  }, [height])

  const hide = useCallback(() => setPopinDirection(false), [])

  useLayoutEffect(() => {
    if (popinDirection) {
      const bounds = popinRef.current!.getBoundingClientRect()
      wrapperRef.current!.style.position = 'fixed'
      wrapperRef.current!.style.zIndex = '10000'
      wrapperRef.current!.style.left = bounds.left + 'px'
      if (popinDirection === 'down') wrapperRef.current!.style.top = bounds.bottom + margin + 'px'
      else wrapperRef.current!.style.bottom = window.innerHeight - bounds.top + margin + 'px'
    }
  }, [margin, popinDirection])

  return { popinRef, wrapperRef, shown: !!popinDirection, show, hide }
}
