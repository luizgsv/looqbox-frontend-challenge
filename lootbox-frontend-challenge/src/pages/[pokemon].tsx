import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComparePokemonModal } from '../components/compare-pokemon.component';
import { PokemonDetail } from '../components/pokemon-detail.component';
import { usePokemonStore } from '../models/zustand/pokemon.store';

export function DetailsPage() {
  const params = useParams();
  const name = params.pokemon as string;

  const { pokemonFromCompare } = usePokemonStore();
  const [openModal, setOpenModal] = useState(false);

  return (
    <main className="flex flex-col w-screen h-screen">
      <header className="flex w-full p-4 items-center gap-4 justify-center bg-blue-900 text-white shadow-md h-16 sm:h-20">
        <img
          src="/src/assets/images/pokeball.png"
          alt="Pokémon"
          className="h-8 animate-spin-pause"
        />
        <p className="text-sm opacity-80">Detalhes de Pokémon</p>
      </header>

      <section
        className="
         flex flex-1 h-fit flex-col items-center justify-center gap-6 overflow-auto
         lg:flex-row md:flex-row
        "
      >
        <div className="md:w-80 lg:w-96 flex-shrink-0">
          <PokemonDetail selectedName={name} isMainComponent />
        </div>

        {pokemonFromCompare && (
          <CloseOutlined className="hidden md:block text-3xl self-center text-gray-500" />
        )}

        {pokemonFromCompare && (
          <div className="md:w-80 lg:w-96 flex-shrink-0">
            <PokemonDetail selectedName={pokemonFromCompare} isMainComponent={false} />
          </div>
        )}
        <ComparePokemonModal open={openModal} onClose={() => setOpenModal(false)} />
      </section>
    </main>
  );
}
