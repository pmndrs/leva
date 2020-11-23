import React, { useState } from 'react'
import { getFolderSettings } from '../../store'
import { join } from '../../utils'
import { TwixWrapper } from '../TwixWrapper'
import { FolderSettings, Tree } from '../../types'

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
    <div>
      {name && (
        <div className="title" onClick={() => setToggle(t => !t)}>
          <div>{name}</div>
          <span>{toggle ? 'A' : 'V'}</span>
        </div>
      )}
      <div className="content" style={{ maxHeight: toggle ? 0 : '100vh' }}>
        {Object.entries(tree).map(([key, value]) => {
          // @ts-expect-error
          return isInput(key) ? <TwixWrapper {...value} /> : createFolder(key, parent, value as Tree)
        })}
      </div>
    </div>
  )
}
