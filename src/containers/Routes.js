import React from 'react'
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import SignIn from './Account/SignIn';
import Babies from './Babies/Babies'
import Toddlers from './Toddlers/Toddlers'
import BoysGirls from './BoysGirls/BoysGirls'
import AllCollections from './AllCollections/AllCollections';
import Product from './Products/Product'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={Product} />
      <Route path="/signin" component={SignIn} />
      <Route path="/babies" component={Babies} />
      <Route path="/toddlers" component={Toddlers} />
      <Route path="/boys-girls" component={BoysGirls} />
      <Route path="/all-collections" component={AllCollections} />
    </Switch>
  )
}

export default Routes
