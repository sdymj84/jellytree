import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

const UnauthenticatedRoute = ({ component: C, ...rest }) => {
  const { user } = useContext(AuthContext)
  const isSignedIn = user && user !== 'loading'
  return (
    <Route {...rest}
      render={props =>
        isSignedIn
          ? <Redirect to='/' />
          : <C {...props} />}
    />
  )
}


export default UnauthenticatedRoute
