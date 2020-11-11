import React, { useState } from 'react'
import { getFolderSettings } from '../../store'
import { join } from '../../utils'
import { InputWrapper } from '../InputWrapper'
import { FolderSettings, Tree } from '../../types'

import styles from './folder.module.css'

type FolderProps = { name?: string; parent?: string; tree: Tree } & FolderSettings

const isInput = (key: string) => key.indexOf('_i-') === 0

const createFolder = (key: string, parent: string = '', tree: Tree) => {
  const path = join(parent, key)
  const settings = getFolderSettings(path)
  return <Folder key={key} name={key} parent={path} tree={tree} {...settings} />
}

export function Folder({ name, parent, tree, collapsed = false }: FolderProps) {
  const [toggle, setToggle] = useState(collapsed)
  return (
    <div className={styles.container}>
      {name && (
        <div className={styles.title} onClick={() => setToggle(t => !t)}>
          <div>{name}</div>
          <span>{toggle ? 'A' : 'V'}</span>
        </div>
      )}
      <div className={styles.content} style={{ maxHeight: toggle ? 0 : '100vh' }}>
        {Object.entries(tree).map(([key, value]) => {
          // @ts-expect-error
          return isInput(key) ? <InputWrapper {...value} /> : createFolder(key, parent, value as Tree)
        })}
      </div>
    </div>
  )
}
