import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Code, 
  Cpu, 
  ExternalLink,
  ShieldCheck,
  GitBranch,
  Sparkles
} from 'lucide-react';

export const ProjectPlanView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/40 p-6 rounded-2xl border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <FileText className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400">
            Documentação & Roadmap Integrado
          </span>
        </div>
        <h1 className="text-2xl font-serif font-black text-amber-50 tracking-tight">
          Planejamento Oficial do Cordas.com
        </h1>
        <p className="text-xs text-stone-300 mt-1 max-w-3xl leading-relaxed">
          Esta documentação técnica é gerada e mantida em sincronia com o repositório, refletindo a arquitetura harmônica, regras de desenvolvimento, catálogo de filtros e arquivos do agente.
        </p>
      </div>

      {/* Seção 1: Arquivos de Configuração do Agente */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 text-amber-300">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="text-base font-bold uppercase tracking-wider">
            Arquivos de Inicialização do Agente (Equivalente ao claude.md)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                GEMINI.md
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ativo na Raiz
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              O arquivo oficial de regras e diretrizes do agente para o Antigravity / Gemini CLI. Carregado automaticamente no início de cada turno para orientar a arquitetura, convenções e restrições.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                PLAN.md
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Criado na Raiz
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              O documento de especificação técnica com a matriz de filtros, modelos harmônicos, dicionário de acordes, síntese Web Audio API e planejamento de evolução.
            </p>
          </div>
        </div>
      </div>

      {/* Seção 2: Requisitos Atendidos */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 text-amber-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold uppercase tracking-wider">
            Requisitos e Funcionalidades Implementadas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-950/60 border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block">Filtro por Tônica / Nota</strong>
              <span className="text-stone-400">Seleção completa entre os 12 semitons (C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, B).</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-950/60 border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block">Escalas Maiores, Menores & Menor Harmônica</strong>
              <span className="text-stone-400">Todas as variações diatônicas, modos gregos, pentatônicas e simétricas com posições no braço.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-950/60 border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block">Acordes com 7, 7+ (7M) e Diminutos</strong>
              <span className="text-stone-400">Shapes completos de dominante 7, sétima maior 7M, meio-diminutos m7(b5), diminutos plenos dim7 e tensões.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-950/60 border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block">Campo Harmônico Dinâmico</strong>
              <span className="text-stone-400">Tabela com os 7 graus maiores ou menores, permitindo clicar em cada grau para explorar acordes, arpejos e escalas.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-950/60 border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block">Shapes para Samba e Choro no Tom de Fá</strong>
              <span className="text-stone-400">Módulo dedicado com cadências tradicionais (F6 -&gt; F#º -&gt; Gm7 -&gt; C7(13)) e voicings idiomáticos de violão brasileiro.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-950/60 border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block">Shapes de Arpejos para Cada Acorde</strong>
              <span className="text-stone-400">Mapeamento de arpejos para cada tétrade com digitações ao longo de todo o braço do instrumento.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-950/60 border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block">Alternância 6 e 7 Cordas</strong>
              <span className="text-stone-400">Suporte imediato a violão de 6 cordas tradicional e 7 cordas (com 7ª em Dó no padrão Dino).</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-950/60 border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block">Áudio Nativo sem Dependências Pesadas</strong>
              <span className="text-stone-400">Síntese polifônica via Web Audio API com afinação em Hertz exata e resposta instantânea offline.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção 3: Arquitetura Técnica */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 text-amber-300">
          <Cpu className="w-5 h-5" />
          <h2 className="text-base font-bold uppercase tracking-wider">
            Arquitetura de Código
          </h2>
        </div>

        <pre className="p-4 bg-stone-950 rounded-xl font-mono text-xs text-stone-300 overflow-x-auto border border-stone-800">
{`cordas.com/
├── GEMINI.md                    # Regras & diretrizes do agente
├── PLAN.md                      # Planejamento completo do projeto
├── src/
│   ├── types/music.ts           # Modelagem de dados de teoria musical
│   ├── lib/
│   │   ├── musicTheory/
│   │   │   ├── constants.ts     # 12 semitons, frequências em Hz e afinações
│   │   │   ├── fretboard.ts     # Mapeamento do braço (6 e 7 cordas)
│   │   │   ├── scales.ts        # Algoritmo de escalas e shapes CAGED
│   │   │   ├── chords.ts        # Fórmulas de acordes (7, 7M, dim) e voicings
│   │   │   ├── arpeggios.ts     # Shapes de arpejos ao longo do braço
│   │   │   ├── harmonicField.ts # Campos harmônicos Maior e Menor Harmônica
│   │   │   └── sambaChoroPresets.ts # Shapes e cadências de Samba & Choro
│   │   └── audio/
│   │       └── guitarSynth.ts   # Sintetizador com Web Audio API nativo
│   ├── components/
│   │   ├── Header.tsx           # Navegação e seletores de preferências
│   │   ├── FilterBar.tsx        # Filtros de notas, escalas e acordes
│   │   ├── Fretboard.tsx        # Braço interativo vetorial SVG
│   │   ├── ChordDiagram.tsx     # Diagrama em caixa de acorde com dedos
│   │   ├── HarmonicFieldExplorer.tsx # Grade dos 7 graus
│   │   ├── SambaChoroView.tsx   # Módulo especializado de Samba & Choro
│   │   └── ProjectPlanView.tsx  # Esta página integrada de planejamento
│   ├── App.tsx
│   └── main.tsx`}
        </pre>
      </div>
    </div>
  );
};
