import React, { useState } from 'react';
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
import { Palette } from 'lucide-react';

interface FretboardProps {
  markers: FretMarker[];
  stringCount?: StringCount;
  tuning?: StringTuning[];
  displayMode: DisplayMode;
  notation: NoteNotation;
  maxFrets?: number;
  highlightedRoot?: NoteName;
  showIntervalColors?: boolean;
  mutedStrings?: number[];
  onToggleIntervalColors?: (enabled: boolean) => void;
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
  showIntervalColors,
  mutedStrings = [],
  onToggleIntervalColors,
  onMarkerClick
}) => {
  const [internalColorIntervals, setInternalColorIntervals] = useState<boolean>(false);
  const colorIntervals = showIntervalColors !== undefined ? showIntervalColors : internalColorIntervals;

  const handleToggleColors = () => {
    if (onToggleIntervalColors) {
      onToggleIntervalColors(!colorIntervals);
    } else {
      setInternalColorIntervals(prev => !prev);
    }
  };

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

  // Helper para cor do marcador
  const getMarkerColor = (marker: FretMarker) => {
    // Tônica sempre com destaque em Âmbar Dourado
    if (marker.isRoot || marker.note === highlightedRoot) {
      return {
        bg: 'fill-amber-500',
        stroke: 'stroke-amber-300',
        text: 'fill-stone-950 font-black',
        glow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]'
      };
    }

    // Se a opção "Cores por Intervalo" estiver ativa, diferencia as cores dos graus harmônicos
    if (colorIntervals) {
      const interval = marker.interval;
      // Terças (3M / 3m) - Azul Céu
      if (interval === '3' || interval === 'b3') {
        return {
          bg: 'fill-sky-500',
          stroke: 'stroke-sky-200',
          text: 'fill-stone-950 font-bold',
          glow: 'drop-shadow-[0_0_5px_rgba(56,189,248,0.6)]'
        };
      }
      // Quintas (5J / 5b / #5) - Verde Esmeralda
      if (interval === '5' || interval === 'b5' || interval === '#5') {
        return {
          bg: 'fill-emerald-500',
          stroke: 'stroke-emerald-200',
          text: 'fill-stone-950 font-bold',
          glow: 'drop-shadow-[0_0_5px_rgba(52,211,153,0.6)]'
        };
      }
      // Sétimas (7 / 7M / bb7) - Púrpura / Violeta
      if (interval === '7' || interval === 'b7' || interval === 'bb7') {
        return {
          bg: 'fill-purple-500',
          stroke: 'stroke-purple-200',
          text: 'fill-white font-bold',
          glow: 'drop-shadow-[0_0_5px_rgba(192,132,252,0.6)]'
        };
      }
      // Segundas e Nonas (2, b2, 9, b9, #9) - Laranja Coral
      if (interval === '2' || interval === 'b2' || interval === '9' || interval === 'b9' || interval === '#9') {
        return {
          bg: 'fill-orange-500',
          stroke: 'stroke-orange-200',
          text: 'fill-stone-950 font-bold',
          glow: 'drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]'
        };
      }
      // Quartas e Décimas-primeiras (4, 11, #11) - Azul Turquesa / Teal
      if (interval === '4' || interval === '11' || interval === '#11') {
        return {
          bg: 'fill-teal-500',
          stroke: 'stroke-teal-200',
          text: 'fill-stone-950 font-bold',
          glow: 'drop-shadow-[0_0_5px_rgba(20,184,166,0.6)]'
        };
      }
      // Sextas e Décimas-terceiras (6, b13, 13) - Rosa Carmim
      if (interval === '6' || interval === 'b13' || interval === '13') {
        return {
          bg: 'fill-rose-500',
          stroke: 'stroke-rose-200',
          text: 'fill-white font-bold',
          glow: 'drop-shadow-[0_0_5px_rgba(244,63,94,0.6)]'
        };
      }
      // Demais notas ativas na escala ou acorde (Azul Real)
      return {
        bg: 'fill-blue-500',
        stroke: 'stroke-blue-200',
        text: 'fill-white font-bold',
        glow: 'drop-shadow-[0_0_5px_rgba(59,130,246,0.6)]'
      };
    }

    // Padrão: todas as demais notas unificadas no verde esmeralda das quintas
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
      {/* Barra Superior da Legenda e Controles */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs text-stone-400">
        {/* Legenda Dinâmica */}
        <div className="flex flex-wrap items-center gap-3">
          {colorIntervals ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300 inline-block shadow-sm"></span>
                <span className="text-stone-200 font-semibold">Tônica (1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-orange-500 border border-orange-200 inline-block"></span>
                <span>2ª / 9ª</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500 border border-sky-200 inline-block"></span>
                <span>3ª (3M / 3m)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-500 border border-teal-200 inline-block"></span>
                <span>4ª / 11ª</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-200 inline-block"></span>
                <span>Quintas (5J / 5b)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-200 inline-block"></span>
                <span>6ª / 13ª</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500 border border-purple-200 inline-block"></span>
                <span>Sétimas (7 / 7M)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300 inline-block shadow-sm"></span>
                <span className="text-stone-200 font-semibold">Tônica (1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-300 inline-block shadow-sm"></span>
                <span className="text-stone-200 font-semibold">Notas da Escala / Acorde</span>
              </div>
            </>
          )}
        </div>

        {/* Botão de Alternância de Cores e Dica de Áudio */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleColors}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all select-none ${
              colorIntervals
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-950/40 ring-1 ring-amber-500/30'
                : 'bg-stone-900 text-stone-300 border-stone-700 hover:text-white hover:border-stone-600'
            }`}
            title="Alternar entre paleta unificada verde e cores por intervalo"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>{colorIntervals ? 'Cores por Intervalo: Ativo' : 'Colorir por Intervalo'}</span>
          </button>

          <span className="hidden sm:inline text-[11px] text-stone-500 italic">
            💡 Clique em qualquer nota para ouvir o som
          </span>
        </div>
      </div>

      {/* SVG do Braço */}
      <div className="relative flex justify-center">
        <svg
          viewBox={`0 0 ${boardWidth + 80} ${boardHeight + 46}`}
          className="w-full min-w-[780px] h-auto transition-all duration-300 select-none"
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

          {/* Cabeçalhos das Colunas da Cabeceira */}
          <text
            x={14}
            y={13}
            textAnchor="middle"
            className="fill-stone-500 text-[8px] font-mono uppercase font-bold tracking-wider select-none"
          >
            AFIN.
          </text>
          <text
            x={40}
            y={13}
            textAnchor="middle"
            className="fill-stone-500 text-[8px] font-mono uppercase font-bold tracking-wider select-none"
          >
            SOLTA
          </text>

          {/* Madeira da escala (Fretboard wood) */}
          <rect
            x={64}
            y={20}
            width={boardWidth - 20}
            height={boardHeight}
            fill="url(#rosewoodWood)"
            rx={8}
            className="stroke-amber-950/80 stroke-2"
          />

          {/* Marcas de Casas (Dots / Incrustações peroladas) */}
          {FRET_MARKERS_DOTS.filter(f => f <= maxFrets).map(fret => {
            const centerX = (fretPositions[fret - 1] + fretPositions[fret]) / 2 + 64;
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
                cx={(fretPositions[11] + fretPositions[12]) / 2 + 64}
                cy={20 + boardHeight / 3}
                r={4}
                className="fill-stone-400/30 stroke-stone-300/40"
              />
              <circle
                cx={(fretPositions[11] + fretPositions[12]) / 2 + 64}
                cy={20 + (boardHeight * 2) / 3}
                r={4}
                className="fill-stone-400/30 stroke-stone-300/40"
              />
            </g>
          )}

          {/* Pestana (Nut / Traste 0) */}
          <rect
            x={56}
            y={18}
            width={8}
            height={boardHeight + 4}
            fill="url(#boneNut)"
            rx={3}
            className="shadow-md"
          />

          {/* Trastes (Frets lines) */}
          {fretPositions.slice(1, maxFrets + 1).map((fretX, index) => (
            <line
              key={`fret-${index + 1}`}
              x1={fretX + 64}
              y1={20}
              x2={fretX + 64}
              y2={20 + boardHeight}
              stroke="url(#fretWire)"
              strokeWidth={index === 0 ? 3 : 2}
            />
          ))}

          {/* Números das Casas */}
          {fretPositions.slice(1, maxFrets + 1).map((fretX, index) => {
            const fretNum = index + 1;
            const prevX = fretPositions[index];
            const centerX = (prevX + fretX) / 2 + 64;
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

          {/* Cordas do Violão e Cabeçote de Afinação */}
          {Array.from({ length: numStrings }).map((_, stringIndex) => {
            const y = 20 + 18 + stringIndex * stringSpacing;
            // A 1ª corda (aguda) é fina, os bordões são mais grossos com bronze/aço
            const isBass = stringIndex >= Math.floor(numStrings / 2);
            const strokeWidth = 1 + (stringIndex * 0.45);
            const stringColor = isBass ? '#d97706' : '#f3f4f6';

            const stringInfo = activeTuning[stringIndex];
            const openNoteLabel = notation === 'solfege' 
              ? NOTE_TO_SOLFEGE[stringInfo.openNote] 
              : stringInfo.openNote;

            const isMuted = mutedStrings.includes(stringIndex);
            const hasOpenMarker = markers.some(m => m.stringIndex === stringIndex && m.fret === 0);

            return (
              <g key={`string-${stringIndex}`}>
                {/* Badge da Tarraxa / Afinação da corda à esquerda */}
                <g
                  className="cursor-pointer group"
                  onClick={() => guitarAudio.playNote(stringInfo.frequency)}
                >
                  <rect
                    x={3}
                    y={y - 9}
                    width={22}
                    height={18}
                    rx={5}
                    className="fill-stone-900 stroke-stone-700/80 stroke-1 group-hover:stroke-amber-400 group-hover:fill-stone-800 transition-colors"
                  />
                  <text
                    x={14}
                    y={y + 3.5}
                    textAnchor="middle"
                    className="fill-stone-400 group-hover:fill-amber-300 text-[10px] font-mono font-bold select-none transition-colors"
                  >
                    {openNoteLabel}
                  </text>
                </g>

                {/* Linha da corda do violão (passa pela zona de corda solta e pestana) */}
                <line
                  x1={26}
                  y1={y}
                  x2={boardWidth + 50}
                  y2={y}
                  stroke={stringColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={0.85}
                />

                {/* Símbolo de corda abafada (✕) se o acorde marcar corda mutada */}
                {isMuted && !hasOpenMarker && (
                  <g>
                    <title>Corda abafada / não tocada</title>
                    <text
                      x={40}
                      y={y + 4}
                      textAnchor="middle"
                      className="fill-red-400/90 font-bold text-xs select-none pointer-events-none"
                    >
                      ✕
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Marcadores de Notas / Shapes */}
          {markers.map((marker, idx) => {
            const y = 20 + 18 + marker.stringIndex * stringSpacing;
            // Se fret for 0 (corda solta tocada), coloca na zona de corda solta (x = 40)
            const x = marker.fret === 0 
              ? 40 
              : (fretPositions[marker.fret - 1] + fretPositions[marker.fret]) / 2 + 64;

            const styling = getMarkerColor(marker);
            const label = getMarkerLabel(marker);

            return (
              <g
                key={`marker-${marker.stringIndex}-${marker.fret}-${idx}`}
                style={{ transformOrigin: `${x}px ${y}px` }}
                className="cursor-pointer group transition-transform duration-150 hover:scale-108 active:scale-95"
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
