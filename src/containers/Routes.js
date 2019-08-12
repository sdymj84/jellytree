import React from 'react'
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import SignIn from './Auth/SignIn';
import Bonnets from './Bonnets/Bonnets'
import Toddlers from './Toddlers/Toddlers'
import BoysGirls from './BoysGirls/BoysGirls'
import AllCollections from './AllCollections/AllCollections';
import Product from './Products/Product/Product'
import Checkout from './Checkout/Checkout';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/bonnets" component={Bonnets} />
      <Route path="/toddlers" component={Toddlers} />
      <Route path="/boys-girls" component={BoysGirls} />
      <Route path="/all-collections" component={AllCollections} />
      <Route path="/product/:id" component={Product} />
      <Route path="/checkout" component={Checkout} />
    </Switch>
  )
}

export default Routes
