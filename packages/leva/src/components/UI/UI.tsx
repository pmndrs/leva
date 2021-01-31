import React from 'react'
import { useInputContext } from '../../hooks'
import { StyledLabel } from './StyledUI'
import { writeText } from 'clipboard-polyfill/text'
import { LevaErrors, warn } from '../../utils'

export { Row } from './StyledUI'

type LabelProps = React.ComponentProps<typeof StyledLabel>

export function Label(props: LabelProps) {
  const { value, valueKey } = useInputContext()
  const copyClipboard = valueKey !== undefined

  const handleClick = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    if (copyClipboard) {
      try {
        writeText(JSON.stringify({ [valueKey]: value }))
      } catch {
        warn(LevaErrors.CLIPBOARD_ERROR, { [valueKey]: value })
      }
    }
    props.onClick && props.onClick(event)
  }

  return <StyledLabel copyClipboard={copyClipboard} onClick={handleClick} {...props} />
}

type OverlayProps = { onClick: () => void }

// TODO should we rather use something like use-onclickoutside?

export function Overlay({ onClick }: OverlayProps) {
  return <div style={{ position: 'fixed', top: 0, bottom: 0, right: 0, left: 0 }} onClick={onClick} />
}
