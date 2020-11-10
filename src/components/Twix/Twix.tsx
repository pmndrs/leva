import React, { useMemo } from 'react'
// @ts-expect-error
import merge from 'merge-value'
import { useVisiblePaths } from '../../store'
import { getKeyPath, join } from '../../utils'
import { Folder } from './../Folder/'
import { InputWrapper } from '../InputWrapper'

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
  paths.forEach(p => {
    const [key, folderPath] = getKeyPath(p)
    merge(tree, join('__root', folderPath), {
      [`_i-${key}`]: <InputWrapper path={p} key={key} valueKey={key!} />,
    })
  })
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
