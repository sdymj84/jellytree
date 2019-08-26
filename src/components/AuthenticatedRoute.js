import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

const AuthenticatedRoute = ({ component: C, ...rest }) => {
  const { user } = useContext(AuthContext)
  const isSignedIn = user && user !== 'loading'
  return (
    <Route {...rest}
      render={props =>
        isSignedIn
          ? <C {...props} />
          : <Redirect to={`/signin?redirectUrl=${window.location.pathname}`} />}
    />
  )
}


export default AuthenticatedRoute
