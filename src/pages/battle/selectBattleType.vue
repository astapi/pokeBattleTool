<template>
  <div class="container mx-auto p-5 min-h-screen flex flex-col justify-center">
    <div class="flex justify-center">
      <div class="flex flex-col lg:flex-row xl:flex-row">
        <button
          class="able-button p-16 text-2xl"
          @click="setBattleType('single')"
        >
          シングル
        </button>
        <button
          class="able-button sm:mt-10 mt-10 lg:mt-0 xl:mt-0 lg:ml-5 xl:ml-5 text-2xl"
          @click="setBattleType('double')"
        >
          ダブル
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { BattleType } from '@/interface/battoleLog'

@Component({})
export default class SelectBattleType extends Vue {
  setBattleType(battleType: BattleType): void {
    this.$store.commit('battle/setBattleType', battleType)
    this.$router.push('/battle/entry')
  }
}
</script>

<style lang="scss" scoped>
.container {
  .able-button {
    padding: 30px !important;
    width: 200px;
  }
}
</style>
