import React from 'react'
import styled from 'styled-components'
import theme from '../theme'

const Change = styled.div`
  text-decoration: underline;
  cursor: pointer;
  :hover {
    color: ${theme.contrastColor};
  }
`

const ChangeCheckoutInfo = (props) => {
  return (
    <Change onClick={props.handleChange}>
      Change
    </Change>
  )
}

export default ChangeCheckoutInfo
