// import { Joystick3d } from './UI/Joystick3d'
// import type { Vector3jProps } from './vector3j-types'

// export function Vector3j() {
//   const { label, displayValue, onUpdate, settings } = useInputContext<Vector3jProps>()
//   return (
//     <Row input>
//       <Label>{label}</Label>
//       <Container withJoystick={!!settings.joystick}>
//         {settings.joystick && <Joystick3d value={displayValue} settings={settings} onUpdate={onUpdate} />}
//         <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
//       </Container>
//     </Row>
//   )
// }

import React, { forwardRef } from 'react'
import { Components, useInputContext } from 'leva/plugin'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DateCalendarContainerProps, DateInputProps, DateProps } from './vector3j-types'
import { InputContainer, StyledInput, StyledWrapper } from './StyledVector3j'

const { Label, Row, Vector } = Components

const DateCalendarContainer = ({ children }: DateCalendarContainerProps) => {
  return (
    <CalendarContainer>
      <StyledWrapper>{children}</StyledWrapper>
    </CalendarContainer>
  )
}

const DateInput = forwardRef<HTMLInputElement, Partial<DateInputProps>>(({ value, onClick, onChange }, ref) => {
  return <StyledInput ref={ref} value={value} onClick={onClick} onChange={onChange} />
})

export function Vector3j() {
  const { label, value, onUpdate, settings } = useInputContext<DateProps>()

  return (
    <Row input>
      <Label>{label}</Label>
      <InputContainer>
        <DatePicker
          selected={value.date}
          onChange={onUpdate}
          dateFormat={settings.inputFormat}
          calendarContainer={DateCalendarContainer}
          customInput={<DateInput />}
        />
      </InputContainer>
    </Row>
  )
}

/* FIXME: replace true with !!settings.joystick */
/* FIXME: replace true with settings.joystick */
/* 
<Row input>
<Label>{label}</Label>
<InputContainer withJoystick={true}>
  {true && <Joystick3d value={displayValue} settings={settings} onUpdate={onUpdate} />}
  <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
</InputContainer>
</Row> 
*/
