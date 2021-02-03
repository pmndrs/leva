import { useState, useRef, useEffect, useCallback } from 'react'

export function useToggle(initalState: boolean) {
  const [toggled, setToggle] = useState(initalState)
  const toggle = useCallback(() => setToggle((t) => !t), [])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    // prevents first animation
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    let timeout: number
    const ref = wrapperRef.current!

    const fixHeight = () => toggled && ref.style.removeProperty('height')

    ref.addEventListener('transitionend', fixHeight, { once: true })

    const { height } = contentRef.current!.getBoundingClientRect()
    if (toggled) ref.style.height = height + 'px'
    else {
      ref.style.height = height + 'px'
      timeout = window.setTimeout(() => (ref.style.height = '0px'), 50)
    }

    return () => {
      ref.removeEventListener('transitionend', fixHeight)
      clearTimeout(timeout)
    }
  }, [toggled])

  return { wrapperRef, contentRef, toggled, toggle }
}
