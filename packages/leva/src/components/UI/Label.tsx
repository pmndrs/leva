import React from 'react'
import { useInputContext } from '../../hooks'
import { StyledLabel } from './StyledUI'
import { writeText } from 'clipboard-polyfill/text'
import { LevaErrors, warn } from '../../utils'

type LabelProps = React.ComponentProps<typeof StyledLabel>

function LabelWithCopy(props: LabelProps) {
  const { value, valueKey } = useInputContext()

  const handleClick = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    try {
      writeText(JSON.stringify({ [valueKey]: value }))
    } catch {
      warn(LevaErrors.CLIPBOARD_ERROR, { [valueKey]: value })
    }

    props.onClick && props.onClick(event)
  }

  return <StyledLabel onClick={handleClick} {...props} />
}

export function Label(props: LabelProps) {
  const { valueKey } = useInputContext()
  const copyClipboard = valueKey !== undefined

  return copyClipboard ? <LabelWithCopy {...props} /> : <StyledLabel {...props} />
}
