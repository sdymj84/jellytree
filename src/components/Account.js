import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import Bag from './Bag'
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #bf00ff;
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
    border: 1px solid #2c5bc1;
    background-color: #2c5bc1;
    color: white;
    cursor: pointer;
  }
  :active {
    position: relative;
    top: 1px;
  }
`
const StyledLink = styled(Link)`
  :visited {
    color: navy;
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
