import { useMemo } from 'react'
import { useControls, Leva } from 'leva'
import './styles.css'

export default function App() {
  const { text, number } = useControls({
    text: { value: 0, step: 1 },
    number: { value: 10000, min: 1000, max: 10000 },
  })

  const array = useMemo(() => new Array(number).fill(0), [number])

  return (
    <>
      <Leva titleBar={false} />
      <div className="grid">
        {array.map((_, i) => (
          <div key={i}>{text}</div>
        ))}
      </div>
    </>
  )
}
