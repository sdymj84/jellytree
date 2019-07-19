/* 
** Props **
isLoading
size=[sm/lg]
*/

import React, { Fragment } from 'react'
import styled from 'styled-components'
import theme from '../theme'

const Container = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
  padding-top: 100px;
`
const Loader = styled.div`
  width: ${p => p.size === 'sm' ? '50px' : '80px'};
  height: ${p => p.size === 'sm' ? '50px' : '80px'};
  border-radius: 50%;
  background-color: ${p => p.theme.color};
  animation: jello-active 0.5s infinite;
  z-index: 9999;
  margin-right: 1em;
`
const TextWrap = styled.div`
  width: ${p => p.size === 'sm' ? '105px' : '170px'};
`
const LoadingText = styled.div`
  font-size: ${p => p.size === 'sm' ? '1.4em' : '2em'};
  color: ${p => p.theme.color};
  margin-top: ${p => p.size === 'sm' ? '10px' : '18px'};
  margin-left: ${p => p.size === 'sm' ? '0' : '0'}
  overflow: hidden;
  border-right: .15em solid orange;
  white-space: nowrap;
  letter-spacing: ${p => p.size === 'sm' ? '.08em' : '.15em'};
  animation: 
    typing 2.0s steps(10, start) infinite,
    blink-caret .75s step-end infinite;

  /* The typing effect */
  @keyframes typing {
    0% { width: 0; }
    50% { width: 100%; }
    90% { width: 100%; opacity:1 }
    100% { width: 100%; opacity: 0; }
  }

  /* The typewriter cursor effect */
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: orange; }
  }
`

const JellyLoader = (props) => {
  const size = props.size || (window.innerWidth < 600 ? 'sm' : 'lg')
  return (
    <Fragment>
      {props.isLoading
        ? <Container>
          <Loader theme={theme} size={size} />
          <TextWrap size={size}>
            <LoadingText theme={theme} size={size}>
              Loading...
          </LoadingText>
          </TextWrap>
        </Container>
        : props.children}
    </Fragment>
  )
}

export default JellyLoader
