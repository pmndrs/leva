// @ts-expect-error
import merge from 'merge-value'
import { getKeyPath, join } from '../../utils'

type Leaf = {
  [key: string]: JSX.Element | Leaf
}

type Tree = {
  __root: {
    [key: string]: Leaf
  }
}

export const buildTree = (paths: string[]) => {
  const tree = {}
  paths.forEach(path => {
    const [key, folderPath] = getKeyPath(path)
    merge(tree, join('__root', folderPath), {
      [`_i-${key}`]: { path, key, valueKey: key },
    })
  })
  return tree as Tree
}
