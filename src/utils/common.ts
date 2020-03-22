import firebase from 'firebase/app'
import * as calc from '@/calc/index'
import { TYPE_CHART, Type } from '@/calc/data/types'
import 'firebase/firestore'
import { PokemonManagementData, PokemonData } from '~/interface/pokemon'

export const pokemonDataFromNameOrManagemendId = async ({
  name,
  managementId
}: {
  name?: string
  managementId?: string
}): Promise<PokemonData> => {
  if (managementId) {
    const doc = await firebase
      .firestore()
      .collection('pokemonManagementData')
      .doc(managementId)
      .get()
    const data = doc.data() as PokemonManagementData
    const calcPokemon = new calc.Pokemon(8, data.name, {
      level: 50,
      item: data.item,
      nature: data.natures,
      ivs: data.ivs,
      evs: data.evs,
      moves: data.moves
    })
    const types = typesFromClacPokemon(calcPokemon)
    return {
      name: changePokemonNameToOtherLang(data.name),
      calcPokemon,
      types,
      typeAisho: weekTypeFromCalcPokemon(types),
      imageUrl: `https://storage.cloud.google.com/pokebattletool.appspot.com/pokemon/icon/${data.name}.png`,
      isManagement: true,
      managementId
    }
  }
  return pokemonDataFromName(name!)
}

export const pokemonDataFromName = (name: string): PokemonData => {
  const calcPokemon = new calc.Pokemon(8, name!, { level: 50 })
  const types = typesFromClacPokemon(calcPokemon)
  return {
    name: changePokemonNameToOtherLang(name!),
    calcPokemon,
    types,
    typeAisho: weekTypeFromCalcPokemon(types),
    imageUrl: `https://storage.googleapis.com/pokebattletool.appspot.com/pokemon/icon/${name}.png`,
    isManagement: false
  }
}

const typesFromClacPokemon = (calcPokemon: calc.Pokemon): Type[] => {
  const types: Type[] = [calcPokemon.type1]
  if (calcPokemon.type2) types.push(calcPokemon.type2)
  return types
}

const typeList: Type[] = [
  'None',
  'Normal',
  'Grass',
  'Fire',
  'Water',
  'Electric',
  'Ice',
  'Flying',
  'Bug',
  'Poison',
  'Ground',
  'Rock',
  'Fighting',
  'Psychic',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy'
]
type Types = { [type in Type]?: number }
const weekTypeFromCalcPokemon = (types: Type[]): any => {
  const typeChart = TYPE_CHART[8]
  const typeAishoTmp: Types = {}
  for (const myType of types) {
    for (const type of typeList) {
      if (typeAishoTmp[type]) {
        typeAishoTmp[type] = typeAishoTmp[type]! * typeChart[type]![myType]!
      } else {
        typeAishoTmp[type] = typeChart[type]![myType]
      }
    }
  }

  const typeAisho: any = {}
  for (const [key, value] of Object.entries(typeAishoTmp)) {
    if (value === 1) continue
    if (value === undefined) continue
    if (typeAisho[value]) {
      typeAisho[value].push(key)
    } else {
      typeAisho[value] = [key]
    }
  }
  return typeAisho
}

const pokemonNameMappingOtherLang: any = require('@/data/pokemonNameMap.json')
export const changePokemonNameToOtherLang = (name: string): string => {
  return pokemonNameMappingOtherLang[name]
}
