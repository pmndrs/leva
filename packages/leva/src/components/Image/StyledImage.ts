import { styled } from '../../styles'

export const DropZone = styled('div', {
  height: '100%',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: '$inputBorder',
  borderRadius: '$input',
  transition: '$borderBg',
  outline: 'none',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '$inputHoverBorder',
  },
  variants: {
    isDragAccept: {
      true: {
        backgroundColor: '$inputActiveBg',
        borderColor: '$inputFocusBorder',
      },
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  opacity: 0.4,
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
  borderRadius: '$input',
  backgroundColor: '$primary',
  border: '1px solid #ffffff99',
  ':hover': { borderColor: '#ffffffff', backgroundColor: '$accent' },
  transition: '$borderBg',

  '::after, ::before': {
    content: '""',
    position: 'absolute',
    height: '2px',
    width: '10px',
    borderRadius: '1px',
    backgroundColor: '#fff',
  },

  '::after': { transform: 'rotate(45deg)' },
  '::before': { transform: 'rotate(-45deg)' },
})
