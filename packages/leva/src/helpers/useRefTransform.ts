import * as React from 'react'

// @TODO Add lerping
export function useRefTransform<T extends HTMLElement>() {
  const ref = React.useRef<T>()
  
  const set = React.useCallback(({ x, y }: { x: number, y: number }) => {
    if (ref.current) ref.current!.style.transform = ` translateX(${x}px) translateY(${y}px) translateZ(0px)`
  }, [])
  
  return [ref, set]
}
