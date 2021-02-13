import React from 'react';
import { Story, Meta } from '@storybook/react';

import Reset from '../components/decorator-reset'

import { useControls } from '../../src';

export default {
  title: 'Inputs/Vector',
  decorators: [Reset]
} as Meta;

const Template: Story<any> = (args) => {
  const values = useControls({
    foo: args,
  })
  
  return <div><pre>{JSON.stringify(values, null, '  ')}</pre></div>;
}

export const Vector2 = Template.bind({});
Vector2.args = {
  value: { x: 0, y: 0 },
};

export const Vector2FromArray = Template.bind({});
Vector2FromArray.args = {
  value: [1, 10],
};

export const Vector3 = Template.bind({});
Vector3.args = {
  value: { x: 0, y: 0, z: 0 },
};

export const Vector3FromArray = Template.bind({});
Vector3FromArray.args = {
  value: [1, 10, 0],
};
