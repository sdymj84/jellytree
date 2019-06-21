import React from 'react'
import Navbar from './Navbar'
import Logo from './Logo'
import Account from './Account'
import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

const Container = styled.div`
`

const Header = () => {
  return (
    <Container>
      <Grid doubling columns={3}>
        <Grid.Row>
          <Grid.Column only="computer" />
          <Grid.Column>
            <Logo position="center" />
          </Grid.Column>
          <Grid.Column className="upper-right">
            <Account />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Navbar />
    </Container>
  )
}

export default Header
