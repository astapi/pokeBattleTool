import { PartyPokemon } from '@/interface/pokemon'

export interface FirestoreParty {
  userUid: string
  party: PartyPokemon[]
}
