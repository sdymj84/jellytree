import React, {
  createContext, useState,
  useEffect
} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { getAuth, getDb } from "../libs/getFbConfig";
import queryString from 'query-string'

export const AuthContext = createContext()

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      const url = queryString.parse(window.location.search).redirectUrl
      window.location.replace(url)
      return false
    },
  }
};

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem('user')) || "loading"
  )
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
        sessionStorage.setItem('user', null)
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
