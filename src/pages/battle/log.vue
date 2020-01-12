<template>
  <div class="container relative p-5">
    <SideMenu></SideMenu>

    <section>
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
        <template v-for="log of logList" >
          <li :key="log.id" class="flex pt-5 pb-5 border-solid border-b">
            <BattleLogParty :log="log" type="my"></BattleLogParty>

            <div class="mx-5 flex items-center">
              <p class="text-lg font-bold">{{ log.result }}</p>
            </div>

            <BattleLogParty :log="log" type="enemy"></BattleLogParty>
          </li>
        </template>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PokemonData } from '@/interface/pokemon'
import { BattleLogData } from '@/interface/battoleLog'
import SideMenu from '@/components/layouts/SideMenu.vue'
import BattleLogParty from '@/components/battleLogParty.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
const pokeData = require('@/data/pokeData.json')

@Component({
  components: {
    SideMenu,
    BattleLogParty
  }
})
export default class BattleLog extends Vue {
  logList: any[] = []

  async mounted() {
    await this.fetchBattleLog();
  }

  async fetchBattleLog() {
    this.$store.commit('setIsLoading', true)
    const logSnap = await firebase.firestore()
      .collection('battleLog')
      .where('userUid', '==', this.$store.state.loginUser.userUid)
      .orderBy('createdAt', 'desc')
      .limit(4)
      .get();
    for (const doc of logSnap.docs) {
      const data = doc.data();
      this.logList.push({
        id: doc.id,
        ...data,
        myParty: data.myParty.map((zenkokuNo: string) => {
          return pokeData.data.find((p: PokemonData) => p.zenkokuNo === zenkokuNo)
        }),
        enemyParty: data.enemyParty.map((zenkokuNo: string) => {
          return pokeData.data.find((p: PokemonData) => p.zenkokuNo === zenkokuNo)
        }),
      });
    }
    this.$store.commit('setIsLoading', false)
  }

  get win() {
    return this.logList.filter((log) => log.result === 'win').length;
  }
  get lose() {
    return this.logList.filter((log) => log.result === 'lose').length;
  }

  get winRate() {
    const winLog = this.logList.filter((log) => log.result === 'win');
    return Math.floor(winLog.length / this.logList.length * 100);
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
