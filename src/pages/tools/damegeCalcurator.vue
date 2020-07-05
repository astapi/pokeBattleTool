<template>
  <div class="container mx-auto relative">
    <section class="attacker-defender-setting-section flex flex-wrap">
      <section
        class="attacker border border-solid w-full p-4 lg:w-1/2 xl:w-1/2 m-2 shadow rounded"
      >
        <p class="text-s">攻撃側ポケモン</p>
        <SettingPokemonFrom
          @set-name="setNameAttacker"
          @set-move="setMoveAttacker"
          @set-item="setItemAttacker"
        />
      </section>

      <section
        class="defender border border-solid w-full p-4 lg:w-1/2 xl:w-1/2 m-2 shadow rounded"
      >
        <p class="text-s">防御側ポケモン</p>
        <SettingPokemonFrom
          :is-defender="true"
          @set-name="setNameDefender"
          @set-move="setMoveDefender"
          @set-item="setItemDefender"
        />
      </section>

      <section class="result fixed bottom-0 h-12 w-full flex justify-center">
        <p v-if="this.result">{{ this.result.moveDesc() }}</p>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import * as calc from '@smogon/calc'
import { PokemonData } from '@/interface/pokemon'
import SettingPokemonFrom from '@/components/settingPokemonForm.vue'

@Component({
  components: {
    SettingPokemonFrom
  }
})
export default class DamageCalcurator extends Vue {
  pokemonData: PokemonData[] = require('@/data/pokeData.json').data
  pokemonEnNameMap: any = require('@/data/pokemonNameEnMap.json')
  pokemonItemNameMap: {
    [index: string]: string
  } = require('@/data/itemNameLanguageMap.json')

  attacker: any = {
    name: 'エースバーン',
    nameEn: 'Cinderace',
    move: '',
    moveEn: '',
    item: '',
    itemEn: '',
    pokemonData: null
  }

  defender: any = {
    name: '',
    nameEn: '',
    move: '',
    moveEn: '',
    item: '',
    itemEn: '',
    pokemonData: null
  }

  attackerCal: calc.Pokemon | undefined
  attackerMove: calc.Move | undefined
  defenderCal: calc.Pokemon | undefined
  result: calc.Result | null = null

  setNameAttacker(data: any) {
    this.attacker.name = data.name
    this.attacker.nameEn = data.nameEn
    this.attacker.pokemonData = data.pokemonData
    this.createAttacker()
  }

  setMoveAttacker(data: any) {
    this.attacker.move = data.move
    this.attacker.moveEn = data.moveEn
    if (!this.attackerCal) return
    this.attackerMove = new calc.Move(8, this.attacker.moveEn, {
      ability: this.attackerCal.ability
    })
    this.createResult()
  }

  setItemAttacker(data: any) {
    this.attacker.item = data.item
    this.attacker.itemEn = data.itemEn
    console.log(data)
    this.createAttacker()
  }

  setNameDefender(data: any) {
    this.defender.name = data.name
    this.defender.nameEn = data.nameEn
    this.defender.pokemonData = data.pokemonData
    this.createDefender()
  }

  setMoveDefender(data: any) {
    this.defender.move = data.move
    this.defender.moveEn = data.moveEn
  }

  setItemDefender(data: any) {
    this.defender.item = data.item
    this.defender.itemEn = data.itemEn
    this.createDefender()
  }

  createAttacker() {
    const params: any = {
      level: 50,
      evs: {
        atk: 252,
        spa: 252
      }
    }
    if (this.attacker.itemEn !== '') {
      console.log('itemset')
      params.item = this.attacker.itemEn
    }
    console.log(params)
    const attacker = new calc.Pokemon(8, this.attacker.nameEn, params)
    this.attackerCal = attacker
    this.createResult()
  }

  createDefender() {
    if (!this.defender.nameEn && !this.defender.itemEn) return
    const defender = new calc.Pokemon(8, this.defender.nameEn, {
      level: 50,
      evs: {
        def: 252,
        spd: 252
      },
      item: this.defender.itemEn
    })
    this.defenderCal = defender
    this.createResult()
  }

  createResult() {
    console.log('createResult1')
    if (!this.attackerCal) return
    if (!this.attackerMove) return
    if (!this.defenderCal) return
    console.log('createResult2')

    console.log(this.attackerCal)
    this.result = calc.calculate(
      8,
      this.attackerCal,
      this.defenderCal,
      this.attackerMove
    )
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
