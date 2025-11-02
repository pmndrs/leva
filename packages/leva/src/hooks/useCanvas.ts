import { useEffect, useRef } from 'react'
import { debounce } from '../utils'

/**
 * A hook that manages a 2D canvas element with automatic resize handling.
 *
 * @public - For plugin development
 *
 * The hook automatically sets up the canvas with proper DPI scaling and calls
 * the provided render function on mount and whenever the window is resized.
 *
 * @param fn - A render function that receives the canvas and context refs
 * @returns A tuple of [canvasRef, contextRef] to attach to your canvas element
 *
 * @example
 * function MyCanvasComponent() {
 *   const [canvasRef] = useCanvas2d((canvas, ctx) => {
 *     // Clear canvas
 *     ctx.clearRect(0, 0, canvas.width, canvas.height)
 *
 *     // Draw a circle
 *     ctx.beginPath()
 *     ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2)
 *     ctx.fillStyle = '#ff0000'
 *     ctx.fill()
 *   })
 *
 *   return <canvas ref={canvasRef} style={{ width: '100%', height: '200px' }} />
 * }
 */
export function useCanvas2d(
  fn: Function
): [React.RefObject<HTMLCanvasElement>, React.RefObject<CanvasRenderingContext2D>] {
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const hasFired = useRef(false)

  // TODO this is pretty much useless in 90% of cases since panels
  // have a fixed width
  useEffect(() => {
    const handleCanvas = debounce(() => {
      canvas.current!.width = canvas.current!.offsetWidth * window.devicePixelRatio
      canvas.current!.height = canvas.current!.offsetHeight * window.devicePixelRatio
      fn(canvas.current, ctx.current)
    }, 250)
    window.addEventListener('resize', handleCanvas)
    if (!hasFired.current) {
      handleCanvas()
      hasFired.current = true
    }
    return () => window.removeEventListener('resize', handleCanvas)
  }, [fn])

  useEffect(() => {
    ctx.current = canvas.current!.getContext('2d')
  }, [])

  return [canvas, ctx]
}
