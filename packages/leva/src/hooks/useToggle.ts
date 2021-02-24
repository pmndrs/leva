import { useRef, useEffect, useLayoutEffect } from 'react'

export function useToggle(toggled: boolean) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  // this should be fine for SSR since the store is set in useEffect and
  // therefore the pane doesn't show on first render.
  useLayoutEffect(() => {
    if (!toggled) wrapperRef.current!.style.height = '0px'
    // we only want to do this once so that's ok to break the rules of hooks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // prevents first animation
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    let timeout: number
    const ref = wrapperRef.current!

    const fixHeight = () => {
      if (toggled) {
        ref.style.removeProperty('height')
        contentRef.current!.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }

    ref.addEventListener('transitionend', fixHeight, { once: true })

    const { height } = contentRef.current!.getBoundingClientRect()
    if (toggled) {
      ref.style.height = height + 'px'
    } else {
      ref.style.height = height + 'px'
      timeout = window.setTimeout(() => (ref.style.height = '0px'), 50)
    }

    return () => {
      ref.removeEventListener('transitionend', fixHeight)
      clearTimeout(timeout)
    }
  }, [toggled])

  return { wrapperRef, contentRef }
}
