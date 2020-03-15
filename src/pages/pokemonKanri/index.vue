<template>
  <div>
    <section class="p-10 mt-10">
      <nuxt-link to="/tools/pokemonEdit" class="able-button">
        ポケモン登録
      </nuxt-link>
    </section>
    <section class="p-10">
      <div v-if="list.length === 0">
        まだ管理しているポケモンがいません。登録してみましょう。
      </div>
      <ul class="flex justify-start flex-wrap">
        <li v-for="pokemon of list" :key="pokemon.id">
          <PokemonImage :pokemon-image-url="imageUrl(pokemon)" />
          <!-- :name="changePokemonNameToOtherLang(pokemon.pokemonEditData.name)" -->
          <div class="bg-white rounded shadow text-center font-bold">
            <p>努力値</p>
          </div>
          <table class="table-auto bg-white rounded shadow">
            <thead>
              <tr>
                <th class="px-4 py-2">hp</th>
                <th class="px-4 py-2">atc</th>
                <th class="px-4 py-2">def</th>
                <th class="px-4 py-2">spa</th>
                <th class="px-4 py-2">spd</th>
                <th class="px-4 py-2">spe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 text-center">
                  {{
                    pokemon.pokemonEditData.ivs.hp
                      ? pokemon.pokemonEditData.ivs.hp
                      : 0
                  }}
                </td>
                <td class="border px-4 py-2 text-center">
                  {{
                    pokemon.pokemonEditData.ivs.atc
                      ? pokemon.pokemonEditData.ivs.atc
                      : 0
                  }}
                </td>
                <td class="border px-4 py-2 text-center">
                  {{
                    pokemon.pokemonEditData.ivs.def
                      ? pokemon.pokemonEditData.ivs.def
                      : 0
                  }}
                </td>
                <td class="border px-4 py-2 text-center">
                  {{
                    pokemon.pokemonEditData.ivs.spa
                      ? pokemon.pokemonEditData.ivs.spa
                      : 0
                  }}
                </td>
                <td class="border px-4 py-2 text-center">
                  {{
                    pokemon.pokemonEditData.ivs.spd
                      ? pokemon.pokemonEditData.ivs.spd
                      : 0
                  }}
                </td>
                <td class="border px-4 py-2 text-center">
                  {{
                    pokemon.pokemonEditData.ivs.spe
                      ? pokemon.pokemonEditData.ivs.spe
                      : 0
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table-auto bg-white rounded shadow">
            <thead>
              <tr>
                <th class="px-4 py-2">性格</th>
                <th class="px-4 py-2">アイテム</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 text-center">
                  {{ pokemon.pokemonEditData.natures }}
                </td>
                <td class="border px-4 py-2 text-center">
                  {{ pokemon.pokemonEditData.items }}
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/app'
import PokemonImage from '@/components/pokemon/pokemonImage.vue'
import 'firebase/firestore'
// import { changePokemonNameToOtherLang } from '@/utils/common'

@Component({
  components: {
    PokemonImage
  }
})
export default class ManagePokemonList extends Vue {
  list: any[] = []

  async created() {
    this.$store.commit('setIsLoading', true)
    const mangagePokemonListSnap = await firebase
      .firestore()
      .collection('pokemonManagementData')
      .where('userUid', '==', this.$store.state.loginUser.userUid)
      .get()

    this.list = mangagePokemonListSnap.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })

    this.$store.commit('setIsLoading', false)
  }

  imageUrl(pokemon: any): string {
    console.log(pokemon)
    return ''
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
