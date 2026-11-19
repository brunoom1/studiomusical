import React from 'react';
import { 
  Music, 
  Layers, 
  GitCommit, 
  Disc, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { ActiveTab, ViewOrientation, StringCount, DisplayMode, NoteNotation, StringTuning } from '../types/music';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stringCount: StringCount;
  setStringCount: (count: StringCount) => void;
  currentTuning: StringTuning[];
  onOpenTuner: () => void;
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
  notation: NoteNotation;
  setNotation: (notation: NoteNotation) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  stringCount,
  setStringCount,
  currentTuning,
  onOpenTuner,
  displayMode,
  setDisplayMode,
  notation,
  setNotation,
  isMuted,
  setIsMuted
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'scales', label: 'Escalas & Shapes', icon: <Music className="w-4 h-4" /> },
    { id: 'chords', label: 'Acordes (7, 7M, dim)', icon: <Layers className="w-4 h-4" /> },
    { id: 'arpeggios', label: 'Arpejos', icon: <GitCommit className="w-4 h-4" /> },
    { id: 'harmonic_field', label: 'Campo Harmônico', icon: <Disc className="w-4 h-4" /> },
    { id: 'samba_choro', label: 'Samba & Choro', icon: <Sparkles className="w-4 h-4" />, badge: 'Especial' },
    { id: 'plan', label: '📋 Planejamento', icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <header className="border-b border-amber-950/60 bg-stone-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra Superior Principal */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center shadow-lg shadow-amber-950/40 border border-amber-500/30">
              <span className="font-serif font-black text-amber-100 text-xl tracking-tighter">S</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-amber-50 font-serif">
                  Studio <span className="text-amber-400">Musical</span>
                </h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Cordas Interativas
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                Shapes de Escalas, Acordes, Arpejos, Campos Harmônicos e Samba & Choro
              </p>
            </div>
          </div>

          {/* Controles de Preferência do Usuário */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {/* 4, 6 ou 7 cordas */}
            <div className="bg-stone-800/80 p-0.5 rounded-lg border border-stone-700/60 flex items-center">
              <button
                onClick={() => setStringCount(4)}
                className={`px-2 py-1 rounded-md transition-all font-medium ${
                  stringCount === 4 ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
                title="Instrumento de 4 cordas (Cavaquinho, Ukulele, Contrabaixo)"
              >
                4 Cordas
              </button>
              <button
                onClick={() => setStringCount(6)}
                className={`px-2 py-1 rounded-md transition-all font-medium ${
                  stringCount === 6 ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
                title="Violão de 6 cordas tradicional"
              >
                6 Cordas
              </button>
              <button
                onClick={() => setStringCount(7)}
                className={`px-2 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                  stringCount === 7 ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
                title="Violão de 7 cordas (afinação Dino 7 cordas em Dó ou Si)"
              >
                7 Cordas
              </button>
            </div>

            {/* Botão para Configurar Afinação Personalizada */}
            <button
              onClick={onOpenTuner}
              className="bg-stone-800/80 hover:bg-stone-750 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 shadow-sm hover:border-amber-500"
              title="Configurar afinação individual de cada corda ou escolher presets"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">Afinação:</span>
              <span className="font-mono text-[10px] text-amber-100 bg-stone-900/80 px-1.5 py-0.2 rounded border border-stone-700">
                {currentTuning.map(s => s.openNote).join(' ')}
              </span>
            </button>

            {/* Notação C D E vs Dó Ré Mi */}
            <div className="bg-stone-800/80 p-0.5 rounded-lg border border-stone-700/60 flex items-center">
              <button
                onClick={() => setNotation('anglo')}
                className={`px-2 py-1 rounded-md transition-all font-medium ${
                  notation === 'anglo' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                C D E
              </button>
              <button
                onClick={() => setNotation('solfege')}
                className={`px-2 py-1 rounded-md transition-all font-medium ${
                  notation === 'solfege' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Dó Ré Mi
              </button>
            </div>

            {/* Exibir: Notas / Intervalos / Dedos */}
            <div className="bg-stone-800/80 p-0.5 rounded-lg border border-stone-700/60 flex items-center">
              <button
                onClick={() => setDisplayMode('notes')}
                className={`px-2 py-1 rounded-md transition-all font-medium ${
                  displayMode === 'notes' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Notas
              </button>
              <button
                onClick={() => setDisplayMode('intervals')}
                className={`px-2 py-1 rounded-md transition-all font-medium ${
                  displayMode === 'intervals' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Intervalos
              </button>
              <button
                onClick={() => setDisplayMode('fingers')}
                className={`px-2 py-1 rounded-md transition-all font-medium ${
                  displayMode === 'fingers' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Dedos
              </button>
            </div>

            {/* Mudo / Áudio */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-1.5 rounded-lg border transition-all ${
                isMuted 
                  ? 'bg-rose-950/60 border-rose-800/60 text-rose-300' 
                  : 'bg-stone-800/80 border-stone-700/60 text-amber-400 hover:text-amber-300'
              }`}
              title={isMuted ? 'Áudio desativado' : 'Áudio ativo (Web Audio API)'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 pt-1 border-t border-stone-800/60 scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-950/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <span className="text-[9px] bg-amber-500 text-stone-950 font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
