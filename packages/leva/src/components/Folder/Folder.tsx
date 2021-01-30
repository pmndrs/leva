import React, { useState, useRef, useCallback, useEffect } from 'react'
import { getFolderSettings } from '../../store'
import { join, isInput } from '../../utils'
import { LevaWrapper } from '../LevaWrapper'
import { StyledFolder, StyledTitle, StyledWrapper, StyledContent } from './StyledFolder'
import { FolderSettings, Tree } from '../../types/'

type FolderProps = {
  name?: string
  parent?: string
  isRoot?: boolean
  folderOnTop?: boolean
  tree: Tree
} & FolderSettings

const createFolder = (key: string, parent: string = '', tree: Tree) => {
  const path = join(parent, key)
  const settings = getFolderSettings(path)
  return <Folder key={key} name={key} parent={path} tree={tree} {...settings} />
}

export const Folder = React.memo(
  ({ name = 'Leva', parent, tree, isRoot = false, folderOnTop = false, collapsed = false }: FolderProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const firstRender = useRef(true)

    const [toggled, setToggle] = useState(!collapsed)
    const toggle = useCallback(() => setToggle((t) => !t), [])

    useEffect(() => {
      let timeout: number
      const ref = wrapperRef.current!
      const fixHeight = () => toggled && ref.style.removeProperty('height')
      ref.addEventListener('transitionend', fixHeight, { once: true })

      // prevents first animation
      if (firstRender.current) {
        firstRender.current = false
        return
      }

      const { height } = contentRef.current!.getBoundingClientRect()
      if (toggled) ref.style.height = height + 'px'
      else {
        ref.style.height = height + 'px'
        timeout = window.setTimeout(() => (ref.style.height = '0px'), 50)
      }

      return () => {
        ref.removeEventListener('transitionend', fixHeight)
        clearTimeout(timeout)
      }
    }, [toggled])

    return (
      <StyledFolder isRoot={isRoot}>
        {!folderOnTop && (
          <StyledTitle onClick={toggle}>
            <i style={{ transform: `rotate(${toggled ? -90 : 0}deg)` }} />
            <div>{name}</div>
          </StyledTitle>
        )}
        <StyledWrapper ref={wrapperRef} isRoot={isRoot}>
          <StyledContent ref={contentRef} isRoot={isRoot} toggled={toggled}>
            {Object.entries(tree).map(([key, value]) =>
              isInput(value) ? (
                // @ts-expect-error
                <LevaWrapper key={value.path} valueKey={value.valueKey} path={value.path} />
              ) : (
                createFolder(key, parent, value as Tree)
              )
            )}
          </StyledContent>
        </StyledWrapper>
      </StyledFolder>
    )
  }
)
