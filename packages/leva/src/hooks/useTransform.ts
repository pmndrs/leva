import { useRef, useCallback } from 'react'

/**
 * A hook that manages CSS `translate3d` transforms for draggable or animated elements.
 *
 * @public - For plugin development
 *
 * This hook provides a simple API to control element position using hardware-accelerated
 * CSS transforms. It maintains internal state for x/y coordinates and allows partial
 * updates (e.g., only updating x while keeping y unchanged).
 *
 * Uses `translate3d` for better performance compared to `left`/`top` positioning,
 * as it leverages GPU acceleration and doesn't trigger layout recalculations.
 *
 * @returns A tuple of [ref, set] where:
 *   - `ref`: Ref to attach to the element you want to transform
 *   - `set`: Function to update the transform (accepts { x?, y? })
 *
 * @example
 * // Draggable element that follows cursor
 * function DraggableElement() {
 *   const [ref, set] = useTransform<HTMLDivElement>()
 *
 *   const bind = useDrag(({ movement: [mx, my] }) => {
 *     set({ x: mx, y: my })
 *   })
 *
 *   return <div ref={ref} {...bind()}>Drag me</div>
 * }
 *
 * @example
 * // Joystick indicator that returns to center
 * function JoystickIndicator() {
 *   const [spanRef, set] = useTransform<HTMLSpanElement>()
 *
 *   const bind = useDrag(({ active, movement: [mx, my] }) => {
 *     if (active) {
 *       // Clamp movement within boundaries
 *       const x = Math.max(-50, Math.min(50, mx))
 *       const y = Math.max(-50, Math.min(50, my))
 *       set({ x, y })
 *     } else {
 *       // Reset to center on release
 *       set({ x: 0, y: 0 })
 *     }
 *   })
 *
 *   return (
 *     <div className="joystick" {...bind()}>
 *       <span ref={spanRef} className="indicator" />
 *     </div>
 *   )
 * }
 *
 * @example
 * // Animated position with partial updates
 * function AnimatedBox() {
 *   const [ref, set] = useTransform<HTMLDivElement>()
 *
 *   // Move only horizontally
 *   const moveHorizontal = (x: number) => set({ x })
 *
 *   // Move only vertically
 *   const moveVertical = (y: number) => set({ y })
 *
 *   // Move to specific position
 *   const moveTo = (x: number, y: number) => set({ x, y })
 *
 *   return (
 *     <div>
 *       <div ref={ref} style={{ width: 50, height: 50, background: 'red' }} />
 *       <button onClick={() => moveHorizontal(100)}>Move Right</button>
 *       <button onClick={() => moveVertical(100)}>Move Down</button>
 *       <button onClick={() => moveTo(0, 0)}>Reset</button>
 *     </div>
 *   )
 * }
 */
export function useTransform<T extends HTMLElement>(): [
  React.RefObject<T>,
  (point: { x?: number; y?: number }) => void
] {
  const ref = useRef<T>(null)
  const local = useRef({ x: 0, y: 0 })

  const set = useCallback((point: { x?: number; y?: number }) => {
    Object.assign(local.current, point)
    if (ref.current) ref.current.style.transform = `translate3d(${local.current.x}px, ${local.current.y}px, 0)`
  }, [])

  return [ref, set]
}
