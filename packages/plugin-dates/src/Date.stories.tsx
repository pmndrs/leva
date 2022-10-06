import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../../leva/stories/components/decorator-reset'
import { useControls } from '../../leva/src'

import { date } from './index'
import { DateInput } from './date-types'

export default {
  title: 'Plugins/Dates',
  decorators: [Reset],
} as Meta

const Template: Story<DateInput> = (args) => {
  const { birthday } = useControls({ birthday: date(args) })
  return <div>{birthday.formattedDate}</div>
}

export const DefaultDate = Template.bind({})
DefaultDate.args = { date: new Date() }

export const CustomFormat = Template.bind({})
CustomFormat.args = { date: new Date(), format: 'dd/MM/yyyy' }
