import { Story, Meta } from '@storybook/react'

import Reset from '../../leva/stories/components/decorator-reset'
import { useControls } from '../../leva/src'
import { DateInput } from './date-types'

import { date } from './index'

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

export const CustomLocale = Template.bind({})
CustomLocale.args = { date: new Date(), locale: 'en-US' }

export const CustomInputFormat = Template.bind({})
CustomInputFormat.args = { date: new Date(), inputFormat: 'yyyy-MM-dd' }

export const WithOtherFields = () => {
  const { birthday, ...values } = useControls({
    text: 'text',
    birthday: date({ date: new Date() }),
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
