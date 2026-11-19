import React from 'react';
import { 
  FretMarker, 
  StringCount, 
  StringTuning,
  ViewOrientation, 
  DisplayMode, 
  NoteNotation, 
  NoteName 
} from '../types/music';
import { NOTE_TO_SOLFEGE, INTERVALS_INFO } from '../lib/musicTheory/constants';
import { FRET_MARKERS_DOTS, FRET_MARKERS_DOUBLE, resolveTuning } from '../lib/musicTheory/fretboard';
import { guitarAudio } from '../lib/audio/guitarSynth';

interface FretboardProps {
  markers: FretMarker[];
  stringCount?: StringCount;
  tuning?: StringTuning[];
  displayMode: DisplayMode;
  notation: NoteNotation;
  maxFrets?: number;
  highlightedRoot?: NoteName;
  onMarkerClick?: (marker: FretMarker) => void;
}

export const Fretboard: React.FC<FretboardProps> = ({
  markers,
  stringCount = 6,
  tuning,
  displayMode,
  notation,
  maxFrets = 15,
  highlightedRoot,
  onMarkerClick
}) => {
  const activeTuning = tuning && tuning.length > 0 ? tuning : resolveTuning(stringCount);
  const numStrings = activeTuning.length;

  // Configuração de geometria
  const fretWidths: number[] = [];
  const baseFretWidth = 65;
  for (let f = 1; f <= maxFrets; f++) {
    // Proporção harmônica realista de afunilamento de trastes
    fretWidths.push(Math.round(baseFretWidth * Math.pow(0.965, f - 1)));
  }

  // Posições X acumuladas para cada traste (0 = pestana)
  const fretPositions: number[] = [0];
  let curX = 0;
  for (const w of fretWidths) {
    curX += w;
    fretPositions.push(curX);
  }

  const stringSpacing = 28;
  const boardHeight = (numStrings - 1) * stringSpacing + 36;
  const boardWidth = fretPositions[maxFrets] + 30;

  // Helper para rótulo
  const getMarkerLabel = (marker: FretMarker) => {
    if (displayMode === 'notes') {
      return notation === 'solfege' ? NOTE_TO_SOLFEGE[marker.note] : marker.note;
    }
    if (displayMode === 'intervals') {
      return INTERVALS_INFO[marker.interval]?.shortName ?? marker.interval;
    }
    if (displayMode === 'fingers') {
      return marker.finger ? String(marker.finger) : (marker.isRoot ? 'T' : '•');
    }
    return marker.note;
  };

  // Helper para cor do marcador: Tônica destacada em Âmbar e todas as demais notas unificadas no verde esmeralda
  const getMarkerColor = (marker: FretMarker) => {
    if (marker.isRoot || marker.note === highlightedRoot) {
      return {
        bg: 'fill-amber-500',
        stroke: 'stroke-amber-300',
        text: 'fill-stone-950 font-black',
        glow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]'
      };
    }
    // Todas as demais notas da escala/acorde unificadas no verde das quintas
    return {
      bg: 'fill-emerald-600',
      stroke: 'stroke-emerald-300',
      text: 'fill-white font-bold',
      glow: 'drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]'
    };
  };

  const handlePlay = (marker: FretMarker) => {
    guitarAudio.playNote(marker.frequency);
    if (onMarkerClick) onMarkerClick(marker);
  };

  return (
    <div className="w-full bg-stone-950/70 p-4 rounded-2xl border border-stone-800 shadow-xl overflow-x-auto">
      {/* Legenda rápida */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs text-stone-400">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300 inline-block shadow-sm"></span>
            <span className="text-stone-200 font-semibold">Tônica (1)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-300 inline-block shadow-sm"></span>
            <span className="text-stone-200 font-semibold">Notas da Escala / Acorde</span>
          </div>
        </div>
        <span className="text-[11px] text-amber-300/90 font-medium">
          💡 Clique em qualquer nota no braço para ouvir o som
        </span>
      </div>

      {/* SVG do Braço */}
      <div className="relative flex justify-center">
        <svg
          viewBox={`0 0 ${boardWidth + 50} ${boardHeight + 40}`}
          className="w-full min-w-[760px] h-auto transition-all duration-300 select-none"
        >
          <defs>
            {/* Gradiente de Jacarandá para a escala de madeira do violão */}
            <linearGradient id="rosewoodWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c1a11" />
              <stop offset="50%" stopColor="#21130b" />
              <stop offset="100%" stopColor="#170c07" />
            </linearGradient>

            {/* Trastes metálicos com reflexo prateado */}
            <linearGradient id="fretWire" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="40%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>

            {/* Pestana (Nut) de osso / marfim */}
            <linearGradient id="boneNut" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Madeira da escala (Fretboard wood) */}
          <rect
            x={40}
            y={20}
            width={boardWidth - 20}
            height={boardHeight}
            fill="url(#rosewoodWood)"
            rx={8}
            className="stroke-amber-950/80 stroke-2"
          />

          {/* Marcas de Casas (Dots / Incrustações peroladas) */}
          {FRET_MARKERS_DOTS.filter(f => f <= maxFrets).map(fret => {
            const centerX = (fretPositions[fret - 1] + fretPositions[fret]) / 2 + 40;
            const centerY = 20 + boardHeight / 2;
            return (
              <circle
                key={`dot-${fret}`}
                cx={centerX}
                cy={centerY}
                r={4.5}
                className="fill-stone-400/30 stroke-stone-300/40"
              />
            );
          })}

          {/* Marcador duplo na casa 12 */}
          {maxFrets >= 12 && FRET_MARKERS_DOUBLE.includes(12) && (
            <g key="double-dot-12">
              <circle
                cx={(fretPositions[11] + fretPositions[12]) / 2 + 40}
                cy={20 + boardHeight / 3}
                r={4}
                className="fill-stone-400/30 stroke-stone-300/40"
              />
              <circle
                cx={(fretPositions[11] + fretPositions[12]) / 2 + 40}
                cy={20 + (boardHeight * 2) / 3}
                r={4}
                className="fill-stone-400/30 stroke-stone-300/40"
              />
            </g>
          )}

          {/* Pestana (Nut / Traste 0) */}
          <rect
            x={36}
            y={18}
            width={7}
            height={boardHeight + 4}
            fill="url(#boneNut)"
            rx={3}
            className="shadow-md"
          />

          {/* Trastes (Frets lines) */}
          {fretPositions.slice(1, maxFrets + 1).map((fretX, index) => (
            <line
              key={`fret-${index + 1}`}
              x1={fretX + 40}
              y1={20}
              x2={fretX + 40}
              y2={20 + boardHeight}
              stroke="url(#fretWire)"
              strokeWidth={index === 0 ? 3 : 2}
            />
          ))}

          {/* Números das Casas */}
          {fretPositions.slice(1, maxFrets + 1).map((fretX, index) => {
            const fretNum = index + 1;
            const prevX = fretPositions[index];
            const centerX = (prevX + fretX) / 2 + 40;
            const isMarked = [3, 5, 7, 9, 12, 15, 17].includes(fretNum);

            return (
              <text
                key={`fret-num-${fretNum}`}
                x={centerX}
                y={boardHeight + 38}
                textAnchor="middle"
                className={`text-[11px] font-mono select-none ${
                  isMarked ? 'fill-amber-400 font-bold' : 'fill-stone-500 font-normal'
                }`}
              >
                {fretNum}
              </text>
            );
          })}

          {/* Cordas do Violão */}
          {Array.from({ length: numStrings }).map((_, stringIndex) => {
            const y = 20 + 18 + stringIndex * stringSpacing;
            // A 1ª corda (E aguda) é mais fina, a 6ª e 7ª cordas são bordões grossos com bronze/aço
            const isBass = stringIndex >= Math.floor(numStrings / 2);
            const strokeWidth = 1 + (stringIndex * 0.45);
            const stringColor = isBass ? '#d97706' : '#f3f4f6'; // Bordão dourado vs nylon transparente

            const stringInfo = activeTuning[stringIndex];
            const openNoteLabel = notation === 'solfege' 
              ? NOTE_TO_SOLFEGE[stringInfo.openNote] 
              : stringInfo.openNote;

            return (
              <g key={`string-${stringIndex}`}>
                {/* Nome da corda solta à esquerda da pestana */}
                <text
                  x={22}
                  y={y + 4}
                  textAnchor="middle"
                  className="fill-stone-400 text-[10px] font-mono font-bold select-none cursor-pointer hover:fill-amber-400"
                  onClick={() => guitarAudio.playNote(stringInfo.frequency)}
                >
                  {openNoteLabel}
                </text>

                {/* Linha da corda */}
                <line
                  x1={36}
                  y1={y}
                  x2={boardWidth + 10}
                  y2={y}
                  stroke={stringColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={0.85}
                />
              </g>
            );
          })}

          {/* Marcadores de Notas / Shapes */}
          {markers.map((marker, idx) => {
            const y = 20 + 18 + marker.stringIndex * stringSpacing;
            // Se fret for 0 (corda solta), coloca antes da pestana
            const x = marker.fret === 0 
              ? 18 
              : (fretPositions[marker.fret - 1] + fretPositions[marker.fret]) / 2 + 40;

            const styling = getMarkerColor(marker);
            const label = getMarkerLabel(marker);

            return (
              <g
                key={`marker-${marker.stringIndex}-${marker.fret}-${idx}`}
                className="cursor-pointer group transition-transform duration-150 hover:scale-125"
                onClick={() => handlePlay(marker)}
              >
                {/* Círculo da Nota */}
                <circle
                  cx={x}
                  cy={y}
                  r={marker.isRoot ? 11 : 9.5}
                  className={`${styling.bg} ${styling.stroke} stroke-2 transition-all ${styling.glow} group-hover:brightness-125`}
                />

                {/* Texto do Intervalo ou Nota */}
                <text
                  x={x}
                  y={y + (marker.isRoot ? 3.5 : 3)}
                  textAnchor="middle"
                  className={`${styling.text} text-[9.5px] select-none pointer-events-none tracking-tight font-sans`}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
