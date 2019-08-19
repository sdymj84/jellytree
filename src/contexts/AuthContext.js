import React, { createContext, useState, useEffect, useCallback } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import * as firebaseui from 'firebaseui'
import { getAuth, getDb } from "../libs/getFbConfig";

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


    // TODO: Signin flow

    * Sign in
        -- user
        -> get uid from auth
        -> get doc from user db where 'uid' === uid
          if there is user  // existing user signin
            -> get user info from the doc
            -> store it in user state
          else              // new user signup
            -> get user info from auth
            -> create user state with all user info
              (unknown info is saved as "")
            -> create doc in user db with user state

        -> get cart from session storage
          if there is cart  // user add cart anonymously and login
            -> add uid (from auth) on each cart products
            
            -> query all cart products from cart db where 'uid' === uid
            -> move those cart products to saveForLater db
            
            -> store session cart in cart db
            -> delete session cart
          else              // user login without adding cart
            -> get cart products from cart db where 'uid' === uid

    

  */
  const [user, setUser] = useState("loading")
  const [auth, setAuth] = useState("")
  const [db, setDb] = useState("")

  useEffect(() => {
    const getConfig = async () => {
      setAuth(await getAuth())
      setDb(await getDb())
    }
    getConfig()
  }, [])


  const signIn = useCallback(async (authUser) => {
    const { uid } = authUser
    const userSnapshot = await db.collection('users')
      .where('uid', '==', uid).get()

    // New user signed up
    if (userSnapshot.empty) {
      console.log('welcome new user')
      const nameArray = authUser.displayName.split(' ')
      const newUser = {
        uid: uid,
        email: authUser.email,
        displayName: authUser.displayName,
        emailVerified: authUser.emailVerified,
        isAnonymous: authUser.isAnonymous,
        creationTime: authUser.metadata.creationTime,
        lastSignInTime: authUser.metadata.lastSignInTime,
        firstName: nameArray[0],
        lastName: nameArray[nameArray.length - 1],
        phoneNumber: '',
        addresses: [],
        shippingAddress: {},
        paymentMethod: [],
        cart: [],
        hasAddress: false,
        hasPayment: false,
      }
      setUser(newUser)
      try {
        await db.collection('users').doc(uid).set(newUser)
      } catch (e) {
        console.log("Error adding user data to DB", e)
      }


      // Existing user signed in
    } else {
      console.log('hello again')
      try {
        userSnapshot.forEach(userDoc => {
          setUser(userDoc.data())
        })
      } catch (e) {
        console.log("Error getting user data from DB", e)
      }
    }
  }, [db])


  const signOut = () => {
    if (auth) {
      auth.signOut().then(() => {
        console.log("signed out")
      }).catch(() => {
        console.log("failed to sign out")
      })
    }
  }


  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        if (authUser) {
          signIn(authUser)
        } else {
          setUser(authUser)
        }
      })
      return () => {
        unsubscribe()
      }
    }
  }, [auth, signIn])


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
