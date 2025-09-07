import { api } from '../lib/axios';
import type { PokemonListItem } from '../models/types/pokemon.type';

type Props = {
  offset?: number;
  limit?: number;
  filter?: {
    pokemonName: string | null;
  };
};

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export async function listPokemonService({ limit = 20, offset = 20 }: Props) {
  try {
    const query = `?offset=${offset}&limit=${limit}`;
    const { data } = await api.get<PokemonListResponse>(`/pokemon${query}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
