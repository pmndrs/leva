import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types'
import { useState, useEffect } from 'react'
import { levaStore } from '../../src'

const DefaultStory = (Story: () => StoryFnReactReturnType) => {
  const [_, set] = useState(false)
  useEffect(() => {
    levaStore.dispose()
    set(true)
  }, [])
  return _ ? <Story /> : <></>
}

export default DefaultStory
