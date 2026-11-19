import React from 'react';
import { ChordShape, NoteNotation, DisplayMode, StringCount, StringTuning } from '../types/music';
import { Volume2, Sparkles } from 'lucide-react';
import { guitarAudio } from '../lib/audio/guitarSynth';
import { getNoteAtFret } from '../lib/musicTheory/fretboard';

interface ChordDiagramProps {
  shape: ChordShape;
  notation: NoteNotation;
  displayMode: DisplayMode;
  isSelected?: boolean;
  onSelect?: () => void;
  stringCount?: StringCount;
  tuning?: StringTuning[];
}

export const ChordDiagram: React.FC<ChordDiagramProps> = ({
  shape,
  isSelected = false,
  onSelect,
  stringCount,
  tuning
}) => {
  const frets = shape.frets;
  const numStrings = (shape.stringCount || stringCount || (frets.length as StringCount) || 6);
  const numFrets = 4; // Mostra 4 casas no diagrama de caixa

  // Determina a casa mínima não nula maior que zero
  const validFrets = frets.filter((f): f is number => f !== null && f !== undefined && f > 0);
  const minFret = validFrets.length > 0 ? Math.min(...validFrets) : 1;
  const startFret = minFret <= 2 ? 1 : minFret;

  // Dimensões dinâmicas baseadas no número de cordas
  const stringSpacing = numStrings === 4 ? 24 : numStrings === 7 ? 17 : 20;
  const startX = numStrings === 4 ? 24 : numStrings === 7 ? 19 : 20;
  const width = startX * 2 + (numStrings - 1) * stringSpacing;
  const height = 160;
  const fretSpacing = 26;
  const startY = 36;

  const handlePlayChord = (e: React.MouseEvent) => {
    e.stopPropagation();
    const frequencies: number[] = [];

    // Toca do bordão (mais grave) para a mais aguda
    for (let s = numStrings - 1; s >= 0; s--) {
      const fret = frets[s];
      if (fret !== null && fret !== undefined) {
        const { frequency } = getNoteAtFret(s, fret, tuning || (numStrings as StringCount));
        frequencies.push(frequency);
      }
    }

    if (frequencies.length > 0) {
      guitarAudio.playChord(frequencies);
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`relative p-3.5 rounded-xl border transition-all cursor-pointer select-none bg-stone-900/90 hover:bg-stone-850 ${
        isSelected
          ? 'border-amber-500 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/50'
          : 'border-stone-800 hover:border-stone-700'
      }`}
    >
      {/* Cabeçalho do Card */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h3 className="font-serif font-bold text-base text-amber-100 tracking-tight">
            {shape.chordSymbol}
          </h3>
          <span className="text-[9px] text-stone-400 font-mono px-1 py-0.2 rounded bg-stone-800 border border-stone-700/60">
            {numStrings}c
          </span>
          {shape.isIdiomaticForSamba && (
            <span
              title="Shape idiomático tradicional de Samba & Choro"
              className="text-[9px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-0.5"
            >
              <Sparkles className="w-2.5 h-2.5" /> Samba
            </span>
          )}
        </div>

        <button
          onClick={handlePlayChord}
          className="p-1 rounded-md text-stone-400 hover:text-amber-400 hover:bg-stone-800 transition-colors"
          title="Tocar este acorde"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-stone-400 truncate mb-2">
        {shape.name}
      </p>

      {/* Diagrama SVG do Box de Acorde */}
      <div className="flex justify-center">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Indicador de Casa Inicial */}
          {startFret > 1 && (
            <text
              x={startX - 6}
              y={startY + 16}
              textAnchor="end"
              className="fill-amber-400 text-[10px] font-mono font-bold"
            >
              {startFret}ª
            </text>
          )}

          {/* Pestana / Top Nut se for casa 1 */}
          {startFret === 1 && (
            <line
              x1={startX}
              y1={startY}
              x2={startX + (numStrings - 1) * stringSpacing}
              y2={startY}
              stroke="#fef3c7"
              strokeWidth={3.5}
            />
          )}

          {/* Linhas de Trastes */}
          {Array.from({ length: numFrets + 1 }).map((_, fIdx) => {
            const y = startY + fIdx * fretSpacing;
            return (
              <line
                key={`fret-line-${fIdx}`}
                x1={startX}
                y1={y}
                x2={startX + (numStrings - 1) * stringSpacing}
                y2={y}
                stroke="#6b7280"
                strokeWidth={1.5}
              />
            );
          })}

          {/* Linhas de Cordas */}
          {Array.from({ length: numStrings }).map((_, col) => {
            const x = startX + col * stringSpacing;
            const isBass = col < Math.floor(numStrings / 2);
            return (
              <line
                key={`string-col-${col}`}
                x1={x}
                y1={startY}
                x2={x}
                y2={startY + numFrets * fretSpacing}
                stroke={isBass ? '#d97706' : '#9ca3af'}
                strokeWidth={col === 0 ? 2.2 : isBass ? 1.6 : 1.2}
              />
            );
          })}

          {/* Marcadores de cordas no topo (X = abafada, O = solta) e Dedos nas casas */}
          {Array.from({ length: numStrings }).map((_, col) => {
            // No diagrama padrão, a corda mais à esquerda é o bordão (índice numStrings - 1)
            // No array frets, índice 0 é a corda 1 (mais aguda)
            const stringIndex = (numStrings - 1) - col;
            const fret = frets[stringIndex];
            const finger = shape.fingers ? shape.fingers[stringIndex] : null;
            const x = startX + col * stringSpacing;

            // Corda abafada (X)
            if (fret === null || fret === undefined) {
              return (
                <text
                  key={`top-x-${col}`}
                  x={x}
                  y={startY - 6}
                  textAnchor="middle"
                  className="fill-rose-400 text-[10px] font-mono font-bold"
                >
                  ✕
                </text>
              );
            }

            // Corda solta (0)
            if (fret === 0) {
              return (
                <circle
                  key={`top-o-${col}`}
                  cx={x}
                  cy={startY - 9}
                  r={3.5}
                  className="stroke-stone-300 fill-transparent stroke-[1.5]"
                />
              );
            }

            // Dedo pressionando na casa
            const fretRelative = fret - startFret;
            if (fretRelative >= 0 && fretRelative < numFrets) {
              const y = startY + fretRelative * fretSpacing + (fretSpacing / 2);
              return (
                <g key={`finger-dot-${col}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r={7}
                    className="fill-amber-500 stroke-amber-200 stroke-[1.5] shadow-sm"
                  />
                  {finger && (
                    <text
                      x={x}
                      y={y + 3}
                      textAnchor="middle"
                      className="fill-stone-950 text-[9px] font-sans font-black select-none pointer-events-none"
                    >
                      {finger}
                    </text>
                  )}
                </g>
              );
            }

            return null;
          })}
        </svg>
      </div>
    </div>
  );
};
