<template>
  <div class="p-5 flex flex-col justify-center">
    <div class="font-bold text-2xl text-center">PokemonBattleTool</div>
    <div class="flex justify-center mt-10">
      <button
        @click="loginOnTwitter"
        class="shadow rounded font-bold py-2 px-1 border border-700 rounded p-5"
      >
        twitterではじめる/ログイン
      </button>
    </div>
    <section class="flex justify-start mt-10 lg:px-20 xl:px-20">
      <v-help />
    </section>

    <div class="flex justify-center mt-10">
      <button
        @click="loginOnTwitter"
        class="shadow rounded font-bold py-2 px-1 border border-700 rounded p-5"
      >
        twitterではじめる/ログイン
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import 'firebase/auth'
import VHelp from '@/components/VHelp.vue'

@Component({
  layout: 'login',
  components: {
    VHelp
  }
})
export default class Logout extends Vue {
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

  loginOnTwitter() {
    this.$store.commit('setIsLoading', true)
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().languageCode = 'ja'
    firebase.auth().signInWithRedirect(provider)
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
