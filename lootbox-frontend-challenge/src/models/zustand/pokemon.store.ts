import { create } from 'zustand';
import type { PokemonListItemFormatted } from '../../hooks/queries/list-pokemon.query';

type StateProps = {
  litsPokemon: Array<PokemonListItemFormatted>;
  pokemon: string | null;
  pokemonFromCompare: string | null;
};

type ActionProps = {
  setPokemon: (props: StateProps['pokemon']) => void;
  setPokemonFromCompare: (props: StateProps['pokemon']) => void;
  setLitsPokemon: (props: StateProps['litsPokemon']) => void;
  appendLitsPokemon: (props: StateProps['litsPokemon']) => void;
};

export const usePokemonStore = create<StateProps & ActionProps>((set, get) => ({
  litsPokemon: [],
  pokemon: null,
  pokemonFromCompare: null,

  setPokemon: (props) => set({ pokemon: props }),
  setPokemonFromCompare: (props) => set({ pokemonFromCompare: props }),

  setLitsPokemon: (props) => set({ litsPokemon: props }),

  appendLitsPokemon: (props) => {
    const current = get().litsPokemon;
    const newItems = Array.isArray(props) ? props : [props];
    const merged = [...current, ...newItems.filter((n) => !current.some((c) => c.name === n.name))];
    set({ litsPokemon: merged });
  },
}));
