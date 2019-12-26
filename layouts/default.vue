<template>
  <div>
    <div
      v-show="$store.state.isLoading"
      class="flex flex-col justify-center"
      style="height: 100vh;"
    >
      <vue-loading
        :size="{ width: '100px', height: '100px' }"
        class="ml-5"
        type="bars"
        color="#d9544e"
      ></vue-loading>
    </div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { VueLoading } from 'vue-loading-template'

// https://storage.googleapis.com/poke-assets/pokemon/n876.gif
@Component({
  components: {
    VueLoading
  }
})
export default class Default extends Vue {}
</script>

<style>
html {
  background-color: #f5f4f1;
  font-family: sans-serif;
}
</style>
