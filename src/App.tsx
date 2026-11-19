import React, { useState } from 'react';
import { 
  ActiveTab, 
  NoteName, 
  ScaleDefinition, 
  ChordFormula, 
  ViewOrientation, 
  StringCount, 
  DisplayMode, 
  NoteNotation,
  ChordShape,
  StringTuning
} from './types/music';
import { SCALES_DATABASE, getScaleFretboardMarkers, getScaleNotes, CAGED_SHAPES_CONFIG } from './lib/musicTheory/scales';
import { CHORD_FORMULAS, generateShapesForChord, getChordNotes } from './lib/musicTheory/chords';
import { getArpeggioFretboardMarkers } from './lib/musicTheory/arpeggios';
import { NOTE_TO_SOLFEGE, GUITAR_TUNING_6, TUNING_PRESETS } from './lib/musicTheory/constants';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { Fretboard } from './components/Fretboard';
import { ChordDiagram } from './components/ChordDiagram';
import { HarmonicFieldExplorer } from './components/HarmonicFieldExplorer';
import { SambaChoroView } from './components/SambaChoroView';
import { ProjectPlanView } from './components/ProjectPlanView';
import { TuningModal } from './components/TuningModal';
import { guitarAudio } from './lib/audio/guitarSynth';
import { getNoteAtFret } from './lib/musicTheory/fretboard';
import { Play, Info, Layers } from 'lucide-react';

