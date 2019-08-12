import React, { createContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
// import 'firebase/auth'
import { getAuth } from "../libs/getFbConfig";

export const AuthContext = createContext()

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      console.log(authResult, redirectUrl)
      return true;
    },
  }
};

const AuthContextProvider = (props) => {
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
