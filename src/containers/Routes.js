import React from 'react'
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import SignIn from './Auth/SignIn';
import Bonnets from './Bonnets/Bonnets'
import Hats from './Hats/Hats'
import Scarves from './Scarves/Scarves'
import AllCollections from './AllCollections/AllCollections';
import Product from './Products/Product/Product'
import Checkout from './Checkout/Checkout';
import AuthenticatedRoute from '../components/AuthenticatedRoute';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/bonnets" component={Bonnets} />
      <Route path="/hats" component={Hats} />
      <Route path="/scarves" component={Scarves} />
      <Route path="/all-collections" component={AllCollections} />
      <Route path="/product/:id" component={Product} />
      <AuthenticatedRoute path="/checkout" component={Checkout} />
    </Switch>
  )
}

export default Routes
