import { useInputContext } from '../context'
import { FullGestureState, useDrag as useDragHook, UserDragConfig } from '@use-gesture/react'

/**
 * A hook that wraps @use-gesture/react's `useDrag` with automatic edit lifecycle management.
 *
 * @public - For plugin development
 *
 * This hook automatically:
 * - Adds `leva__panel__dragged` class to body on drag start (prevents text selection during drag)
 * - Triggers `onEditStart` callback when dragging begins
 * - Triggers `onEditEnd` callback when dragging ends
 * - Removes the body class when drag completes
 *
 * Used internally by inputs that support dragging interactions (sliders, joysticks, etc.)
 *
 * @param handler - The drag handler function that receives gesture state
 * @param config - Optional configuration for the underlying useDrag hook
 * @returns The bind function from @use-gesture/react to attach to elements
 *
 * @example
 * // Range slider with drag support
 * function RangeSlider({ value, min, max, onDrag }) {
 *   const ref = useRef<HTMLDivElement>(null)
 *   const rangeWidth = useRef<number>(0)
 *
 *   const bind = useDrag(({ first, xy: [x], movement: [mx], memo }) => {
 *     if (first) {
 *       const { width, left } = ref.current!.getBoundingClientRect()
 *       rangeWidth.current = width
 *       memo = value // Store initial value
 *     }
 *
 *     const newValue = memo + (mx / rangeWidth.current) * (max - min)
 *     onDrag(clamp(newValue, min, max))
 *     return memo
 *   })
 *
 *   return <div ref={ref} {...bind()}>Drag me</div>
 * }
 *
 * @example
 * // Joystick control with 2D drag
 * function Joystick({ value, onUpdate }) {
 *   const [ref, set] = useTransform<HTMLSpanElement>()
 *
 *   const bind = useDrag(({ active, movement: [mx, my] }) => {
 *     if (active) {
 *       set({ x: mx, y: my })
 *       onUpdate({ x: value.x + mx, y: value.y - my })
 *     } else {
 *       set({ x: 0, y: 0 }) // Reset on release
 *     }
 *   })
 *
 *   return <div {...bind()}><span ref={ref} /></div>
 * }
 *
 * @example
 * // Custom drag with memo for relative changes
 * function CustomDrag({ value, onChange }) {
 *   const bind = useDrag(({ first, delta: [dx, dy], memo }) => {
 *     // memo persists across the drag lifecycle
 *     if (first) memo = value
 *
 *     const newValue = {
 *       x: memo.x + dx,
 *       y: memo.y + dy
 *     }
 *     onChange(newValue)
 *     return memo
 *   })
 *
 *   return <div {...bind()}>Drag anywhere</div>
 * }
 */
export function useDrag(handler: (state: FullGestureState<'drag'>) => any, config?: UserDragConfig) {
  const { emitOnEditStart, emitOnEditEnd } = useInputContext()
  return useDragHook((state) => {
    if (state.first) {
      document.body.classList.add('leva__panel__dragged')
      emitOnEditStart?.()
    }
    const result = handler(state)
    if (state.last) {
      document.body.classList.remove('leva__panel__dragged')
      emitOnEditEnd?.()
    }
    return result
  }, config)
}
