import React from 'react'
import Navbar from './Navbar'
import Logo from './Logo'
import Account from './Account'
import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";


const Container = styled.div`
  &&&& {
    .flex-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`

const Header = (props) => {
  if (props.location.pathname === '/checkout') {
    return null
  }
  return (
    <Container>
      <Grid doubling columns={3}>
        <Grid.Row>
          <Grid.Column only="computer" />
          <Grid.Column className="flex-center">
            <Logo />
          </Grid.Column>
          <Grid.Column className="upper-right">
            <Account />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Navbar contextRef={props.contextRef} />
    </Container>
  )
}

export default withRouter(Header)
