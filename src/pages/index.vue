<template>
  <div class="container mx-auto min-h-screen p-5">
    <section
      class="wrap flex flex-wrap mt-20 px-20 items-center justify-between"
    >
      <nuxt-link class="item md:w-2/5 lg:w-2/5 font-bold" to="/party">
        <button>対戦を開始する</button>
      </nuxt-link>
      <nuxt-link
        class="item md:w-2/5 lg:w-2/5 font-bold mt-10 md:mt-0 lg:mt-0"
        to="/battle/log"
      >
        <button>対戦のログ</button>
      </nuxt-link>
    </section>

    <section class="flex justify-start mt-10 lg:px-10 xl:px-10">
      <v-help class="shadow-md bg-white" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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
    }
  }
}
</style>
