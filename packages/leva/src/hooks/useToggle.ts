import { useRef, useEffect, useLayoutEffect } from 'react'

/**
 * A hook that manages smooth collapse/expand animations for toggleable content.
 *
 * @internal - UI utility for Folder component
 *
 * This hook handles the complex height animation logic required for smooth expanding
 * and collapsing of content with unknown/dynamic height. It automatically:
 * - Animates height changes with CSS transitions
 * - Manages overflow (hidden during animation, visible when expanded)
 * - Scrolls expanded content into view smoothly
 * - Handles initial collapsed state without animation
 *
 * @param toggled - Boolean indicating if content should be expanded (true) or collapsed (false)
 * @returns An object containing:
 *   - `wrapperRef`: Ref to attach to the animating wrapper element
 *   - `contentRef`: Ref to attach to the content element (used to measure height)
 *
 * @example
 * // Collapsible folder in Leva
 * function Folder({ name, tree, collapsed }) {
 *   const [toggled, setToggle] = useState(!collapsed)
 *   const { wrapperRef, contentRef } = useToggle(toggled)
 *
 *   return (
 *     <div>
 *       <button onClick={() => setToggle(t => !t)}>{name}</button>
 *       <div ref={wrapperRef}>
 *         <div ref={contentRef}>
 *           {Object.entries(tree).map(([key, value]) => (
 *             <Control key={key} {...value} />
 *           ))}
 *         </div>
 *       </div>
 *     </div>
 *   )
 * }
 *
 * @example
 * // Accordion panel
 * function AccordionPanel({ title, children, defaultOpen = false }) {
 *   const [isOpen, setIsOpen] = useState(defaultOpen)
 *   const { wrapperRef, contentRef } = useToggle(isOpen)
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsOpen(!isOpen)}>
 *         {title} {isOpen ? '▼' : '▶'}
 *       </button>
 *       <div ref={wrapperRef} style={{ transition: 'height 0.3s ease' }}>
 *         <div ref={contentRef}>
 *           {children}
 *         </div>
 *       </div>
 *     </div>
 *   )
 * }
 *
 * @example
 * // Expandable section with conditional content
 * function ExpandableSection({ expanded, children }) {
 *   const { wrapperRef, contentRef } = useToggle(expanded)
 *
 *   return (
 *     <div
 *       ref={wrapperRef}
 *       style={{
 *         transition: 'height 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
 *         willChange: 'height'
 *       }}
 *     >
 *       <div ref={contentRef}>
 *         {children}
 *       </div>
 *     </div>
 *   )
 * }
 */
export function useToggle(toggled: boolean) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  // this should be fine for SSR since the store is set in useEffect and
  // therefore the pane doesn't show on first render.
  useLayoutEffect(() => {
    if (!toggled) {
      wrapperRef.current!.style.height = '0px'
      wrapperRef.current!.style.overflow = 'hidden'
    }
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
        ref.style.removeProperty('overflow')
        contentRef.current!.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }

    ref.addEventListener('transitionend', fixHeight, { once: true })

    const { height } = contentRef.current!.getBoundingClientRect()
    ref.style.height = height + 'px'
    if (!toggled) {
      ref.style.overflow = 'hidden'
      timeout = window.setTimeout(() => (ref.style.height = '0px'), 50)
    }

    return () => {
      ref.removeEventListener('transitionend', fixHeight)
      clearTimeout(timeout)
    }
  }, [toggled])

  return { wrapperRef, contentRef }
}
