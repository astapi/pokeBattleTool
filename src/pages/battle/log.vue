<template>
  <div class="container relative p-5">
    <section class="absolute right-0">
      <nuxt-link to="/" class="able-button">対戦データサマリ</nuxt-link>
    </section>

    <section class="w-full flex flex-col items-center">
      <section class="sumary-result flex">
        <table class="table-auto bg-white rounded shadow">
          <thead>
            <tr>
              <th class="px-4 py-2">Win</th>
              <th class="px-4 py-2">Lose</th>
              <th class="px-4 py-2">勝率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2 text-center">{{ win }}</td>
              <td class="border px-4 py-2 text-center">{{ lose }}</td>
              <td class="border px-4 py-2 text-center">{{ winRate }}%</td>
            </tr>
          </tbody>
        </table>
      </section>
      <ul>
        <template v-for="log of logList">
          <li
            :key="log.id"
            class="flex flex-col pt-5 pb-5 border-solid border-b"
          >
            <div>{{ battleLogToString(log.battleType) }}</div>
            <section class="flex">
              <BattleLogParty :log="log" type="my"></BattleLogParty>

              <div class="mx-5 flex items-center">
                <p class="text-lg font-bold">{{ log.result }}</p>
              </div>

              <BattleLogParty :log="log" type="enemy"></BattleLogParty>
            </section>
            <section>
              {{ log.createdAt }}
            </section>
          </li>
        </template>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import { PokemonData } from '@/interface/pokemon'
import { BattleLogData, BattleType } from '@/interface/battoleLog'
import BattleLogParty from '@/components/battleLogParty.vue'
import 'firebase/firestore'
import { pokemonDataFromNameOrManagemendId } from '@/utils/common'

@Component({
  components: {
    BattleLogParty
  }
})
export default class BattleLog extends Vue {
  logList: BattleLogData[] = []

  async mounted() {
    await this.fetchBattleLog()
  }

  async fetchBattleLog() {
    this.$store.commit('setIsLoading', true)
    const logSnap = await firebase
      .firestore()
      .collection('battleLog')
      .where('userUid', '==', this.$store.state.loginUser.userUid)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get()
    for (const doc of logSnap.docs) {
      const data = doc.data()
      const myParty: PokemonData[] = []
      for (const p of data.myParty) {
        myParty.push(await pokemonDataFromNameOrManagemendId(p))
      }
      const enemyParty: PokemonData[] = []
      for (const p of data.enemyParty) {
        enemyParty.push(await pokemonDataFromNameOrManagemendId(p))
      }
      this.logList.push({
        id: doc.id,
        myParty,
        enemyParty,
        selectFromMyParty: data.selectFromMyParty,
        selectFromEnemyParty: data.selectFromEnemyParty,
        result: data.result,
        battleType: data.battleType ? data.battleType : 'single',
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      })
    }
    this.$store.commit('setIsLoading', false)
  }

  get win() {
    return this.logList.filter((log) => log.result === 'win').length
  }

  get lose() {
    return this.logList.filter((log) => log.result === 'lose').length
  }

  get winRate() {
    const winLog = this.logList.filter((log) => log.result === 'win')
    return Math.floor((winLog.length / this.logList.length) * 100)
  }

  battleLogToString(battleType: BattleType) {
    if (battleType === 'single') return 'シングル'
    return 'ダブル'
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
