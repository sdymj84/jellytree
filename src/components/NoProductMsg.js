import React from 'react'
import styled from 'styled-components'
import { Message, Icon } from 'semantic-ui-react'

const isMobile = window.innerWidth < 600

const Container = styled.div`
  margin: 3em auto;
  text-align: center;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: ${isMobile ? 'wrap' : ''};
`

const NoProductMsg = (props) => {
  let msg = "Sorry, no product is available on this category at the moment."
  return (
    <Container>
      <Message floating info size="massive" compact>
        <Flex>
          <Icon name="frown outline" size="big"
            style={{ marginRight: '10px' }} />
          <div>{props.msg ? props.msg : msg}</div>
        </Flex>
      </Message>
    </Container>
  )
}

export default NoProductMsg
