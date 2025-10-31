import React from 'react'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },

  "previewTabs": {
    'storybook/docs/panel': { hidden: true }
  },

  options: {
    storySort: {
      order: ["Inputs", ["String", "Boolean", "Number", "Interval"], "Misc", "Plugins"]
    }
  },

  docs: {
    codePanel: true
  }
}

export const decorators = [(Story) => <div><Story /></div>]
