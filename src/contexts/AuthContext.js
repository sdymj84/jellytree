import React, { createContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'
import { getAuth } from "../libs/getFbConfig";

export const AuthContext = createContext()

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // callbacks: {
  //   signInSuccessWithAuthResult: function (authResult, redirectUrl) {
  //     console.log(authResult, redirectUrl)
  //     return false;
  //   },
  // }
};

const AuthContextProvider = (props) => {
  /* 
    user state
    - auth : uid, email, displayName, emailVerified, isAnonymous,
            metadata.creationTime, metadata.lastSignInTime
    - db.user : uid, email, firstName, middleName, lastName,
            phoneNumber,
            addresses: [
              {
                streetName, unitNumber,
                city, state, zipcode, country,
              },
            ],
            shippingAddress: {},
            payment method: [
              {
                name, cardNumber,
                expireMonth, expireYear, cvc,
                billingAddress: {}
              },
            ],
            cart: [
              {}
            ]
    - etc : hasAddress, hasPayment,



    == Flow ==

    -- cart
    -> get cart from session storage
    -> add uid on each cart products and save to cart db/state


    * Sign in

    -- user
    -> get uid from auth
    -> get doc from user db where 'uid' === uid
      if there is user
        -> get user info from the doc
        -> store it in user state

        -> get cart from session storage
        -> add uid (from auth) on each cart products

        -> get cart products from cart db where 'uid' === uid
        -> store it in cart state
      
      else
        -> get user info from auth
        -> create user state with all user info
           (unknown info is saved as "")
        -> create doc in user db with user state

        -> get cart from session storage
        -> add uid (from auth) on each cart products
        -> store cart in cart state
        -> store cart in cart db
        -> delete cart in session storage

    
    
  */
  const [user, setUser] = useState("loading")
  const [auth, setAuth] = useState("")
  useEffect(() => {
    const getConfig = async () => {
      setAuth(await getAuth())
    }
    getConfig()
  }, [])

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(user => {
        console.log(user)
        setUser(user)
      })
      return () => {
        unsubscribe()
      }
    }
  }, [auth])

  const signOut = () => {
    if (auth) {
      auth.signOut().then(() => {
        console.log("signed out")
      }).catch(() => {
        console.log("failed to sign out")
      })
    }
  }

  return (
    <AuthContext.Provider value={{
      user, setUser, uiConfig, auth,
      signOut,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
