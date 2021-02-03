import React, { useMemo } from 'react'
import { FolderTitle, FolderTitleProps } from './FolderTitle'
import { StyledFolder, StyledWrapper, StyledContent } from './StyledFolder'
import { getFolderSettings, store } from '../../store'
import { isInput } from '../Leva/tree'
import { join } from '../../utils'
import { Control } from '../Control'
import { useToggle } from '../../hooks'
import { FolderSettings, Tree } from '../../types/'

type FolderProps = {
  name?: string
  parent?: string
  isRoot?: boolean
  TitleComponent?: (props: FolderTitleProps) => JSX.Element
  // folderOnTop?: boolean
  tree: Tree
} & FolderSettings

const SubFolder = ({ name, parent, tree }: Pick<FolderProps, 'name' | 'parent' | 'tree'>) => {
  const path = join(parent, name)
  const settings = getFolderSettings(path)
  return <Folder name={name} parent={path} tree={tree} {...settings} />
}

export const Folder = React.memo(
  ({ name, parent, tree, isRoot = false, collapsed = false, render, TitleComponent }: FolderProps) => {
    const { wrapperRef, contentRef, toggle, toggled } = useToggle(!collapsed)

    const Title = useMemo(() => {
      return TitleComponent ? (
        TitleComponent({ name, toggle, toggled })
      ) : (
        <FolderTitle name={name!} toggled={toggled} toggle={toggle} />
      )
    }, [TitleComponent, name, toggle, toggled])

    const shouldRender = !render || render(store.getValueAtPath)

    // don't render the folder
    if (!shouldRender) return null

    return (
      <StyledFolder>
        {Title}
        <StyledWrapper ref={wrapperRef} isRoot={isRoot} toggled={toggled}>
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
      </StyledFolder>
    )
  }
)
