import React from 'react'
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import SignIn from './Account/SignIn';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
    </Switch>
  )
}

export default Routes
