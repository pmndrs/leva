import { useEffect, useRef } from 'react'
import { debounce } from '../utils'

export function useCanvas2d(
  fn: Function
): [React.RefObject<HTMLCanvasElement>, React.RefObject<CanvasRenderingContext2D>] {
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const hasFired = useRef(false)

  useEffect(() => {
    if (!canvas.current) return
    ctx.current = canvas.current.getContext('2d')
  }, [])

  // TODO this is pretty much useless in 90% of cases since panels
  // have a fixed width
  useEffect(() => {
    const onResize = debounce(
      () => {
        if (!canvas.current) return
        canvas.current.width = canvas.current.offsetWidth * window.devicePixelRatio
        canvas.current.height = canvas.current.offsetHeight * window.devicePixelRatio
        fn(canvas.current, ctx.current)
      },
      250,
      true
    )
    window.addEventListener('resize', onResize)
    if (!hasFired.current) {
      onResize()
      hasFired.current = true
    }
    return () => window.removeEventListener('resize', onResize)
  }, [fn])

  return [canvas, ctx]
}
