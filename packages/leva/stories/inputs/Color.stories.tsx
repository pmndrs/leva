import React from 'react';
import { Story, Meta } from '@storybook/react';

import Reset from '../components/decorator-reset'

import { useControls } from '../../src';

export default {
  title: 'Inputs/Color',
  decorators: [Reset]
} as Meta;

const Template: Story<any> = (args) => {
  const values = useControls({
    color: args,
  })

  const _color = React.useMemo(() => {
    const { color } = values

    if (typeof color !== "string") {

      
      let c = color as { r: number, g: number, b: number, a?: number  }

      if (c.a) {
        return `rgb(${c.r}, ${c.g}, ${c.b}, ${c.a})`
      }

      return `rgb(${c.r}, ${c.g}, ${c.b})`
      
    }
    
    return color

  }, [values.color])
  
  return <div style={{ width: "100vw", height: "100vh", padding: "2rem", backgroundColor: _color }}><pre>{JSON.stringify(values, null, '  ')}</pre></div>;
}

export const Hexadecimal = Template.bind({});
Hexadecimal.args = {
  value: "#ff005b",
};

export const Hex8 = Template.bind({});
Hex8.args = {
  value: "#ff005b88",
};

export const RGBObject = Template.bind({});
RGBObject.args = {
  value: { r: 248, g: 214, b: 40 }
};

export const RGBAObject = Template.bind({});
RGBAObject.args = {
  value: { r: 248, g: 214, b: 40, a: 1 }
};

export const String = Template.bind({});
String.args = {
  value: "royalblue"
};
