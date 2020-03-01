import { Component, Vue } from 'nuxt-property-decorator';
const pokemonNameMappingOtherLang: any = require('@/data/pokemonNameMap.json');

@Component({})
export default class CommonMixin extends Vue {
  changePokemonNameToOtherLang(name: string): string {
    return pokemonNameMappingOtherLang[name];
  }
}
