import React from 'react';
import Reset from './components/decorator-reset'
import { Story, Meta } from '@storybook/react';

import { useControls } from '../src';

export default {
  title: 'Inputs/String',
  decorators: [Reset]
} as Meta;

const Template: Story<any> = (args) => {
  const values = useControls({
    foo: args,
  })
  
  return <div><pre>{JSON.stringify(values, null, '  ')}</pre></div>;
}

export const Simple = Template.bind({});
Simple.args = {
  value: "Leva is awesome"
};