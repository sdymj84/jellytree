import React, { useState } from 'react'
import MobileNavbar from './MobileNavbar'
import Logo from './Logo'
import Account from './Account'
import styled from 'styled-components'
import { Grid, Icon } from 'semantic-ui-react'


const Container = styled.div`
  background-color: white;

  &&& {
    .mobile-logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      margin-left: 3em;
    }
  }
`
const MenuIcon = styled.div`
  display: inline-block;
  position: fixed;
  top: 5px;
  left: 0;
  z-index: 2;
  /* top: 15px;
  left: 15px; */
  padding: 15px;
  
  :hover {
    cursor: pointer;
  }
`

const Header = () => {
  const [visible, setVisible] = useState(false)
  const handleShow = () => {
    setVisible(true)
  }
  const handleHide = () => {
    setVisible(false)
  }
  return (
    // <Sticky>
    <Container>
      <Grid doubling columns={3}>
        <Grid.Row>
          <Grid.Column className="mobile-logo-container">
            <Logo position="center" />
          </Grid.Column>
          <Grid.Column>
            <Account />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <MenuIcon>
        {visible
          ? <Icon name="close" size="big"
            onClick={handleHide} />
          : <Icon name="sidebar" size="big"
            onClick={handleShow} />}
      </MenuIcon>
      <MobileNavbar
        visible={visible}
        handleShow={handleShow}
        handleHide={handleHide} />
    </Container>
    // </Sticky>
  )
}

export default Header
