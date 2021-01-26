import styled from '@xstyled/styled-components'

export const StyledInputWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  padding: input;
  input {
    height: 0;
    width: 0;
    visibility: hidden;
    margin: 0;
  }

  label {
    position: relative;
    display: block;
    cursor: pointer;
    height: 12px;
    width: 30px;
    background-color: primary;
    border-radius: 20px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 8px;
    height: 8px;
    background-color: root-bg;
    border-radius: 4px;
    transition: 0.3s;
  }

  input:checked + label {
    background-color: accent;
  }

  input:checked + label:after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 12px;
  }
`
