import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../contexts/AuthContext';
import { StyledFirebaseAuth } from "react-firebaseui";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 700px;
`

const SignIn = () => {
  const { auth, uiConfig, setUser } = useContext(AuthContext)

  return (
    <Container>
      {auth &&
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={auth} />}
    </Container>
  )
}

export default SignIn
