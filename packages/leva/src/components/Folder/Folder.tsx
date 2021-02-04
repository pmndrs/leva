import React, { useState } from 'react'
import mergeRefs from 'react-merge-refs'
import { FolderTitle } from './FolderTitle'
import { StyledFolder, StyledWrapper, StyledContent } from './StyledFolder'
import { getFolderSettings, store } from '../../store'
import { isInput } from '../Leva/tree'
import { join } from '../../utils'
import { Control } from '../Control'
import { useToggle } from '../../hooks'
import { FolderSettings, Tree } from '../../types/'

type FolderProps = { name?: string; parent?: string; tree: Tree }

const SubFolder = ({ name, parent, tree }: FolderProps) => {
  const path = join(parent, name)
  const settings = getFolderSettings(path)
  return <Folder name={name} parent={path} tree={tree} {...settings} />
}

const Folder = ({ name, render, collapsed = false, parent, tree }: FolderProps & FolderSettings) => {
  const shouldRender = !render || render(store.getValueAtPath)
  const [toggled, setToggle] = useState(!collapsed)

  return (
    <StyledFolder style={{ display: shouldRender ? 'block' : 'none' }}>
      <FolderTitle name={name!} toggled={toggled} toggle={() => setToggle((t) => !t)} />
      <Wrapper parent={parent} tree={tree} toggled={toggled} />
    </StyledFolder>
  )
}

type WrapperProps = { isRoot?: boolean; parent?: string; tree: Tree; toggled: boolean }

export const Wrapper = React.memo(
  React.forwardRef<HTMLDivElement, WrapperProps>(({ isRoot = false, parent, tree, toggled }, ref) => {
    const { wrapperRef, contentRef } = useToggle(toggled)
    return (
      <StyledWrapper ref={mergeRefs([ref, wrapperRef])} isRoot={isRoot} toggled={toggled}>
        <StyledContent ref={contentRef} isRoot={isRoot} toggled={toggled}>
          {Object.entries(tree).map(([key, value]) =>
            isInput(value) ? (
              // @ts-expect-error
              <Control key={value.path} valueKey={value.valueKey} path={value.path} />
            ) : (
              <SubFolder key={key} name={key} parent={parent} tree={value as Tree} />
            )
          )}
        </StyledContent>
      </StyledWrapper>
    )
  })
)
