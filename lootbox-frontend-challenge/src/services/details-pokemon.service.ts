import { api } from '../lib/axios';

type Props = {
  searchName: string | null;
};
export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  types: { slot: number; type: { name: string; url: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
}

export async function detailsPokemonService({ searchName }: Props) {
  try {
    const { data } = await api.get<PokemonDetail>(`/pokemon/${searchName}`);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
