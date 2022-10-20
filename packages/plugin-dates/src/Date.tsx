import { Components, useInputContext } from 'leva/plugin'
import React, { forwardRef, useCallback } from 'react'
import DatePicker, { CalendarContainer } from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import { DateCalendarContainerProps, DateInputProps, DateProps } from './date-types'
import { InputContainer, StyledInput, StyledWrapper } from './StyledDate'

const { Label, Row } = Components

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

export function Date() {
  const { label, value, onUpdate, settings } = useInputContext<DateProps>()

  const update = useCallback(
    (fn: (value: Date) => void) => (date: Date) => {
      fn(date)
    },
    []
  )

  return (
    <Row input>
      <Label>{label}</Label>
      <InputContainer>
        <DatePicker
          selected={value.date}
          onChange={update(onUpdate)}
          dateFormat={settings.inputFormat}
          calendarContainer={DateCalendarContainer}
          customInput={<DateInput />}
        />
      </InputContainer>
    </Row>
  )
}
