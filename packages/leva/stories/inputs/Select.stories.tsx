import React from 'react';
import { Story, Meta } from '@storybook/react';

import Reset from '../components/decorator-reset'

import { useControls } from '../../src';

export default {
  title: 'Inputs/Select',
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
  value: 'x',
  options: ['x', 'y']
};

export const CustomLabels = Template.bind({});
CustomLabels.args = {
  value: "Hello World!",
  options: {
    helloWorld: "Hello World!",
    leva: "Leva is awesome!"
  }
};