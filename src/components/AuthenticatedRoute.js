import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

const AuthenticatedRoute = ({ component: C, ...rest }) => {
  const { user } = useContext(AuthContext)
  return (
    <Route {...rest}
      render={props =>
        user
          ? <C {...props} />
          : <Redirect to={`/signin?redirectUrl=${window.location.pathname}`} />}
    />
  )
}


export default AuthenticatedRoute