export const App: React.FC = () => {
  // Estados principais
  const [activeTab, setActiveTab] = useState<ActiveTab>('scales');
  const [selectedRoot, setSelectedRoot] = useState<NoteName>('F'); // Default em F (Samba e Choro)
  const [selectedScale, setSelectedScale] = useState<ScaleDefinition>(SCALES_DATABASE[0]);
  const [selectedChordFormula, setSelectedChordFormula] = useState<ChordFormula>(CHORD_FORMULAS[4]); // 7M
  const [selectedCagedShape, setSelectedCagedShape] = useState<string>('all');
  const [selectedChordShapeIndex, setSelectedChordShapeIndex] = useState<number>(0);

  // Configuração de Cordas e Afinação
  const [stringCount, setStringCount] = useState<StringCount>(6);
  const [currentTuning, setCurrentTuning] = useState<StringTuning[]>(GUITAR_TUNING_6);
  const [isTunerOpen, setIsTunerOpen] = useState<boolean>(false);

  // Preferências visuais e de áudio
  const [orientation, setOrientation] = useState<ViewOrientation>('horizontal');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('notes');
  const [notation, setNotation] = useState<NoteNotation>('anglo');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Manipular alteração de contagem de cordas
  const handleStringCountChange = (newCount: StringCount) => {
    setStringCount(newCount);
    const defaultPreset = TUNING_PRESETS.find(p => p.stringCount === newCount) || TUNING_PRESETS[0];
    setCurrentTuning(defaultPreset.strings);
  };

  // Atualiza muting no motor de áudio
  const handleToggleMute = (muted: boolean) => {
    setIsMuted(muted);
    guitarAudio.setMuted(muted);
  };

  // Cálculo dos marcadores de Escala para o braço com a afinação ativa
  const scaleFretRange = selectedCagedShape === 'all' 
    ? undefined 
    : (() => {
        const found = CAGED_SHAPES_CONFIG.find(c => c.id === selectedCagedShape);
        if (!found) return undefined;
        return { min: found.minFretOffset, max: found.maxFretOffset };
      })();

  const scaleMarkers = getScaleFretboardMarkers(
    selectedRoot, 
    selectedScale, 
    currentTuning, 
    16, 
    scaleFretRange
  );

  const scaleNotes = getScaleNotes(selectedRoot, selectedScale);

  // Cálculo dos shapes de Acordes para a tônica e fórmula selecionadas
  const chordShapes = generateShapesForChord(selectedRoot, selectedChordFormula.id);
  const activeChordShape: ChordShape | undefined = chordShapes[selectedChordShapeIndex] || chordShapes[0];

  // Marcadores do acorde ativo no braço
  const chordMarkers = activeChordShape
    ? activeChordShape.frets.map((fret, sIndex) => {
        if (fret === null) return null;
        const { note, frequency } = getNoteAtFret(sIndex, fret, currentTuning);
        return {
          stringIndex: sIndex,
          fret,
          note,
          interval: (fret === activeChordShape.baseFret ? '1' : '3') as any,
          isRoot: note === selectedRoot,
          frequency
        };
      }).filter((m): m is NonNullable<typeof m> => m !== null)
    : [];

  // Cálculo dos marcadores de Arpejos com a afinação ativa
  const arpeggioMarkers = getArpeggioFretboardMarkers(
    selectedRoot, 
    selectedChordFormula.id, 
    currentTuning
  );

  // Reprodução de Áudio
  const handlePlayCurrent = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    if (activeTab === 'scales') {
      const notesToPlay = [...scaleMarkers]
        .filter((m, i, arr) => arr.findIndex(x => x.fret === m.fret && x.stringIndex === m.stringIndex) === i)
        .sort((a, b) => a.frequency - b.frequency)
        .slice(0, 12);

      const freqs = notesToPlay.map(n => n.frequency);
      guitarAudio.playSequence(freqs, 200);

      window.setTimeout(() => {
        setIsPlaying(false);
      }, freqs.length * 200 + 300);
    } else if (activeTab === 'chords' && activeChordShape) {
      const frets = activeChordShape.frets;
      const freqs: number[] = [];
      for (let s = currentTuning.length - 1; s >= 0; s--) {
        const fret = frets[s];
        if (fret !== null) {
          const { frequency } = getNoteAtFret(s, fret, currentTuning);
          freqs.push(frequency);
        }
      }
      guitarAudio.playChord(freqs, 40);
      window.setTimeout(() => setIsPlaying(false), 900);
    } else if (activeTab === 'arpeggios') {
      const notesToPlay = [...arpeggioMarkers]
        .sort((a, b) => a.frequency - b.frequency)
        .slice(0, 8);
      const freqs = notesToPlay.map(n => n.frequency);
      guitarAudio.playSequence(freqs, 180);
      window.setTimeout(() => setIsPlaying(false), freqs.length * 180 + 300);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Barra de Navegação Superior */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orientation={orientation}
        setOrientation={setOrientation}
        stringCount={stringCount}
        setStringCount={handleStringCountChange}
        currentTuning={currentTuning}
        onOpenTuner={() => setIsTunerOpen(true)}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        notation={notation}
        setNotation={setNotation}
        isMuted={isMuted}
        setIsMuted={handleToggleMute}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filtros Inteligentes (exceto na aba de documentação/planejamento) */}
        {activeTab !== 'plan' && activeTab !== 'samba_choro' && (
          <FilterBar
            activeTab={activeTab}
            selectedRoot={selectedRoot}
            setSelectedRoot={setSelectedRoot}
            selectedScale={selectedScale}
            setSelectedScale={setSelectedScale}
            selectedChordFormula={selectedChordFormula}
            setSelectedChordFormula={setSelectedChordFormula}
            selectedCagedShape={selectedCagedShape}
            setSelectedCagedShape={setSelectedCagedShape}
            onPlayCurrent={handlePlayCurrent}
            isPlaying={isPlaying}
          />
        )}

        {/* 1. ABA DE ESCALAS */}
        {activeTab === 'scales' && (
          <div className="space-y-6">
            {/* Info Card da Escala */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-amber-400">
                    Escala Selecionada:
                  </span>
                  <span className="text-xs bg-stone-800 px-2 py-0.5 rounded text-stone-300">
                    {selectedScale.intervals.length} Notas
                  </span>
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                    {stringCount} Cordas ({currentTuning.map(s => s.openNote).join(' ')})
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-black text-amber-100 tracking-tight">
                  {selectedRoot} {selectedScale.ptName}
                </h2>
                <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
                  {selectedScale.description}
                </p>
                <p className="text-xs text-amber-300/80 mt-1.5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  <strong>Dica de Aplicação:</strong> {selectedScale.usageTip}
                </p>
              </div>

              {/* Pílulas com as notas da escala */}
              <div className="flex flex-wrap gap-1.5 items-center">
                {scaleNotes.map((note, idx) => {
                  const isRoot = note === selectedRoot;
                  return (
                    <div
                      key={`${note}-${idx}`}
                      className={`px-3 py-1.5 rounded-xl text-center border font-mono transition-transform hover:scale-105 cursor-pointer ${
                        isRoot
                          ? 'bg-amber-500 border-amber-300 text-stone-950 font-black shadow-md shadow-amber-950/40'
                          : 'bg-stone-800 border-stone-700 text-stone-200 text-xs font-semibold'
                      }`}
                    >
                      <div className="text-sm font-serif">
                        {notation === 'solfege' ? NOTE_TO_SOLFEGE[note] : note}
                      </div>
                      <div className="text-[9px] opacity-75">
                        {selectedScale.intervalNames[idx]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Braço com a Escala */}
            <Fretboard
              markers={scaleMarkers}
              stringCount={stringCount}
              tuning={currentTuning}
              orientation={orientation}
              displayMode={displayMode}
              notation={notation}
              highlightedRoot={selectedRoot}
            />
          </div>
        )}

        {/* 2. ABA DE ACORDES */}
        {activeTab === 'chords' && (
          <div className="space-y-6">
            {/* Cabeçalho do Acorde */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-amber-400">
                    Catálogo de Shapes de Acorde:
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-black text-amber-100 tracking-tight">
                  {selectedRoot}{selectedChordFormula.suffix} - {selectedChordFormula.name}
                </h2>
                <p className="text-xs text-stone-400 mt-1 max-w-2xl">
                  {selectedChordFormula.description}
                </p>
              </div>

              {/* Notas do Acorde */}
              <div className="flex items-center gap-1.5">
                {getChordNotes(selectedRoot, selectedChordFormula).map((note, idx) => (
                  <span
                    key={`${note}-${idx}`}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                      note === selectedRoot
                        ? 'bg-amber-500 border-amber-300 text-stone-950 shadow-sm'
                        : 'bg-stone-800 border-stone-700 text-stone-200'
                    }`}
                  >
                    {notation === 'solfege' ? NOTE_TO_SOLFEGE[note] : note}
                  </span>
                ))}
              </div>
            </div>

            {/* Diagramas de Caixa (Chord Boxes) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Shapes Disponíveis no Braço:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {chordShapes.map((shape, idx) => (
                  <ChordDiagram
                    key={shape.id}
                    shape={shape}
                    notation={notation}
                    displayMode={displayMode}
                    isSelected={selectedChordShapeIndex === idx}
                    onSelect={() => setSelectedChordShapeIndex(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Braço com o Shape Selecionado */}
            {activeChordShape && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3 flex items-center gap-2">
                  <span>Visualização Completa no Braço:</span>
                  <span className="text-amber-400 font-serif font-bold">
                    {activeChordShape.name}
                  </span>
                </h4>
                <Fretboard
                  markers={chordMarkers}
                  stringCount={stringCount}
                  tuning={currentTuning}
                  orientation={orientation}
                  displayMode={displayMode}
                  notation={notation}
                  highlightedRoot={selectedRoot}
                />
              </div>
            )}
          </div>
        )}

        {/* 3. ABA DE ARPEJOS */}
        {activeTab === 'arpeggios' && (
          <div className="space-y-6">
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-amber-400">
                    Arpejo Mapeado:
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-black text-amber-100 tracking-tight">
                  Arpejo de {selectedRoot}{selectedChordFormula.suffix}
                </h2>
                <p className="text-xs text-stone-400 mt-1 max-w-2xl">
                  Notas constitutivas do acorde espalhadas por todas as cordas e regiões do violão para solos fluidos e varreduras.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayCurrent}
                  disabled={isPlaying}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white flex items-center gap-2 shadow-lg shadow-amber-950/50 transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  {isPlaying ? 'Tocando Arpejo...' : 'Ouvir Arpejo Ascendente'}
                </button>
              </div>
            </div>

            {/* Braço com o Arpejo */}
            <Fretboard
              markers={arpeggioMarkers}
              stringCount={stringCount}
              tuning={currentTuning}
              orientation={orientation}
              displayMode={displayMode}
              notation={notation}
              highlightedRoot={selectedRoot}
            />
          </div>
        )}

        {/* 4. ABA DE CAMPO HARMÔNICO */}
        {activeTab === 'harmonic_field' && (
          <HarmonicFieldExplorer
            selectedRoot={selectedRoot}
            setSelectedRoot={setSelectedRoot}
            notation={notation}
            displayMode={displayMode}
            stringCount={stringCount}
            tuning={currentTuning}
            orientation={orientation}
          />
        )}

        {/* 5. ABA DE SAMBA & CHORO */}
        {activeTab === 'samba_choro' && (
          <SambaChoroView
            notation={notation}
            displayMode={displayMode}
            stringCount={stringCount}
            tuning={currentTuning}
            orientation={orientation}
          />
        )}

        {/* 6. ABA DE PLANEJAMENTO & ROADMAP */}
        {activeTab === 'plan' && <ProjectPlanView />}
      </main>

      {/* Modal de Configuração de Afinação */}
      <TuningModal
        isOpen={isTunerOpen}
        onClose={() => setIsTunerOpen(false)}
        stringCount={stringCount}
        setStringCount={handleStringCountChange}
        currentTuning={currentTuning}
        setCurrentTuning={setCurrentTuning}
        notation={notation}
      />

      {/* Rodapé */}
      <footer className="border-t border-stone-800/80 bg-stone-900/60 py-4 text-center text-xs text-stone-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Cordas.com © 2026 - Guia de Violão, Harmonia e Improvisação
          </p>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span>{stringCount} Cordas ({currentTuning.map(s => s.openNote).join(' ')})</span>
            <span>•</span>
            <span>Web Audio API</span>
            <span>•</span>
            <span>Modo Samba & Choro</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
