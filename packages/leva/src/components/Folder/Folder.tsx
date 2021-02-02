import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { FolderTitle, FolderTitleProps } from './FolderTitle'
import { StyledFolder, StyledWrapper, StyledContent } from './StyledFolder'
import { getFolderSettings } from '../../store'
import { isInput } from '../Leva/tree'
import { join } from '../../utils'
import { LevaWrapper } from '../LevaWrapper'
import { FolderSettings, Tree } from '../../types/'

type FolderProps = {
  name?: string
  parent?: string
  isRoot?: boolean
  TitleComponent?: (props: FolderTitleProps) => JSX.Element
  // folderOnTop?: boolean
  tree: Tree
} & FolderSettings

const createFolder = (key: string, parent: string = '', tree: Tree) => {
  const path = join(parent, key)
  const settings = getFolderSettings(path)
  return <Folder key={key} name={key} parent={path} tree={tree} {...settings} />
}

export const Folder = React.memo(
  ({ name, parent, tree, isRoot = false, collapsed = false, TitleComponent }: FolderProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const firstRender = useRef(true)

    const [toggled, setToggle] = useState(!collapsed)
    const toggle = useCallback(() => setToggle((t) => !t), [])

    const Title = useMemo(
      () =>
        TitleComponent ? (
          TitleComponent({ name, toggle, toggled })
        ) : (
          <FolderTitle name={name!} toggled={toggled} toggle={toggle} />
        ),

      [TitleComponent, name, toggle, toggled]
    )

    useEffect(() => {
      // prevents first animation
      if (firstRender.current) {
        firstRender.current = false
        return
      }

      let timeout: number
      const ref = wrapperRef.current!

      const fixHeight = () => toggled && ref.style.removeProperty('height')

      ref.addEventListener('transitionend', fixHeight, { once: true })

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
        {Title}
        <StyledWrapper ref={wrapperRef} isRoot={isRoot} toggled={toggled}>
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
