import type { Dispatch, SetStateAction } from 'react';
import type { DeviceType } from '../hooks/device.type';
import type { PokemonDetailProps } from '../pokemon-detail.type';

/**
 * @type Contrato entre view e model da página de detalhes
 */
export type DetailsViewProps = {
  device: DeviceType;
  secondaryPokemon: PokemonDetailProps | undefined;
  mainPokemon: PokemonDetailProps | undefined;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  name: string;
  pokemonFromCompare: string | null;
};
