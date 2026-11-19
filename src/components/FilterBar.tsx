import React from 'react';
import { NoteName, ScaleDefinition, ChordFormula, ActiveTab } from '../types/music';
import { CHROMATIC_NOTES, NOTE_TO_SOLFEGE } from '../lib/musicTheory/constants';
import { SCALES_DATABASE, CAGED_SHAPES_CONFIG } from '../lib/musicTheory/scales';
import { CHORD_FORMULAS } from '../lib/musicTheory/chords';
import { Filter, Play, Music, Layers, Sparkles } from 'lucide-react';

interface FilterBarProps {
  activeTab: ActiveTab;
  selectedRoot: NoteName;
  setSelectedRoot: (note: NoteName) => void;
  selectedScale: ScaleDefinition;
  setSelectedScale: (scale: ScaleDefinition) => void;
  selectedChordFormula: ChordFormula;
  setSelectedChordFormula: (formula: ChordFormula) => void;
  selectedCagedShape: string;
  setSelectedCagedShape: (shapeId: string) => void;
  onPlayCurrent: () => void;
  isPlaying: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeTab,
  selectedRoot,
  setSelectedRoot,
  selectedScale,
  setSelectedScale,
  selectedChordFormula,
  setSelectedChordFormula,
  selectedCagedShape,
  setSelectedCagedShape,
  onPlayCurrent,
  isPlaying
}) => {
  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl mb-6">
      {/* 1. Seletor de Tônica (Nota Fundamental) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            1. Tônica / Tom Fundamental
          </label>
          <span className="text-[11px] text-stone-400">
            Nota selecionada: <strong className="text-amber-300 font-serif text-sm">{selectedRoot}</strong> ({NOTE_TO_SOLFEGE[selectedRoot]})
          </span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {CHROMATIC_NOTES.map(note => {
            const isSelected = selectedRoot === note;
            return (
              <button
                key={note}
                onClick={() => setSelectedRoot(note)}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-stone-950 shadow-md shadow-amber-950/50 scale-105 border border-amber-300'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700/50'
                }`}
              >
                <span className="text-sm font-serif leading-tight">{note}</span>
                <span className="text-[9px] opacity-75 font-sans leading-tight">
                  {NOTE_TO_SOLFEGE[note]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Seleção Específica dependendo da Aba */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-stone-800/80">
        {/* Seletor de Escalas (ativo em 'scales') */}
        {(activeTab === 'scales' || activeTab === 'harmonic_field') && (
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5 mb-1.5">
              <Music className="w-3.5 h-3.5 text-amber-400" />
              Tipo de Escala (Maiores, Menores, Modos, Diminutas)
            </label>
            <select
              value={selectedScale.id}
              onChange={e => {
                const found = SCALES_DATABASE.find(s => s.id === e.target.value);
                if (found) setSelectedScale(found);
              }}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <optgroup label="Escalas Principais">
                {SCALES_DATABASE.filter(s => ['major', 'minor', 'harmonic_minor', 'melodic_minor'].includes(s.category)).map(s => (
                  <option key={s.id} value={s.id}>
                    {s.ptName} ({s.name})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Pentatônicas & Blues">
                {SCALES_DATABASE.filter(s => s.category === 'pentatonic').map(s => (
                  <option key={s.id} value={s.id}>
                    {s.ptName}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Modos Gregos">
                {SCALES_DATABASE.filter(s => s.category === 'modes').map(s => (
                  <option key={s.id} value={s.id}>
                    {s.ptName}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Simétricas & Jazz (Diminutas e Tons Inteiros)">
                {SCALES_DATABASE.filter(s => ['symmetrical', 'melodic_minor'].includes(s.category) && !['major', 'minor'].includes(s.id)).map(s => (
                  <option key={s.id} value={s.id}>
                    {s.ptName}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        )}

        {/* Seletor de Tipo de Acorde (ativo em 'chords' e 'arpeggios') */}
        {(activeTab === 'chords' || activeTab === 'arpeggios') && (
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5 mb-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Tipo de Acorde (7 dominante, 7M/7+, m7b5, dim7, 6ª, 9ª)
            </label>
            <select
              value={selectedChordFormula.id}
              onChange={e => {
                const found = CHORD_FORMULAS.find(f => f.id === e.target.value);
                if (found) setSelectedChordFormula(found);
              }}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <optgroup label="Tétrades com 7M / 7+ (Sétima Maior)">
                {CHORD_FORMULAS.filter(f => f.category === 'major7').map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({selectedRoot}{f.suffix})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tétrades com 7 Dominante">
                {CHORD_FORMULAS.filter(f => f.category === 'seventh').map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({selectedRoot}{f.suffix})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Meio-Diminuto (5ª Diminuta) & Diminuto Pleno (º)">
                {CHORD_FORMULAS.filter(f => ['half_dim', 'diminished'].includes(f.category)).map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({selectedRoot}{f.suffix})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tétrades Menores (m7)">
                {CHORD_FORMULAS.filter(f => f.category === 'minor7').map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({selectedRoot}{f.suffix})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Acordes Alterados (Samba, Choro, Jazz)">
                {CHORD_FORMULAS.filter(f => f.category === 'altered').map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({selectedRoot}{f.suffix})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tríades">
                {CHORD_FORMULAS.filter(f => f.category === 'triad').map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({selectedRoot}{f.suffix})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        )}

        {/* Filtro de Posição / Shape CAGED */}
        {activeTab === 'scales' && (
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5 mb-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              Posição / Shape no Braço
            </label>
            <select
              value={selectedCagedShape}
              onChange={e => setSelectedCagedShape(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {CAGED_SHAPES_CONFIG.map(shape => (
                <option key={shape.id} value={shape.id}>
                  {shape.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Botão de Tocar Áudio Rápido */}
        <div className="flex items-end">
          <button
            onClick={onPlayCurrent}
            disabled={isPlaying}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
              isPlaying
                ? 'bg-amber-700 text-stone-200 animate-pulse cursor-wait'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-950/50 hover:scale-[1.02]'
            }`}
          >
            <Play className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
            {isPlaying 
              ? 'Tocando no Violão...' 
              : (activeTab === 'scales' ? 'Ouvir Escala Completa' : activeTab === 'arpeggios' ? 'Ouvir Arpejo' : 'Tocar Acorde')}
          </button>
        </div>
      </div>
    </div>
  );
};
