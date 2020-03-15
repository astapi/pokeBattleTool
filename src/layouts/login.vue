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
@Component({
  components: {
    VueLoading
  }
})
export default class LoginLayout extends Vue {}
</script>

<style lang="scss">
html {
  background-color: #f3f3f3;
  font-family: sans-serif;
  input,
  select {
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    border-radius: 0;
    outline: none;
    text-indent: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type='text'],
  textarea {
    outline: none;
    border: 1px solid #aaa;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  input[type='text']:focus,
  textarea:focus {
    box-shadow: 0 0 7px #1abc9c;
    border: 1px solid #1abc9c;
  }
}
</style>
