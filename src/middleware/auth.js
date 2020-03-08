import firebase from 'firebase/app'
import 'firebase/auth'

export default function({ route, store, redirect }) {
  if (route.path.includes('/login')) return
  // if (store.state.loginUser.userUid === '') redirect('/login')
  store.commit('setIsLoading', true)
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.commit('loginUser/setUserUid', user.uid)
        resolve()
        store.commit('setIsLoading', false)
      } else {
        redirect('/login')
        store.commit('setIsLoading', false)
      }
    })
  })
}
