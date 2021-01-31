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
  // folderOnTop?: boolean
  tree: Tree
} & FolderSettings

const createFolder = (key: string, parent: string = '', tree: Tree) => {
  const path = join(parent, key)
  const settings = getFolderSettings(path)
  return <Folder key={key} name={key} parent={path} tree={tree} {...settings} />
}

export const Folder = React.memo(({ name, parent, tree, isRoot = false, collapsed = false }: FolderProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  const [toggled, setToggle] = useState(!collapsed)
  const toggle = useCallback(() => setToggle((t) => !t), [])

  useEffect(() => {
    // prevents first animation
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    console.log('toggle')
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
      <StyledTitle onClick={toggle} isRoot={isRoot}>
        <svg
          style={{ transform: `rotate(${toggled ? 0 : -90}deg)` }}
          width="9"
          height="5"
          viewBox="0 0 9 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.82733 4.38848C4.20875 4.73523 4.79125 4.73523 5.17267 4.38848L8.08606 1.73994C8.76239 1.1251 8.32743 0 7.41339 0H1.58661C0.672575 0 0.237605 1.1251 0.913934 1.73994L3.82733 4.38848Z"
            fill="#383C4A"
          />
        </svg>
        <div>{name}</div>
      </StyledTitle>
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
})
