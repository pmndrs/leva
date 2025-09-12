import * as React from 'react'
import { levaStore } from '../../src'

const DefaultStory = (Story: () => JSX.Element) => {
  const [_, set] = React.useState(false)
  React.useEffect(() => {
    levaStore.dispose()
    set(true)
  }, [])
  return _ ? <Story /> : <></>
}

export default DefaultStory
