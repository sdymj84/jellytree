/* 
  visible, isAddrSelectorMode, handleChange
*/

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
  if (!props.visible) { return null }
  return (
    <Change onClick={props.handleChange}>
      {props.isAddrSelectorMode ? "Cancel" : "Change"}
    </Change>
  )
}

export default ChangeCheckoutInfo
