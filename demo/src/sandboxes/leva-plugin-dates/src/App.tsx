import React from 'react'
import { date } from '@leva-ui/plugin-dates'
import { useControls } from 'leva'

export default function App() {
  const { birthday } = useControls({
    birthday: date({
      date: new Date(),
      locale: 'en-UK',
      inputFormat: 'dd.MM.yyyy',
    }),
  })

  return <div className="App">{birthday.formattedDate}</div>
}
