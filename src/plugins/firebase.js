import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

const apiKey = process.env.FIREBASE_APIKEY
const authDomain = process.env.FIREBASE_AUTHDOMAIN
const databaseURL = process.env.FIREBASE_DATABASEURL
const projectId = process.env.FIREBASE_PROJECTID
const storageBucket = process.env.FIREBASE_STORAGEBUCKET
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.FIREBASE_APPID
const measurementId = process.env.FIREBASE_MESUREMENTID

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.firestore().enablePersistence()
  if (process.env.ENV !== 'develop') {
    firebase.analytics()
  }
}
