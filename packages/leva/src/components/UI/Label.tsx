import React, { useState } from 'react'
import { useInputContext } from '../../context'
import { StyledLabel, CopyLabelContainer } from './StyledUI'
import { writeText } from 'clipboard-polyfill/text'
import { LevaErrors, warn } from '../../utils'

type LabelProps = React.ComponentProps<typeof StyledLabel>

function LabelWithCopy(props: LabelProps) {
  const { value, label, key } = useInputContext()
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await writeText(JSON.stringify({ [key]: value || '' }))
      setCopied(true)
    } catch {
      warn(LevaErrors.CLIPBOARD_ERROR, { [key]: value })
    }
  }

  return (
    <CopyLabelContainer
      onClick={handleClick}
      title={`Click to copy ${label} value`}
      onPointerLeave={() => setCopied(false)}>
      <StyledLabel {...props} />
      {!copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </CopyLabelContainer>
  )
}

export function Label(props: LabelProps) {
  const { key } = useInputContext()
  const copyClipboard = key !== undefined

  return copyClipboard ? <LabelWithCopy {...props} /> : <StyledLabel {...props} />
}
