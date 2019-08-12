import urls from '../urls'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const getFbConfig = async () => {
  try {
    // Get firebase config from server
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

    // Initialize firebase with the config unless already initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    return firebase
  } catch (e) {
    console.log(e)
  }
}

export const getDb = async () => {
  return (await getFbConfig()).firestore()
}

export const getAuth = async () => {
  return (await getFbConfig()).auth()
}