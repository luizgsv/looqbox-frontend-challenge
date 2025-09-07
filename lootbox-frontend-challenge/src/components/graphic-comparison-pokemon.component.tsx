import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { typeColors } from '../models/consts/pokemon-type-color';
import type { PokemonDetail } from '../services/details-pokemon.service';

type ChartDataItem = {
  stat: string;
  a: number;
  b: number;
};

type ComparisonChartProps = {
  pokemonA?: PokemonDetail | null;
  pokemonB?: PokemonDetail | null;
  variant?: 'radar' | 'bar';
  height?: number; // px
};

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  pokemonA,
  pokemonB,
  variant = 'radar',
  height = 360,
}) => {
  // não renderiza se faltar qualquer um dos dois
  if (!pokemonA || !pokemonB) return null;

  const nameA = pokemonA.name;
  const nameB = pokemonB.name;

  const colorA = typeColors[pokemonA.types?.[0]?.type.name ?? 'normal'] ?? '#8884d8';
  const colorB = typeColors[pokemonB.types?.[0]?.type.name ?? 'normal'] ?? '#82ca9d';

  const data: ChartDataItem[] = useMemo(() => {
    const statsA = pokemonA.stats.map((s) => s.stat.name);
    const statsB = pokemonB.stats.map((s) => s.stat.name);
    const allStats = Array.from(new Set([...statsA, ...statsB]));

    return allStats.map((statName) => {
      const a = pokemonA.stats.find((s) => s.stat.name === statName)?.base_stat ?? 0;
      const b = pokemonB.stats.find((s) => s.stat.name === statName)?.base_stat ?? 0;
      return { stat: statName, a, b };
    });
  }, [pokemonA, pokemonB]);

  const maxStatValue = useMemo(() => {
    const maxFound = data.reduce((acc, cur) => Math.max(acc, cur.a, cur.b), 0);
    const roundUp = Math.ceil(Math.max(maxFound, 50) / 10) * 10;
    return roundUp;
  }, [data]);

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        {variant === 'radar' ? (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="stat" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, maxStatValue]} />
            <Tooltip />
            <Legend />
            <Radar name={nameA} dataKey="a" stroke={colorA} fill={colorA} fillOpacity={0.6} />
            <Radar name={nameB} dataKey="b" stroke={colorB} fill={colorB} fillOpacity={0.6} />
          </RadarChart>
        ) : (
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="stat" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, maxStatValue]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="a" name={nameA} fill={colorA} />
            <Bar dataKey="b" name={nameB} fill={colorB} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;
