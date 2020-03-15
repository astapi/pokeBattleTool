<template>
  <div class="container">
    <div v-if="!isSend" class="pt-20 lg:p-20">
      <h2 class="font-bold">要望・問い合わせ</h2>
      <textarea
        v-model="message"
        class="mt-3 border bg-white rounded h-24 min-w-full p-2"
      />
      <div class="flex justify-center mt-10">
        <button class="able-button" @click="sendMessage">送信</button>
      </div>
    </div>
    <div v-else class="p-20">
      ありがとう！これからもよろしくおねがいします！
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import 'firebase/firestore'

@Component({})
export default class Contact extends Vue {
  message: string = ''
  isSend: boolean = false

  sendMessage(): void {
    if (this.message === '') return
    firebase
      .firestore()
      .collection('contact')
      .add({
        message: this.message,
        userUid: this.$store.state.loginUser.userUid,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    this.isSend = true
  }
}
</script>
