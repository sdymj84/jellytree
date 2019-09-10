/* 
  visible, isAddrSelectorMode, handleChange
*/

import React from 'react'
import styled from 'styled-components'
import theme from '../theme'


const isMobile = window.innerWidth < 600

const Change = styled.div`
  text-decoration: underline;
  ${isMobile && `color: ${theme.contrastColor};`}
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
