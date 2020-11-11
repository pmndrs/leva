import React, { useMemo } from 'react'
import { useVisiblePaths } from '../../store'
import { Folder } from './../Folder/'
import { buildTree } from './tree'

import styles from './twix.module.css'

export function Twix() {
  const paths = useVisiblePaths()
  console.log('rendering Twix', paths)
  const tree = useMemo(() => buildTree(paths), [paths])
  if (!('__root' in tree)) return null
  return (
    <div className={styles.root}>
      <Folder tree={tree.__root} />
    </div>
  )
}
