/* 
  1. get firebase config info from server (firebase function)
     on initial launch
  2. pass DB down to context consumers
*/

import React, { createContext, useState, useEffect } from 'react'
import urls from '../urls';
import axios from 'axios'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

export const DbContext = createContext()

const DbContextProvider = (props) => {
  const [db, setDb] = useState("")
  useEffect(() => {
    const getConfig = async () => {
      try {
        const res = await axios.get(urls.getConfig)
        const fbconfig = res.data
        const firebaseConfig = {
          apiKey: fbconfig.apikey,
          authDomain: fbconfig.authdomain,
          databaseURL: fbconfig.databaseurl,
          projectId: fbconfig.projectid,
          storageBucket: fbconfig.storagebucket,
          messagingSenderId: fbconfig.messagingsenderid,
          appId: fbconfig.appid
        }
        firebase.initializeApp(firebaseConfig)
        setDb(firebase.firestore())

      } catch (e) {
        console.log(e)
      }
    }
    getConfig()
  }, [])

  return (
    <DbContext.Provider value={{ db }}>
      {props.children}
    </DbContext.Provider >
  )
}

export default DbContextProvider
