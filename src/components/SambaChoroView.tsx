import React, { useState } from 'react';
import { NoteName, NoteNotation, DisplayMode, StringCount, ViewOrientation, SambaChoroProgression, StringTuning } from '../types/music';
import { SAMBA_CHORO_PRESETS } from '../lib/musicTheory/sambaChoroPresets';
import { ChordDiagram } from './ChordDiagram';
import { adaptShapeToStringCount } from '../lib/musicTheory/chords';
import { Fretboard } from './Fretboard';
import { Sparkles, Play, Pause, Music, HelpCircle, ArrowRight } from 'lucide-react';
import { guitarAudio } from '../lib/audio/guitarSynth';
import { getNoteAtFret } from '../lib/musicTheory/fretboard';

interface SambaChoroViewProps {
  notation: NoteNotation;
  displayMode: DisplayMode;
  stringCount: StringCount;
  tuning?: StringTuning[];
}

export const SambaChoroView: React.FC<SambaChoroViewProps> = ({
  notation,
  displayMode,
  stringCount,
  tuning
}) => {
  const [selectedKey, setSelectedKey] = useState<NoteName>('F');
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlayingProgression, setIsPlayingProgression] = useState<boolean>(false);

  // Filtra presets pelo tom ou exibe todos
  const availablePresets = SAMBA_CHORO_PRESETS.filter(p => p.key === selectedKey);
  const currentPreset = availablePresets[activePresetIndex] || availablePresets[0] || SAMBA_CHORO_PRESETS[0];
  const activeStep = currentPreset.steps[activeStepIndex] || currentPreset.steps[0];

  // Gera markers para o braço com as notas do shape do passo ativo adaptado para o número de cordas
  const currentStepShape = adaptShapeToStringCount(activeStep.shape, stringCount);
  const activeStepMarkers = currentStepShape.frets.map((fret, sIndex) => {
    if (fret === null || fret === undefined || (tuning && sIndex >= tuning.length)) return null;
    const { note, frequency } = getNoteAtFret(sIndex, fret, tuning || stringCount);
    return {
      stringIndex: sIndex,
      fret,
      note,
      interval: (fret === currentStepShape.baseFret ? '1' : '3') as any,
      isRoot: sIndex === (stringCount - 1) || sIndex === (stringCount - 2), // bordões geralmente tônica
      frequency
    };
  }).filter((m): m is NonNullable<typeof m> => m !== null);

  const handlePlayStepChord = (shape: typeof activeStep.shape) => {
    const adapted = adaptShapeToStringCount(shape, stringCount);
    const frequencies: number[] = [];
    const numStrings = adapted.frets.length;
    for (let s = numStrings - 1; s >= 0; s--) {
      const fret = adapted.frets[s];
      if (fret !== null && fret !== undefined) {
        const { frequency } = getNoteAtFret(s, fret, tuning || stringCount);
        frequencies.push(frequency);
      }
    }
    if (frequencies.length > 0) {
      guitarAudio.playChord(frequencies, 32);
    }
  };

  const handlePlayProgression = () => {
    if (isPlayingProgression) {
      guitarAudio.stopAll();
      setIsPlayingProgression(false);
      return;
    }

    setIsPlayingProgression(true);
    const steps = currentPreset.steps;

    steps.forEach((step, idx) => {
      window.setTimeout(() => {
        if (!isPlayingProgression) return;
        setActiveStepIndex(idx);
        handlePlayStepChord(step.shape);

        if (idx === steps.length - 1) {
          window.setTimeout(() => setIsPlayingProgression(false), 1200);
        }
      }, idx * 1100);
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner Especial de Samba & Choro */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950/80 p-6 border border-amber-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-amber-500/20 text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </span>
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                Violão Brasileiro Especializado
              </span>
            </div>
            <h2 className="text-2xl font-serif font-black text-amber-50 tracking-tight">
              Módulo de Samba & Choro
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1">
              Cadências tradicionais, condução de baixarias, inversões de acordes e os shapes mais idiomáticos gravados por mestres como Dino 7 Cordas, Canhoto da Paraíba, Baden Powell e Raphael Rabello.
            </p>
          </div>

          {/* Filtro por Tom do Choro / Samba */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
              Selecione o Tom Principal:
            </span>
            <div className="flex items-center gap-1.5 bg-stone-900/90 p-1 rounded-xl border border-stone-700/60">
              <button
                onClick={() => { setSelectedKey('F'); setActivePresetIndex(0); setActiveStepIndex(0); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedKey === 'F' ? 'bg-amber-600 text-white shadow-md' : 'text-stone-300 hover:text-white'
                }`}
              >
                Tom de Fá (F)
              </button>
              <button
                onClick={() => { setSelectedKey('C'); setActivePresetIndex(0); setActiveStepIndex(0); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedKey === 'C' ? 'bg-amber-600 text-white shadow-md' : 'text-stone-300 hover:text-white'
                }`}
              >
                Tom de Dó (C)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de Presets da Tonalidade */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-200">
              Cadências Disponíveis no Tom de {selectedKey}:
            </h3>
          </div>

          <button
            onClick={handlePlayProgression}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
              isPlayingProgression
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-950/50'
            }`}
          >
            {isPlayingProgression ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlayingProgression ? 'Pausar Cadência' : 'Ouvir Cadência de Samba Completa'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {availablePresets.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => { setActivePresetIndex(idx); setActiveStepIndex(0); }}
              className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                activePresetIndex === idx
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                  : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <div className="font-bold">{preset.title}</div>
              <div className="text-[10px] text-stone-400 mt-0.5">{preset.style}</div>
            </button>
          ))}
        </div>

        {/* Dicas Rítmicas do Choro */}
        <div className="p-3.5 bg-amber-950/20 border border-amber-500/20 rounded-xl mb-6 flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="text-amber-200 font-semibold mb-0.5">Dica de Condução e Levada:</p>
            <p className="text-stone-300 leading-relaxed">{currentPreset.rhythmTip}</p>
          </div>
        </div>

        {/* Sequência Passo a Passo da Cadência */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentPreset.steps.map((step, idx) => {
            const isStepActive = activeStepIndex === idx;
            return (
              <div
                key={`${step.chord}-${idx}`}
                onClick={() => {
                  setActiveStepIndex(idx);
                  handlePlayStepChord(step.shape);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isStepActive
                    ? 'bg-stone-850 border-amber-500 ring-1 ring-amber-500 shadow-lg shadow-amber-950/50'
                    : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                }`}
              >
                {/* Cabeçalho do Passo */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-600/30 text-amber-300 text-[10px] font-bold flex items-center justify-center border border-amber-500/40">
                      {step.measure}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {step.roman}
                    </span>
                  </div>
                  <span className="text-sm font-serif font-black text-amber-100">
                    {step.chord}
                  </span>
                </div>

                {/* Mini Diagrama de Acorde */}
                <div className="my-2">
                  <ChordDiagram
                    shape={adaptShapeToStringCount(step.shape, stringCount)}
                    notation={notation}
                    displayMode={displayMode}
                    isSelected={isStepActive}
                    stringCount={stringCount}
                    tuning={tuning}
                  />
                </div>

                <p className="text-[11px] text-stone-400 mt-2 leading-tight">
                  {step.tip}
                </p>
              </div>
            );
          })}
        </div>

        {/* Visualização da Posição Atual no Braço Inteiro */}
        <div className="mt-8 pt-6 border-t border-stone-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3 flex items-center gap-2">
            <span>Visualização do Shape Atual no Braço:</span>
            <span className="text-amber-400 font-serif font-bold text-sm">
              {activeStep.chord} ({activeStep.shape.name})
            </span>
          </h4>
          <Fretboard
            markers={activeStepMarkers}
            stringCount={stringCount}
            tuning={tuning}
            displayMode={displayMode}
            notation={notation}
            highlightedRoot={activeStep.shape.root}
          />
        </div>
      </div>
    </div>
  );
};
