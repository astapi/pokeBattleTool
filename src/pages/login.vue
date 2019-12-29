<template>
  <div class="p-5 flex flex-col justify-center" style="height: 50vh;">
    <div class="flex justify-center">
      <button
        @click="login"
        class="bg-teal-100 font-bold py-2 px-1 border border-700 rounded w-20"
      >
        login
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import 'firebase/auth'

// https://storage.googleapis.com/poke-assets/pokemon/n876.gif
@Component({})
export default class Login extends Vue {
  mounted() {
    this.$store.commit('setIsLoading', true)
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result && result.user && result.user.uid) {
          this.$store.commit('loginUser/setUserUid', result.user.uid)
          this.$router.push('/')
        }
        this.$store.commit('setIsLoading', false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().languageCode = 'ja'
    firebase.auth().signInWithRedirect(provider)
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
