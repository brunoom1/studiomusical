import React from 'react';
import { StringCount, StringTuning, NoteName, NoteNotation } from '../types/music';
import { 
  CHROMATIC_NOTES, 
  NOTE_TO_SOLFEGE, 
  TUNING_PRESETS, 
  createStringTuning 
} from '../lib/musicTheory/constants';
import { guitarAudio } from '../lib/audio/guitarSynth';
import { X, Volume2, Sliders, Check, RotateCcw } from 'lucide-react';

interface TuningModalProps {
  isOpen: boolean;
  onClose: () => void;
  stringCount: StringCount;
  setStringCount: (count: StringCount) => void;
  currentTuning: StringTuning[];
  setCurrentTuning: (tuning: StringTuning[]) => void;
  notation: NoteNotation;
}

export const TuningModal: React.FC<TuningModalProps> = ({
  isOpen,
  onClose,
  stringCount,
  setStringCount,
  currentTuning,
  setCurrentTuning,
  notation
}) => {
  if (!isOpen) return null;

  // Presets disponíveis para o número de cordas selecionado
  const availablePresets = TUNING_PRESETS.filter(p => p.stringCount === stringCount);

  // Manipular mudança no número de cordas
  const handleStringCountChange = (count: StringCount) => {
    setStringCount(count);
    const defaultPreset = TUNING_PRESETS.find(p => p.stringCount === count) || TUNING_PRESETS[0];
    setCurrentTuning(defaultPreset.strings);
  };

  // Carregar um preset específico
  const handleSelectPreset = (presetId: string) => {
    const preset = TUNING_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setCurrentTuning(preset.strings);
    }
  };

  // Alterar nota ou oitava de uma corda específica
  const handleUpdateString = (stringIndex: number, newNote: NoteName, newOctave: number) => {
    const updated = [...currentTuning];
    const stringNum = stringIndex + 1;
    updated[stringIndex] = createStringTuning(stringNum, newNote, newOctave);
    setCurrentTuning(updated);
    // Toca a nova nota para dar feedback auditivo imediato
    guitarAudio.playNote(updated[stringIndex].frequency, 1.2);
  };

  // Tocar a nota solta da corda
  const handlePlayString = (freq: number) => {
    guitarAudio.playNote(freq, 1.4);
  };

  // Tocar todas as cordas em dedilhado da afinação
  const handleStrumTuning = () => {
    const freqs = [...currentTuning].reverse().map(s => s.frequency);
    guitarAudio.playChord(freqs, 50);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-amber-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-950/60 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-amber-50">
                Configuração de Cordas & Afinação Personalizada
              </h2>
              <p className="text-xs text-stone-400">
                Altere o número de cordas (4, 6 ou 7) e escolha a nota e oitava de cada corda.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-5 space-y-6 flex-1">
          {/* 1. Quantidade de Cordas */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
              1. Quantidade de Cordas do Instrumento:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleStringCountChange(4)}
                className={`py-3 px-4 rounded-xl border font-bold text-xs transition-all flex flex-col items-center gap-1 ${
                  stringCount === 4
                    ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-950/50 scale-[1.02]'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
                }`}
              >
                <span className="text-base font-serif">4 Cordas</span>
                <span className="text-[10px] opacity-80 font-normal">Cavaquinho, Ukulele, Baixo</span>
              </button>

              <button
                onClick={() => handleStringCountChange(6)}
                className={`py-3 px-4 rounded-xl border font-bold text-xs transition-all flex flex-col items-center gap-1 ${
                  stringCount === 6
                    ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-950/50 scale-[1.02]'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
                }`}
              >
                <span className="text-base font-serif">6 Cordas</span>
                <span className="text-[10px] opacity-80 font-normal">Violão Tradicional, Drop D</span>
              </button>

              <button
                onClick={() => handleStringCountChange(7)}
                className={`py-3 px-4 rounded-xl border font-bold text-xs transition-all flex flex-col items-center gap-1 ${
                  stringCount === 7
                    ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-950/50 scale-[1.02]'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
                }`}
              >
                <span className="text-base font-serif">7 Cordas</span>
                <span className="text-[10px] opacity-80 font-normal">Choro / Dino (7ª em C ou B)</span>
              </button>
            </div>
          </div>

          {/* 2. Presets Populares */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block mb-2">
              2. Presets Populares para {stringCount} Cordas:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availablePresets.map(preset => {
                const isPresetActive = preset.strings.every(
                  (s, idx) => currentTuning[idx] && s.openNote === currentTuning[idx].openNote && s.octave === currentTuning[idx].octave
                );

                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isPresetActive
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 ring-1 ring-amber-500/50'
                        : 'bg-stone-800/60 border-stone-700/80 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs mb-0.5">
                      <span>{preset.name}</span>
                      {isPresetActive && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-stone-400 leading-tight">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Seletor de Nota Corda por Corda */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                3. Afinação Individual (Escolha a nota de cada corda):
              </label>
              <button
                onClick={handleStrumTuning}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" /> Ouvir Afinação Completa
              </button>
            </div>

            <div className="space-y-2 bg-stone-950/70 p-3 rounded-xl border border-stone-800">
              {currentTuning.map((stringInfo, idx) => {
                const isBass = idx >= Math.floor(currentTuning.length / 2);
                return (
                  <div
                    key={`string-tuner-${idx}`}
                    className="flex items-center justify-between gap-3 p-2 rounded-lg bg-stone-900 border border-stone-800"
                  >
                    {/* Número da Corda */}
                    <div className="flex items-center gap-2 min-w-[90px]">
                      <span className={`w-2 h-2 rounded-full ${isBass ? 'bg-amber-500' : 'bg-stone-300'}`}></span>
                      <span className="text-xs font-bold text-stone-200">
                        {idx + 1}ª Corda
                      </span>
                    </div>

                    {/* Dropdown de Nota */}
                    <div className="flex items-center gap-1.5 flex-1 max-w-[140px]">
                      <select
                        value={stringInfo.openNote}
                        onChange={e => handleUpdateString(idx, e.target.value as NoteName, stringInfo.octave)}
                        className="w-full bg-stone-800 border border-stone-700 text-amber-300 text-xs font-serif font-bold rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      >
                        {CHROMATIC_NOTES.map(note => (
                          <option key={note} value={note}>
                            {notation === 'solfege' ? `${note} (${NOTE_TO_SOLFEGE[note]})` : note}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Seletor de Oitava */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-stone-400 font-mono">Oitava:</span>
                      <select
                        value={stringInfo.octave}
                        onChange={e => handleUpdateString(idx, stringInfo.openNote, parseInt(e.target.value))}
                        className="bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono font-bold rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5].map(oct => (
                          <option key={oct} value={oct}>
                            {oct}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Frequência em Hz */}
                    <span className="text-[10px] font-mono text-stone-400 min-w-[65px] text-right hidden sm:block">
                      {Math.round(stringInfo.frequency)} Hz
                    </span>

                    {/* Botão de Tocar a Nota */}
                    <button
                      onClick={() => handlePlayString(stringInfo.frequency)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 transition-colors"
                      title="Ouvir esta corda solta"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between gap-3">
          <button
            onClick={() => handleStringCountChange(stringCount)}
            className="px-3 py-2 rounded-xl text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restaurar Padrão
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-950/50 transition-all"
          >
            Concluir & Aplicar Afinação
          </button>
        </div>
      </div>
    </div>
  );
};
