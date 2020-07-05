<template>
  <div class="container">
    <section class="attacker-defender-setting-section flex justify-center">
      <section
        class="attacker bg-white border border-solid w-full p-4 lg:w-1/3 xl:w-1/3 m-2 shadow rounded"
      >
        <SettingPokemonFrom
          :set-natures="true"
          :set-evs="true"
          :set-ivs="true"
          :name="name"
          :valid-name="validName"
          @input-name="inputNameAttacker"
          @input-natures="inputNaturesAttacker"
          @input-move="inputMoveAttacker"
          @input-item="inputItemAttacker"
        />
        <div class="flex justify-center">
          <button class="able-button" @click="save">save</button>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as calc from '@smogon/calc'
import firebase from 'firebase/app'
import { PokemonData } from '@/interface/pokemon'
import SettingPokemonFrom from '@/components/settingPokemonForm.vue'
import 'firebase/firestore'

interface PokemonEditData {
  name: string
  moves: string[]
  item: string
  natures: string
  evs: Partial<calc.StatsTable<number>>
  ivs: Partial<calc.StatsTable<number>>
}

@Component({
  components: {
    SettingPokemonFrom
  }
})
export default class EditPokemon extends Vue {
  pokemonData: PokemonData[] = require('@/data/pokeData.json').data

  pokemonEditData: PokemonEditData = {
    name: '',
    moves: [],
    item: '',
    natures: '',
    evs: {},
    ivs: {}
  }

  validName: boolean = true
  calcPokemon: calc.Pokemon | undefined
  calcMove: calc.Move | undefined

  inputNameAttacker(name: string) {
    this.pokemonEditData.name = name
  }

  inputMoveAttacker(moves: string[]) {
    this.pokemonEditData.moves = moves
  }

  inputItemAttacker(item: string) {
    this.pokemonEditData.item = item
    // this.createAttacker();
  }

  inputNaturesAttacker(natures: string) {
    this.pokemonEditData.natures = natures
  }

  async save() {
    if (this.pokemonEditData.name === '') {
      // TODO 名前は必須
      this.validName = false
      return
    }
    this.$store.commit('setIsLoading', true)
    // if (!this.nameEn) return;
    const params: any = {
      level: 50,
      evs: {
        atk: 252,
        spa: 252
      }
    }
    // if (this.itemEn !== '') {
    // params.item = this.itemEn;
    // }
    // console.log(params);
    // const attacker = new calc.Pokemon(8, this.nameEn, params);
    // this.calcPokemon = attacker;
    await firebase
      .firestore()
      .collection('pokemonManagementData')
      .add({
        pokemonEditData: this.pokemonEditData,
        userUid: this.$store.state.loginUser.userUid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    this.$store.commit('setIsLoading', false)
    console.log('save done.')
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
