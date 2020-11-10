import React, { useState } from 'react'
import { useFolderSettings } from '../../store'
import { InputWrapper } from '../InputWrapper'
import style from './folder.module.css'

type FolderProps = {
  name?: string
  path?: string
  tree: any
}

const isInput = (key: string) => key.indexOf('_i-') === 0

// @ts-expect-error
const createFolder = (key: string, { __path, ...tree }) => {
  return <Folder key={key} path={__path} name={key} tree={tree} />
}

export function Folder({ name, path, tree }: FolderProps) {
  const settings = useFolderSettings(path) || { collapsed: false }
  const [toggle, setToggle] = useState(!!settings.collapsed)

  return (
    <div className={style.container}>
      {name && (
        <div className={style.title} onClick={() => setToggle(t => !t)}>
          <div>{name}</div>
          <span>{toggle ? 'A' : 'V'}</span>
        </div>
      )}

      {!toggle && (
        <div
          style={{
            maxHeight: toggle ? 0 : '100vh',
            overflow: 'hidden',
            transition: 'all 350ms ease',
          }}
          className={style.content}>
          {Object.entries(tree).map(([key, value]) => {
            // @ts-expect-error
            return isInput(key) ? <InputWrapper {...value} /> : createFolder(key, value)
          })}
        </div>
      )}
    </div>
  )
}
