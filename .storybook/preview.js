
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
}

export const  decorators = [(Story) => <div style={{ color: "white" }}><Story /></div>]
