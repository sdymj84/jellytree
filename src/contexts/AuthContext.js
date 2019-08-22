import React, {
  createContext, useState,
  useEffect, useReducer,
} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { getAuth, getDb } from "../libs/getFbConfig";
import queryString from 'query-string'
import userReducer from '../reducers/userReducer';

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


// const userReducer = (user, action) => {
//   switch (action.type) {
//     case 'SET_USER':
//       return action.payload.user
//     case 'ADD_ADDRESS':
//       return {
//         ...user,
//         addresses: [action.payload.newAddress, ...user.addresses]
//       }
//     case 'MODIFY_ADDRESS':
//       break
//     case 'REMOVE_ADDRESS':
//       break
//     case 'ADD_PAYMENT':
//       break
//     case 'MODIFY_PAYMENT':
//       break
//     case 'REMOVE_PAYMENT':
//       break
//     default:
//       break;
//   }
// }


const AuthContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(userReducer,
    JSON.parse(sessionStorage.getItem('user')) || "loading"
  )

  const [auth, setAuth] = useState("")
  const [db, setDb] = useState("")
  const [keepSignin, setKeepSignin] = useState(
    JSON.parse(localStorage.getItem('keepSignin'))
  )

  // Get auth/db from Firebase config file
  useEffect(() => {
    const getConfig = async () => {
      setAuth(await getAuth())
      setDb(await getDb())
    }
    getConfig()
  }, [])


  // Options to keep user signin or not
  useEffect(() => {
    if (!auth) { return }

    keepSignin
      ? auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      : auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)

  }, [auth, keepSignin])

  const signOut = () => {
    if (auth) {
      auth.signOut().then(() => {
        console.log("signed out")
        sessionStorage.setItem('user', null)
        localStorage.setItem('keepSignin', null)
      }).catch(() => {
        console.log("failed to sign out")
      })
    }
  }

  console.log(user)
  return (
    <AuthContext.Provider value={{
      user, dispatchUser, uiConfig, auth, db,
      signOut, keepSignin, setKeepSignin,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
