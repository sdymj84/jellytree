import React, {
  createContext, useState,
  useEffect, useCallback
} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import * as firebaseui from 'firebaseui'
import { getAuth, getDb } from "../libs/getFbConfig";
import ConfirmModal from '../components/ConfirmModal';

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
            
            -> query all cart products from cart db where 'uid' === uid
            -> ask user if desired to merge cart or move to saveForLater
              if selected saveForLater
                -> move user cart products to saveForLater db
            
            -> store session cart (with uid) in cart db
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


  const [modalShow, setModalShow] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const handleModalClose = () => {
    setModalShow(false)
  }

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
    }

    // Existing user signed in
    else {
      console.log('hello again')
      try {
        userSnapshot.forEach(userDoc => {
          setUser(userDoc.data())
        })
        const sessionCart = JSON.parse(sessionStorage.getItem('cart'))

        // No session cart : user login without adding cart
        if (!sessionCart.length) {
          console.log("user logged in without adding cart")
        }
        // There's session cart : user added cart and login
        else {
          console.log("user added cart anonymously and logged in")
          const cartSnapshot = await db.collection('cart')
            .where('uid', '==', uid).get()

          // No user cart : just copy session cart to user cart
          if (cartSnapshot.empty) {
            console.log("Your user cart is empty, saving session cart to db")
          }
          // There's user cart : merge? or saveToLater?
          else {
            setModalShow(true)
            setModalMessage("You have previously saved cart products, " +
              "would you like to merge with the new ones?")

            // Select saveToLater

            // Select merge
            cartSnapshot.forEach(cartDoc => {
              console.log(cartDoc.data())
            })
          }

          // Store session cart (with uid) in cart db
          console.log(sessionCart)
          const newSessionCart = sessionCart.map(async product => {
            await db.collection('cart').doc(product.id).set({
              ...product, uid
            })
            return { ...product, uid }
          })
          // dispatchCartProducts({
          //   type: 'INITIAL_PRODUCTS_SUCCESS',
          //   payload: {
          //     cartProducts: newSessionCart
          //   }
          // })
          // Delete session cart
          sessionStorage.setItem('cart', JSON.stringify([]))
        }
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

      <ConfirmModal
        modalShow={modalShow}
        modalMessage={modalMessage}
        handleModalClose={handleModalClose}
        handleYesClick={handleModalClose}
        noButton="I want to purchase the new ones only. I'll save these for later"
        yesButton="Merge with new ones. I'll purchase altogether!"
        iconName='warning circle' />
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
