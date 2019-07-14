import React, { useState } from 'react'
import MobileNavbar from './MobileNavbar'
import Logo from './Logo'
import Account from './Account'
import MobileAccount from './MobileAccount'
import styled from 'styled-components'
import { Grid, Icon } from 'semantic-ui-react'


const Container = styled.div`
  background-color: white;
  .ui.grid {
    margin-right: 0;
    margin-left: 0;
  }

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
  padding: 15px;
  opacity: ${p => p.scrolled ? '0.3' : '1'};
  :hover {
    cursor: pointer;
  }
  transition: opacity 0.5s;
`

const Header = () => {
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleShow = () => {
    setVisible(true)
  }
  const handleHide = () => {
    setVisible(false)
  }
  const menuOpacity = () => {
    window.pageYOffset > 150
      ? setScrolled(true)
      : setScrolled(false)
  }

  window.addEventListener('scroll', menuOpacity)

  return (
    <Container>
      <Grid doubling columns={3}>
        <Grid.Row>
          <Grid.Column className="mobile-logo-container">
            <Logo position="center" />
          </Grid.Column>
          <Grid.Column>
            {window.innerWidth < 400
              ? <MobileAccount />
              : <Account />
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <MenuIcon scrolled={visible ? false : scrolled}>
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
  )
}

export default Header
