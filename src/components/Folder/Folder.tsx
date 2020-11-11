import React, { useState } from 'react'
import { getFolderSettings } from '../../store'
import { FolderSettings } from '../../types'
import { InputWrapper } from '../InputWrapper'
import style from './folder.module.css'

type FolderProps = { name?: string; tree: any } & FolderSettings

const isInput = (key: string) => key.indexOf('_i-') === 0

// @ts-expect-error
const createFolder = (key: string, { __path, ...tree }) => {
  const settings = getFolderSettings(__path)
  return <Folder key={key} name={key} tree={tree} {...settings} />
}

export function Folder({ name, tree, collapsed = false }: FolderProps) {
  const [toggle, setToggle] = useState(collapsed)
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
