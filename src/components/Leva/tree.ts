// @ts-expect-error
import merge from 'merge-value'
import { getKeyPath } from '../../utils'
import { Tree } from '../../types/'

export const buildTree = (paths: string[], filter?: string): Tree => {
  const tree = {}
  const _filter = filter ? filter.toLowerCase() : null
  paths.forEach(path => {
    const [key, folderPath] = getKeyPath(path)
    if (!_filter || key.toLowerCase().indexOf(_filter) > -1) {
      merge(tree, folderPath, {
        [key]: { __levaInput: true, path, valueKey: key },
      })
    }
  })
  return tree
}
