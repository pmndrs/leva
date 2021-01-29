import React, { useState, useRef, useCallback } from 'react'
import { getFolderSettings } from '../../store'
import { join, isInput } from '../../utils'
import { LevaWrapper } from '../LevaWrapper'
import { StyledFolder, StyledTitle, StyledWrapper, StyledContent } from './StyledFolder'
import { FolderSettings, Tree } from '../../types/'

type FolderProps = {
  name?: string
  parent?: string
  root?: boolean
  folderOnTop?: boolean
  tree: Tree
} & FolderSettings

const createFolder = (key: string, parent: string = '', tree: Tree) => {
  const path = join(parent, key)
  const settings = getFolderSettings(path)
  return <Folder key={key} name={key} parent={path} tree={tree} {...settings} />
}

export function Folder({
  name = 'Leva',
  parent,
  tree,
  root = false,
  folderOnTop = false,
  collapsed = false,
}: FolderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOpen, setToggle] = useState(!collapsed)
  const toggle = useCallback(() => setToggle(t => !t), [])

  return (
    <StyledFolder root={root}>
      {!folderOnTop && (
        <StyledTitle onClick={toggle}>
          <i style={{ transform: `rotate(${isOpen ? -90 : 0}deg)` }} />
          <div>{name}</div>
        </StyledTitle>
      )}
      <StyledWrapper root={root} ref={wrapperRef} isCollapsed={!isOpen}>
        <StyledContent ref={contentRef} root={root} isVisible={isOpen}>
          <div>
            {Object.entries(tree).map(([key, value]) =>
              isInput(value) ? (
                // @ts-expect-error
                <LevaWrapper key={value.path} valueKey={value.valueKey} path={value.path} />
              ) : (
                createFolder(key, parent, value as Tree)
              )
            )}
          </div>
        </StyledContent>
      </StyledWrapper>
    </StyledFolder>
  )
}
