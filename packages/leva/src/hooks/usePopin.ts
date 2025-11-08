import { useState, useRef, useLayoutEffect, useCallback } from 'react'

/**
 * A hook that manages positioning and visibility of popover/dropdown elements.
 *
 * @internal - UI utility for Color and Image inputs
 *
 * This hook automatically:
 * - Calculates optimal popover position (opens upward or downward based on available space)
 * - Positions the popover as a fixed element aligned with the trigger
 * - Provides show/hide controls for the popover visibility
 *
 * The popover opens downward by default, but automatically flips upward if there
 * isn't enough space at the bottom of the viewport.
 *
 * @param margin - Spacing in pixels between trigger and popover (default: 3)
 * @returns An object containing:
 *   - `popinRef`: Ref to attach to the trigger element
 *   - `wrapperRef`: Ref to attach to the popover element
 *   - `shown`: Boolean indicating if popover is visible
 *   - `show`: Function to show the popover
 *   - `hide`: Function to hide the popover
 *
 * @example
 * // Color picker with popover
 * function ColorPicker({ value, onChange }) {
 *   const { popinRef, wrapperRef, shown, show, hide } = usePopin()
 *
 *   return (
 *     <>
 *       <button ref={popinRef} onClick={show} style={{ background: value }}>
 *         Pick Color
 *       </button>
 *       {shown && (
 *         <Portal>
 *           <Overlay onClick={hide} />
 *           <div ref={wrapperRef}>
 *             <ColorPicker color={value} onChange={onChange} />
 *           </div>
 *         </Portal>
 *       )}
 *     </>
 *   )
 * }
 *
 * @example
 * // Dropdown menu with automatic positioning
 * function DropdownMenu({ items }) {
 *   const { popinRef, wrapperRef, shown, show, hide } = usePopin(5)
 *
 *   return (
 *     <>
 *       <button ref={popinRef} onClick={show}>Menu</button>
 *       {shown && (
 *         <Portal>
 *           <div ref={wrapperRef}>
 *             {items.map(item => (
 *               <div key={item} onClick={() => { item.action(); hide() }}>
 *                 {item.label}
 *               </div>
 *             ))}
 *           </div>
 *         </Portal>
 *       )}
 *     </>
 *   )
 * }
 *
 * @example
 * // Image preview with delayed hide
 * function ImagePreview({ src }) {
 *   const { popinRef, wrapperRef, shown, show, hide } = usePopin()
 *   const timer = useRef<number>()
 *
 *   const hideAfterDelay = () => {
 *     timer.current = window.setTimeout(hide, 500)
 *   }
 *
 *   return (
 *     <>
 *       <img ref={popinRef} src={src} onClick={show} style={{ cursor: 'pointer' }} />
 *       {shown && (
 *         <Portal>
 *           <Overlay onPointerUp={hide} />
 *           <div
 *             ref={wrapperRef}
 *             onMouseEnter={() => clearTimeout(timer.current)}
 *             onMouseLeave={hideAfterDelay}
 *           >
 *             <img src={src} style={{ maxWidth: '500px' }} />
 *           </div>
 *         </Portal>
 *       )}
 *     </>
 *   )
 * }
 */
export function usePopin(margin = 3) {
  const popinRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [shown, setShow] = useState(false)

  const show = useCallback(() => setShow(true), [])
  const hide = useCallback(() => setShow(false), [])

  useLayoutEffect(() => {
    if (shown) {
      const { bottom, top, left } = popinRef.current!.getBoundingClientRect()
      const { height } = wrapperRef.current!.getBoundingClientRect()
      const direction = bottom + height > window.innerHeight - 40 ? 'up' : 'down'

      wrapperRef.current!.style.position = 'fixed'
      wrapperRef.current!.style.zIndex = '10000'
      wrapperRef.current!.style.left = left + 'px'

      if (direction === 'down') wrapperRef.current!.style.top = bottom + margin + 'px'
      else wrapperRef.current!.style.bottom = window.innerHeight - top + margin + 'px'
    }
  }, [margin, shown])

  return { popinRef, wrapperRef, shown, show, hide }
}
