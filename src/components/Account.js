import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import Bag from './Bag'
import { Link } from "react-router-dom";
import theme from '../theme'

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${theme.color};
`

const SignContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

const Sign = styled.div`
  margin-left: 0.4em;
  border: 1px solid white;
  border-radius: 7px;
  padding: 4px 8px;
  animation: button-hover-out 0.3s;

  :hover {
    animation: button-hover-in 0.3s;
    border: 1px solid ${theme.color};
    background-color: ${theme.color};
    color: white;
    cursor: pointer;
  }
  :active {
    position: relative;
    top: 1px;
  }
`
const StyledLink = styled(Link)`
  color: ${theme.color};
  :hover {
    text-decoration: none;
  }
  :visited {
    color: ${theme.color};
  }
`

const Account = () => {
  return (
    <Container>
      <SignContainer>
        <StyledLink to="signin">
          <Sign>
            <Icon name="sign in" />
            <span>Sign In</span>
          </Sign>
        </StyledLink>
        <Sign>
          <Icon name="signup" />
          <span>Sign Up</span>
        </Sign>
      </SignContainer>
      <Bag />
    </Container>
  )
}

export default Account
