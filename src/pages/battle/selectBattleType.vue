<template>
  <div class="container p-5 min-h-screen flex flex-col justify-center">
    <div class="flex justify-center">
      <div>
        <button @click="setBattleType('single')" class="able-button p-16 text-2xl">シングル</button>
        <button @click="setBattleType('double')" class="able-button ml-5 text-2xl">ダブル</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { BattleType } from '../../interface/battoleLog';

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
