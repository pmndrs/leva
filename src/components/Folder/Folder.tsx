import React, { useState, useRef, useCallback, useEffect } from 'react'
import { getFolderSettings } from '../../store'
import { join } from '../../utils'
import { TwixWrapper } from '../TwixWrapper'
import { StyledFolder, StyledTitle, StyledContent } from './StyledFolder'
import { useSpring, a } from 'react-spring'
import { FolderSettings, Tree } from '../../types'

type FolderProps = { name?: string; parent?: string; root?: boolean; tree: Tree } & FolderSettings

const isInput = (key: string) => key.indexOf('_i-') === 0

const createFolder = (key: string, parent: string = '', tree: Tree) => {
  const path = join(parent, key)
  const settings = getFolderSettings(path)
  return <Folder key={key} name={key} parent={path} tree={tree} {...settings} />
}

export function Folder({ name, parent, tree, root = false, collapsed = false }: FolderProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [toggled, setToggle] = useState(!collapsed)
  const firstRender = useRef(true)
  const toggle = useCallback(() => setToggle(t => !t), [])

  const [{ height }, set] = useSpring(() => ({ height: collapsed ? 0 : 'auto' }))

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const { height } = contentRef.current!.getBoundingClientRect()
    if (toggled) {
      set({ to: [{ height }, { height: 'auto' }] })
    } else set({ from: { height }, to: { height: 0 } })
  }, [toggled])

  return (
    <StyledFolder root={root}>
      {name && (
        <StyledTitle onClick={toggle}>
          <div>{name}</div>
          <span>{toggled ? 'A' : 'V'}</span>
        </StyledTitle>
      )}
      <a.div style={{ height }}>
        <StyledContent ref={contentRef} root={root}>
          {Object.entries(tree).map(([key, value]) =>
            // @ts-expect-error
            isInput(key) ? <TwixWrapper {...value} /> : createFolder(key, parent, value as Tree)
          )}
        </StyledContent>
      </a.div>
    </StyledFolder>
  )
}
