import { PartyPokemon } from "../pokemon";

export interface FirestoreParty {
  userUid: string;
  party: PartyPokemon[];
}