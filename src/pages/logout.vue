<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import 'firebase/auth'

@Component({})
export default class Login extends Vue {
  mounted() {
    this.$store.commit('setIsLoading', true)
    firebase.auth().signOut().then(() => {
      this.$router.replace('/login')
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>