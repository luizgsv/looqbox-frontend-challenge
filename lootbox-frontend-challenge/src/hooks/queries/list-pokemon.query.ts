import { useQuery } from '@tanstack/react-query';
import { listPokemonService } from '../../services/list-pokemon.service';
import { setImagePokemon } from '../image-pokemon';

type Props = {
  offset?: number;
  limit?: number;
  filter?: {
    searchList: string | null;
  };
};

export interface PokemonListItemFormatted {
  name: string;
  url: string;
  image: string;
}

export interface PokemonListResponseFormatted {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemFormatted[];
}

export const useListPokemon = ({ limit, offset, filter }: Props) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-pokemon', offset, limit, filter],
    queryFn: async () => {
      const response = await listPokemonService({ limit, offset });

      const formatted: PokemonListResponseFormatted = {
        ...response,
        results: response.results
          .map(({ url, name }) => ({
            name,
            url,
            image: setImagePokemon(url),
          }))
          .filter(
            (props) =>
              !filter?.searchList ||
              props.name.toLowerCase().includes(filter.searchList.toLowerCase()),
          ),
      };

      return formatted;
    },
  });

  return {
    data,
    isFetching,
    isLoading,
  };
};
