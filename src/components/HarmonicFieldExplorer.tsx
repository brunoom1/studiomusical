import React, { useState } from 'react';
import { NoteName, HarmonicDegree, NoteNotation, DisplayMode, StringCount, ViewOrientation, StringTuning } from '../types/music';
import { getHarmonicField, HarmonicFieldType } from '../lib/musicTheory/harmonicField';
import { generateShapesForChord } from '../lib/musicTheory/chords';
import { ChordDiagram } from './ChordDiagram';
import { Fretboard } from './Fretboard';
import { getArpeggioFretboardMarkers } from '../lib/musicTheory/arpeggios';
import { SCALES_DATABASE, getScaleFretboardMarkers } from '../lib/musicTheory/scales';
import { Volume2, Play, Music, Sparkles } from 'lucide-react';
import { guitarAudio } from '../lib/audio/guitarSynth';
import { getNoteAtFret } from '../lib/musicTheory/fretboard';

interface HarmonicFieldExplorerProps {
  selectedRoot: NoteName;
  setSelectedRoot: (note: NoteName) => void;
  notation: NoteNotation;
  displayMode: DisplayMode;
  stringCount: StringCount;
  tuning?: StringTuning[];
}

export const HarmonicFieldExplorer: React.FC<HarmonicFieldExplorerProps> = ({
  selectedRoot,
  setSelectedRoot,
  notation,
  displayMode,
  stringCount,
  tuning
}) => {
  const [fieldType, setFieldType] = useState<HarmonicFieldType>('major');
  const [selectedDegreeIndex, setSelectedDegreeIndex] = useState<number>(0);
  const [subTab, setSubTab] = useState<'chord' | 'scale' | 'arpeggio'>('chord');

  const harmonicField = getHarmonicField(selectedRoot, fieldType);
  const activeDegree = harmonicField.degrees[selectedDegreeIndex] || harmonicField.degrees[0];

  // Shapes de acordes para o grau selecionado de acordo com a contagem de cordas
  const degreeShapes = generateShapesForChord(activeDegree.chordRoot, activeDegree.formulaId, stringCount);

  // Escala correspondente ao grau
  const degreeScale = SCALES_DATABASE.find(s => s.id === activeDegree.scaleId) || SCALES_DATABASE[0];
  const scaleMarkers = getScaleFretboardMarkers(activeDegree.chordRoot, degreeScale, tuning || stringCount);

  // Arpejo correspondente ao grau
  const arpeggioMarkers = getArpeggioFretboardMarkers(activeDegree.chordRoot, activeDegree.formulaId, tuning || stringCount);

  // Markers para o braço baseado na sub-aba
  const currentMarkers = subTab === 'scale' 
    ? scaleMarkers 
    : subTab === 'arpeggio' 
    ? arpeggioMarkers 
    : getArpeggioFretboardMarkers(activeDegree.chordRoot, activeDegree.formulaId, tuning || stringCount, { min: 0, max: 15 });

  const handlePlayDegreeChord = (degree: HarmonicDegree) => {
    const shapes = generateShapesForChord(degree.chordRoot, degree.formulaId, stringCount);
    if (shapes.length > 0) {
      const shape = shapes[0];
      const frets = shape.frets;
      const freqs: number[] = [];
      const numStrings = frets.length;
      for (let s = numStrings - 1; s >= 0; s--) {
        const fret = frets[s];
        if (fret !== null && fret !== undefined) {
          const { frequency } = getNoteAtFret(s, fret, tuning || stringCount);
          freqs.push(frequency);
        }
      }
      if (freqs.length > 0) guitarAudio.playChord(freqs);
    }
  };

  const handlePlayScale = () => {
    const sorted = [...scaleMarkers]
      .filter((m, i, arr) => arr.findIndex(x => x.fret === m.fret && x.stringIndex === m.stringIndex) === i)
      .sort((a, b) => a.frequency - b.frequency)
      .slice(0, 15);
    guitarAudio.playSequence(sorted.map(s => s.frequency), 220);
  };

  const handlePlayArpeggio = () => {
    const sorted = [...arpeggioMarkers]
      .sort((a, b) => a.frequency - b.frequency)
      .slice(0, 10);
    guitarAudio.playSequence(sorted.map(s => s.frequency), 220);
  };

  return (
    <div className="space-y-6">
      {/* Seletor de Tipo de Campo Harmônico */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
        <div>
          <h2 className="text-lg font-bold text-amber-100 font-serif flex items-center gap-2">
            Campo Harmônico de <span className="text-amber-400">{selectedRoot}</span>
          </h2>
          <p className="text-xs text-stone-400">
            Selecione a tonalidade e explore os 7 graus, acordes, escalas e arpejos integrados.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => setFieldType('major')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              fieldType === 'major' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            Maior
          </button>
          <button
            onClick={() => setFieldType('minor_natural')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              fieldType === 'minor_natural' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            Menor Natural
          </button>
          <button
            onClick={() => setFieldType('minor_harmonic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              fieldType === 'minor_harmonic' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            Menor Harmônica
          </button>
        </div>
      </div>

      {/* Grade dos 7 Graus */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {harmonicField.degrees.map((degree, index) => {
          const isSelected = selectedDegreeIndex === index;
          return (
            <div
              key={degree.roman}
              onClick={() => setSelectedDegreeIndex(index)}
              className={`p-3 rounded-xl border transition-all cursor-pointer text-center relative ${
                isSelected
                  ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-950/50 ring-1 ring-amber-500'
                  : 'bg-stone-900/70 border-stone-800 hover:border-stone-700 hover:bg-stone-850'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
                {degree.roman}
              </div>
              <div className="text-base font-serif font-bold text-stone-100 mb-1">
                {degree.chordSymbol}
              </div>
              <div className="text-[10px] text-stone-400 truncate mb-1">
                {degree.functionName.split(' ')[0]}
              </div>
              <div className="text-[9px] text-amber-300/80 font-medium truncate">
                {degree.scaleName.split(' ')[0]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detalhes do Grau Selecionado */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Grau {activeDegree.roman}
              </span>
              <h3 className="text-xl font-bold font-serif text-white">
                {activeDegree.chordSymbol} - {activeDegree.chordName}
              </h3>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Função Harmônica: <strong className="text-stone-200">{activeDegree.functionName}</strong> | Escala Associada: <strong className="text-amber-300">{activeDegree.scaleName}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSubTab('chord')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'chord' ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              Shapes do Acorde
            </button>
            <button
              onClick={() => setSubTab('scale')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'scale' ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              Escala do Grau
            </button>
            <button
              onClick={() => setSubTab('arpeggio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'arpeggio' ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              Arpejo do Grau
            </button>
          </div>
        </div>

        {/* Visualização no Braço */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-300">
              Visualização no Braço: {subTab === 'scale' ? `Escala ${activeDegree.scaleName}` : subTab === 'arpeggio' ? `Arpejo de ${activeDegree.chordSymbol}` : `Notas de ${activeDegree.chordSymbol}`}
            </span>
            <button
              onClick={subTab === 'scale' ? handlePlayScale : handlePlayArpeggio}
              className="text-xs bg-stone-800 hover:bg-stone-700 text-amber-400 font-semibold px-2.5 py-1 rounded-lg border border-stone-700 flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" /> Ouvir Sequência
            </button>
          </div>

          <Fretboard
            markers={currentMarkers}
            stringCount={stringCount}
            tuning={tuning}
            displayMode={displayMode}
            notation={notation}
            highlightedRoot={activeDegree.chordRoot}
          />
        </div>

        {/* Mini Diagramas de Acordes do Grau */}
        {subTab === 'chord' && (
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              Shapes Tradicionais de Violão para {activeDegree.chordSymbol}:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {degreeShapes.map(shape => (
                <ChordDiagram
                  key={shape.id}
                  shape={shape}
                  notation={notation}
                  displayMode={displayMode}
                  stringCount={stringCount}
                  tuning={tuning}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
