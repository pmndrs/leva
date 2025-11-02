import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

// @ts-ignore
import Reset from '../../leva/stories/components/decorator-reset'
import { useControls } from 'leva'

import { date } from './index'
import { DateInput } from './date-types'

export default {
  title: 'Plugins/Dates',
  decorators: [Reset],
} as Meta

const Template: StoryFn<DateInput> = (args: DateInput) => {
  const { birthday } = useControls({ birthday: date(args) })
  return <div>{birthday.formattedDate}</div>
}

export const DefaultDate = Template.bind({})
DefaultDate.args = { date: new Date('2025-10-31') }

export const CustomLocale = Template.bind({})
CustomLocale.args = { date: new Date('2025-10-31'), locale: 'en-US' }

export const CustomInputFormat = Template.bind({})
CustomInputFormat.args = { date: new Date('2025-10-31'), inputFormat: 'yyyy-MM-dd' }

export const WithOtherFields = () => {
  const { birthday, ...values } = useControls({
    text: 'text',
    birthday: date({ date: new Date('2025-10-31') }),
    number: 0,
  })
  return (
    <div>
      {birthday.formattedDate}
      <br />
      {JSON.stringify(values)}
    </div>
  )
}
