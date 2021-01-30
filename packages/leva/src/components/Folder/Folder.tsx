import React, { useState, useRef, useCallback, useEffect } from 'react'
import { getFolderSettings } from '../../store'
import { join, isInput } from '../../utils'
import { LevaWrapper } from '../LevaWrapper'
import { StyledFolder, StyledTitle, StyledWrapper, StyledContent } from './StyledFolder'
import { useSpring, a } from 'react-spring'
import { FolderSettings, Tree } from '../../types/'

type FolderProps = {
  name?: string
  parent?: string
  root?: boolean
  folderOnTop?: boolean
  tree: Tree
} & FolderSettings

const AnimatedWrapper = a(StyledWrapper)

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
  const contentRef = useRef<HTMLDivElement>(null)
  const [toggled, setToggle] = useState(!collapsed)
  const firstRender = useRef(true)
  const toggle = useCallback(() => setToggle((t) => !t), [])

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
  }, [set, toggled])

  return (
    <StyledFolder root={root}>
      {!folderOnTop && (
        <StyledTitle onClick={toggle} root={root}>
          <svg
            style={{ transform: `rotate(${toggled ? -90 : 0}deg)` }}
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
      )}
      <AnimatedWrapper root={root} style={{ height }}>
        <StyledContent ref={contentRef} root={root} toggled={toggled}>
          {Object.entries(tree).map(([key, value]) =>
            isInput(value) ? (
              // @ts-expect-error
              <LevaWrapper key={value.path} valueKey={value.valueKey} path={value.path} />
            ) : (
              createFolder(key, parent, value as Tree)
            )
          )}
        </StyledContent>
      </AnimatedWrapper>
    </StyledFolder>
  )
}
