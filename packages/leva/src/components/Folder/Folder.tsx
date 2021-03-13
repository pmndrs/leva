import React, { useState } from 'react'
import { FolderTitle } from './FolderTitle'
import { StyledFolder, StyledWrapper, StyledContent } from './StyledFolder'
import { isInput } from '../Leva/tree'
import { join } from '../../utils'
import { Control } from '../Control'
import { useToggle } from '../../hooks'
import { useStoreContext } from '../../context'
import type { Tree } from '../../types'

type FolderProps = { name: string; path?: string; tree: Tree; hideCopyButton: boolean }

const Folder = ({ name, path, tree, hideCopyButton }: FolderProps) => {
  const store = useStoreContext()
  const newPath = join(path, name)
  const { collapsed } = store.getFolderSettings(newPath)
  const [toggled, setToggle] = useState(!collapsed)

  return (
    <StyledFolder>
      <FolderTitle name={name!} toggled={toggled} toggle={() => setToggle((t) => !t)} />
      <TreeWrapper parent={newPath} tree={tree} toggled={toggled} hideCopyButton={hideCopyButton} />
    </StyledFolder>
  )
}

type TreeWrapperProps = {
  isRoot?: boolean
  fill?: boolean
  flat?: boolean
  hideCopyButton?: boolean
  parent?: string
  tree: Tree
  toggled: boolean
}

export const TreeWrapper = React.memo(
  ({ isRoot = false, fill = false, flat = false, hideCopyButton = false, parent, tree, toggled }: TreeWrapperProps) => {
    const { wrapperRef, contentRef } = useToggle(toggled)
    return (
      <StyledWrapper ref={wrapperRef} isRoot={isRoot} fill={fill} flat={flat} toggled={toggled}>
        <StyledContent ref={contentRef} isRoot={isRoot} toggled={toggled}>
          {Object.entries(tree).map(([key, value]) =>
            isInput(value) ? (
              // @ts-expect-error
              <Control key={value.path} valueKey={value.valueKey} path={value.path} hideCopyButton={hideCopyButton} />
            ) : (
              <Folder key={key} name={key} path={parent} tree={value as Tree} hideCopyButton={hideCopyButton} />
            )
          )}
        </StyledContent>
      </StyledWrapper>
    )
  }
)
