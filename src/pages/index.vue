<template>
  <div class="container min-h-screen p-5">
    <section
      class="wrap flex flex-wrap mt-20 px-20 items-center justify-between"
    >
      <div class="item md:w-2/5 lg:w-2/5">
        <nuxt-link class="font-bold" to="/party">対戦を開始する</nuxt-link>
      </div>
      <div class="item md:w-2/5 lg:w-2/5">
        <p class="font-bold">対戦のログ</p>
      </div>
    </section>

    <section class="flex justify-start mt-10 lg:px-10 xl:px-10">
      <v-help class="shadow bg-gray-100" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VHelp from '@/components/VHelp.vue'

@Component({
  components: {
    VHelp
  }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  .wrap {
    .item {
      @apply w-full border shadow bg-white h-20 flex justify-center items-center rounded;
      @screen md {
        @apply w-2/5;
      }
      @screen lg {
        @apply w-2/5;
      }
      margin: 5px;
    }
  }
}
</style>
