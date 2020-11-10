import React, { useMemo } from 'react'
// @ts-expect-error
import merge from 'merge-value'
import { useVisiblePaths } from '../../store'
import { getKeyPath, join } from '../../utils'
import { Folder } from './../Folder/'

import styles from './twix.module.css'

type Leaf = {
  [key: string]: JSX.Element | Leaf
}

type Tree = {
  __root: {
    [key: string]: Leaf
  }
}

const buildTree = (paths: string[]) => {
  const tree = {}
  paths.forEach(path => {
    const [key, folderPath] = getKeyPath(path)
    merge(tree, join('__root', folderPath), {
      ...(folderPath ? { __path: folderPath } : null),
      [`_i-${key}`]: { path, key, valueKey: key },
    })
  })
  console.log({ tree })
  return tree as Tree
}

export function Twix() {
  const paths = useVisiblePaths()
  console.log('rendering Twix', paths)
  const folders = useMemo(() => buildTree(paths), [paths])
  if (!('__root' in folders)) return null
  return (
    <div className={styles.root}>
      <Folder tree={folders.__root} />
    </div>
  )
}
