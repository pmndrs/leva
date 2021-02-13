import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types'
import * as React from 'react'
import { store } from '../../src';

export default (Story: () => StoryFnReactReturnType) => {
    const [_, set] = React.useState(false)

    React.useEffect(() => {
      store.dispose()
      set(true)
    }, [])
    return _ ? <Story /> : <></>
  }