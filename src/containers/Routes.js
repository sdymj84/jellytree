import React from 'react'
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import SignIn from './Account/SignIn';
import AllCollections from './AllCollections/AllCollections';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/all-collections" component={AllCollections} />
    </Switch>
  )
}

export default Routes
