import { Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InputSearchPokemonComponent } from '../components/input-search-pokemon.component';
import { PokemonCardComponent } from '../components/pokemon-card.component';
import { useListPokemon } from '../hooks/queries/list-pokemon.query';
import { usePokemonByName } from '../hooks/queries/pokemon-by-name.query';
import { usePokemonStore } from '../models/zustand/pokemon.store';

export function HomePage() {
  const [offset, setOffset] = useState(0);
  const { litsPokemon, appendLitsPokemon } = usePokemonStore();

  const [searchParams] = useSearchParams();
  const searchName = searchParams.get('name');

  const { data: responsePokemon, isFetching: isFetchingList } = useListPokemon({
    limit: 50,
    offset,
  });

  useEffect(() => {
    appendLitsPokemon(responsePokemon?.results ?? []);
  }, [responsePokemon, appendLitsPokemon]);

  const { data: apiResult, isFetching: isFetchingAPI } = usePokemonByName({
    searchName: searchName ?? null,
  });

  const filteredLocal = useMemo(() => {
    if (!searchName) return [];
    return litsPokemon.filter((p) => p.name.toLowerCase().includes(searchName.toLowerCase()));
  }, [searchName, litsPokemon]);

  useEffect(() => {
    if (apiResult && !filteredLocal.length) appendLitsPokemon([apiResult]);
  }, [apiResult, appendLitsPokemon, filteredLocal]);

  const data = useMemo(
    () => (searchName ? filteredLocal : litsPokemon),
    [searchName, filteredLocal, litsPokemon],
  );

  const isFetching = useMemo(
    () => isFetchingList || isFetchingAPI,
    [isFetchingList, isFetchingAPI],
  );

  return (
    <main className="flex max-w-screen flex-col items-center h-screen w-full bg-gray-100 gap-4 overflow-hidden">
      <header className="flex w-full p-4  items-center gap-4 justify-center bg-blue-900 text-white  shadow-md">
        <img
          src="/src/assets/images/pokeball.png"
          alt="Pokémon"
          className="h-8 animate-spin-pause"
        />
        <p className="text-sm opacity-80">Explore e busque seus Pokémon favoritos</p>
        <InputSearchPokemonComponent />
      </header>

      <article className="flex flex- flex-wrap gap-8 mx-auto overflow-auto p-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 justify-center">
        {data?.map((props) => (
          <PokemonCardComponent key={props.name} {...props} />
        ))}

        <div className="w-full flex justify-center mt-4">
          <Button
            type="primary"
            loading={isFetching}
            onClick={() => setOffset((prev) => prev + 50)}
            className="w-40"
          >
            {isFetching ? 'Carregando...' : 'Carregar mais'}
          </Button>
        </div>
      </article>
    </main>
  );
}
