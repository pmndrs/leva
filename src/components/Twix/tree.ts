// @ts-expect-error
import merge from 'merge-value'
import { getKeyPath, join } from '../../utils'
import { Tree } from '../../types'

type RootTree = {
  __root: {
    [key: string]: Tree
  }
}

export const buildTree = (paths: string[], filter?: string) => {
  const tree = {}
  paths.forEach(path => {
    const [key, folderPath] = getKeyPath(path)
    if (!filter || key.indexOf(filter) > -1) {
      merge(tree, folderPath, {
        [`_i-${key}`]: { path, key, valueKey: key },
      })
    }
  })
  return tree as RootTree
}
