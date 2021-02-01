import { styled } from '../../styles'

export const DropZone = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  overflow: 'hidden',
  minHeight: '$rowHeight',
  background: '$elevation3',
  color: '$text',
  borderRadius: '$sm',
  transition: '$borderBg',
  outline: 'none',
  cursor: 'pointer',
  '&:hover': {},
  variants: {
    isDragAccept: {
      true: {},
    },
  },
})

export const Preview = styled('div', {
  position: 'relative',
  width: '100%',
  '> img': {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
})

export const Instructions = styled('div', {
  fontSize: '0.8em',
  height: '100%',
  padding: '$rowV $rowH',
})

export const Remove = styled('div', {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: '0',
  right: '0',
  margin: '$rowV $rowH',
  height: '20px',
  width: '20px',
  borderRadius: '$sm',
  backgroundColor: '$elevation3',
  transition: '$borderBg',

  ':hover': { backgroundColor: '$accent' },

  '::after,::before': {
    content: '""',
    position: 'absolute',
    height: '2px',
    width: '10px',
    borderRadius: '1px',
    backgroundColor: '$textEmphasized',
  },

  '::after': { transform: 'rotate(45deg)' },
  '::before': { transform: 'rotate(-45deg)' },
})
