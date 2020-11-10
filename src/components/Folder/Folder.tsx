import React, { useState } from 'react'

type FolderProps = {
  name?: string
  tree: any
}

export function Folder({ name, tree }: FolderProps) {
  const [toggle, setToggle] = useState(false)
  return (
    <div
      className="f"
      style={{
        marginTop: 20,
        marginBottom: 20,
        marginLeft: name ? 50 : 0,
        border: '1px solid black',
        padding: 10,
      }}>
      {name && (
        <div style={{ marginBottom: 10, fontWeight: 'bold' }}>
          {name} <button onClick={() => setToggle(t => !t)}>{toggle ? 'Expand' : 'Collapse'}</button>
        </div>
      )}
      <div
        style={{
          maxHeight: toggle ? 0 : '100vh',
          overflow: 'hidden',
          transition: 'all 350ms ease',
        }}>
        {Object.entries(tree).map(([key, value]) => {
          // @ts-expect-error
          return React.isValidElement(value) ? value : <Folder key={key} name={key} tree={value} />
        })}
      </div>
    </div>
  )
}
