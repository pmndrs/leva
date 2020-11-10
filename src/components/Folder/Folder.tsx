import React, { useState } from 'react'
import style from './folder.module.css'

type FolderProps = {
  name?: string
  tree: any
}

export function Folder({ name, tree }: FolderProps) {
  const [toggle, setToggle] = useState(false)
  return (
    <div
      className={style.container}>
        
      {name && (
        <div className={style.title} onClick={() => setToggle(t => !t)}>
          <div>
          {name} 
          </div>
          <span>{toggle ? 'A' : 'V'}</span>
        </div>
      )}
      
      {!toggle && <div
        style={{
          maxHeight: toggle ? 0 : '100vh',
          overflow: 'hidden',
          transition: 'all 350ms ease',
        }}
        className={style.content}
      >
        {Object.entries(tree).map(([key, value]) => {
          // @ts-expect-error
          return React.isValidElement(value) ? value : <Folder key={key} name={key} tree={value} />
        })}
      </div>}
      
    </div>
  )
}
