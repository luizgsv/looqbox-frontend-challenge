import { CloseOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Progress, Spin, Tooltip } from 'antd';
import { useState } from 'react';
import { useDetailsPokemonByName as detailsPokemonByName } from '../hooks/queries/details-pokemon';
import { typeColors } from '../models/consts/pokemon-type-color';
import { usePokemonStore } from '../models/zustand/pokemon.store';
import { ComparePokemonModal } from './compare-pokemon.component';

type Props = {
  selectedName: string | null;
  isMainComponent: boolean;
};

export function PokemonDetail({ selectedName, isMainComponent }: Props) {
  const [compareOpen, setCompareOpen] = useState(false);

  const { setPokemon, setPokemonFromCompare } = usePokemonStore();

  const { data: response, isLoading } = detailsPokemonByName({
    searchName: selectedName,
    isOpen: !!selectedName,
  });

  if (!selectedName) return null;

  const mainType = response?.types[0]?.type.name || 'normal';
  const bgColor = typeColors[mainType] || '#A8A878';

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (!response) return;

  return (
    <div className="flex flex-col items-center w-60 h-fit md:w-80 lg:w-96 min-w-64 max-w-md rounded-lg shadow-lg overflow-hidden">
      <div
        className="flex flex-col gap-4 items-center w-full p-4 relative"
        style={{ backgroundColor: bgColor }}
      >
        <header className="flex w-full justify-between items-center">
          {isMainComponent && (
            <Tooltip title="Desfazer comparação">
              <Button
                shape="circle"
                onClick={() => {
                  setPokemon(null);
                  setPokemonFromCompare(null);
                }}
                icon={<CloseOutlined />}
                className="!border-none !bg-white/20 !text-white hover:!bg-white/30"
              />
            </Tooltip>
          )}
          <h2 className="text-xl sm:text-2xl font-bold capitalize text-white text-center flex-1">
            #{response.id} {response.name}
          </h2>
          {isMainComponent && (
            <Tooltip title="Comparar pokémon">
              <Button
                shape="circle"
                icon={<SwapOutlined />}
                onClick={() => setCompareOpen(true)}
                className="!border-none !bg-white/20 !text-white hover:!bg-white/30"
              />
            </Tooltip>
          )}
        </header>

        <div className="w-32 sm:w-48 h-28 sm:h-40">
          <img
            src={
              response.sprites.other?.['official-artwork']?.front_default ||
              response.sprites.front_default ||
              ''
            }
            alt={response.name}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {response.types.map((t) => (
            <span
              key={t.type.name}
              className="px-2 py-1 text-xs sm:text-sm rounded-full font-medium bg-white/20 text-white"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div
        className="
        flex flex-col w-full bg-white border border-gray-200 p-4 text-gray-800 
        h-[12rem] overflow-auto     
        lg:h-[20rem]               
        md:h-[18rem]                
      "
      >
        {response.stats.map((s) => (
          <div key={s.stat.name} className="flex flex-col mb-3">
            <div className="flex justify-between text-xs sm:text-sm capitalize mb-1">
              <span>{s.stat.name}</span>
              <span>{s.base_stat}</span>
            </div>
            <Progress
              percent={Math.min(s.base_stat, 100)}
              showInfo={false}
              strokeColor={bgColor}
              trailColor="rgba(0,0,0,0.1)"
            />
          </div>
        ))}

        <div className="flex justify-between text-xs sm:text-sm mt-2">
          <strong>Altura: {(response.height / 10).toFixed(1)} m</strong>
          <strong>Peso: {(response.weight / 10).toFixed(1)} kg</strong>
        </div>
      </div>

      <ComparePokemonModal open={compareOpen} onClose={() => setCompareOpen(false)} />
    </div>
  );
}
