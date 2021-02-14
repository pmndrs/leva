import React, { useState } from 'react'
import { FolderTitle } from './FolderTitle'
import { StyledFolder, StyledWrapper, StyledContent } from './StyledFolder'
import { isInput } from '../Leva/tree'
import { join } from '../../utils'
import { Control } from '../Control'
import { useToggle } from '../../utils/hooks'
import { Tree } from '../../types/'
import { useStoreContext } from '../../context'

type FolderProps = { name: string; path?: string; tree: Tree }

const Folder = ({ name, path, tree }: FolderProps) => {
  const store = useStoreContext()
  const newPath = join(path, name)
  const { collapsed, render } = store.getFolderSettings(newPath)
  const shouldRender = !render || render(store.get)
  const [toggled, setToggle] = useState(!collapsed)

  return (
    <StyledFolder style={{ display: shouldRender ? 'block' : 'none' }}>
      <FolderTitle name={name!} toggled={toggled} toggle={() => setToggle((t) => !t)} />
      <TreeWrapper parent={newPath} tree={tree} toggled={toggled} />
    </StyledFolder>
  )
}

type TreeWrapperProps = { isRoot?: boolean; detached?: boolean; parent?: string; tree: Tree; toggled: boolean }

export const TreeWrapper = React.memo(
  ({ isRoot = false, detached = false, parent, tree, toggled }: TreeWrapperProps) => {
    const { wrapperRef, contentRef } = useToggle(toggled)
    return (
      <StyledWrapper ref={wrapperRef} isRoot={isRoot} detached={detached} toggled={toggled}>
        <StyledContent ref={contentRef} isRoot={isRoot} toggled={toggled}>
          {Object.entries(tree).map(([key, value]) =>
            isInput(value) ? (
              // @ts-expect-error
              <Control key={value.path} valueKey={value.valueKey} path={value.path} />
            ) : (
              <Folder key={key} name={key} path={parent} tree={value as Tree} />
            )
          )}
        </StyledContent>
      </StyledWrapper>
    )
  }
)
