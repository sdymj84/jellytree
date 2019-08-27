import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Checkbox, Popup } from 'semantic-ui-react'
import { AuthContext } from '../../contexts/AuthContext';
import { StyledFirebaseAuth } from "react-firebaseui";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 700px;
`

const SignIn = () => {
  const { auth, uiConfig, setKeepSignin } = useContext(AuthContext)
  const [checked, setChecked] = useState(() =>
    JSON.parse(localStorage.getItem('keepSignin'))
  )
  const handleCheckboxChange = () => {
    setChecked(!checked)
    setKeepSignin(!checked)
    localStorage.setItem('keepSignin', JSON.stringify(!checked))
  }

  if (!auth) { return null }

  return (
    <Container>
      <Popup content="Will keep you signin until you manually signout. 
        Please don't use on shared device." trigger={
        <Checkbox
          label="Keep Me Signed In"
          onChange={handleCheckboxChange}
          checked={checked} />
      } />
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={auth} />
    </Container>
  )
}

export default SignIn
