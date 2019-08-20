import React, {
  createContext, useState,
  useEffect
} from 'react'
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
      user, setUser, uiConfig, auth, db,
      signOut,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
