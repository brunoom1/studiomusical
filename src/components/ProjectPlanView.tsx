import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck,
  MessageSquare,
  User,
  Bot
} from 'lucide-react';

interface ConversationTurn {
  id: number;
  title: string;
  userPrompt: string;
  agentSummary: string;
  badge?: string;
}

const CONVERSATION_HISTORY: ConversationTurn[] = [
  {
    id: 1,
    title: 'Definição de Requisitos Iniciais do Projeto',
    badge: 'Arquitetura',
    userPrompt: `/plan Quero montar uma página web que tenha todos os shapes escalas para violão. Maiores, menores, menores armonicas, etc...

No site deve ter vários filtros para seleção dos shapes, por exemplo, quero poder filtrar por nota c, d, e, etc...

Quero filtrar por campo harmonico. Então viria varios shapes também de outras notas dentro do campo harmonico escolhido. 

Quero pode escolher shapes para escala maior ou menor. 
Shapes com 7, com 7+, escalas com intervalos de quinta, intervalos de diminutos. 

Seria interessante ter categorias para que eu pudesse selecionar por exemplos os shapes mais usadas para samba e choro dentro do tom de F. 

Quero ter nesse site, o shape de vários arpejos para cada acorde.`,
    agentSummary: 'Elaboração do plano técnico inicial cobrindo o catálogo completo de escalas (maiores, menores, menores harmônicas, modos, pentatônicas), tétrades com 7, 7M, m7b5 e dim7, arpejos ao longo do braço, campo harmônico com os 7 graus, módulo idiomático de Samba & Choro e sintetizador acústico via Web Audio API.'
  },
  {
    id: 2,
    title: 'Planejamento Dentro da Página do Projeto',
    badge: 'UX & Docs',
    userPrompt: `/plan Gostaria que o planejamento ficasse dentro da página do projeto.`,
    agentSummary: 'Criação do arquivo PLAN.md na raiz do repositório e adição da aba de navegação "📋 Planejamento & Roadmap" acessível diretamente na interface web da aplicação.'
  },
  {
    id: 3,
    title: 'Arquivo de Inicialização do Agente (Equivalente ao claude.md)',
    badge: 'Diretrizes',
    userPrompt: `/plan Qual o arquivo de inicio que você utiliza para questões importantes do agente? No claude é o claude.md`,
    agentSummary: 'Esclarecido que no ecossistema Antigravity / Gemini CLI o arquivo equivalente é o GEMINI.md (ou AGENTS.md). Criação do GEMINI.md com as diretrizes e regras de desenvolvimento do projeto.'
  },
  {
    id: 4,
    title: 'Aprovação e Início do Desenvolvimento',
    badge: 'Implementação',
    userPrompt: `Pode iniciar com o desenvolvimento do projeto`,
    agentSummary: 'Inicialização do projeto com React 19, TypeScript, Vite, Tailwind CSS e Vitest. Implementação dos motores harmônicos, sintetizador Web Audio API, SVG do braço do violão e caixas de acordes. 9 testes unitários aprovados.'
  },
  {
    id: 5,
    title: 'Execução do Servidor em Background',
    badge: 'Dev Server',
    userPrompt: `inicia o serviço em bg`,
    agentSummary: 'Inicialização do servidor de desenvolvimento Vite em background na porta 5173 com Hot Module Replacement (HMR).'
  },
  {
    id: 6,
    title: 'Configuração de 4, 6 ou 7 Cordas e Afinação Personalizada',
    badge: 'Funcionalidade',
    userPrompt: `eu queo que possa ser configurado a quantidade de cordas, 4 6 ou 7 e aue possa ser alterada a afinaçao do instrumento, escolhendo qua a nota de cada corda`,
    agentSummary: 'Desenvolvimento do seletor para 4, 6 e 7 cordas e do modal de Afinação Personalizada (TuningModal.tsx), permitindo escolher notas e oitavas corda por corda com reprodução sonora imediata e presets (Cavaquinho, Ukulele, Baixo, Drop D, DADGAD, Dino 7 Cordas).'
  },
  {
    id: 7,
    title: 'Consulta de Status do Git',
    badge: 'Git',
    userPrompt: `git status`,
    agentSummary: 'Verificação da árvore de trabalho e commit das atualizações do documento PLAN.md.'
  },
  {
    id: 8,
    title: 'Configuração da Branch e .gitignore Abrangente',
    badge: 'Git',
    userPrompt: `git branch
eu inicie um projeto no git suba os arquivos coloque os .gitignore nas pastas que não devem ser enviadas.`,
    agentSummary: 'Renomeação da branch para main, configuração do .gitignore (ignorando node_modules, dist, .env, caches e logs) e consolidação dos commits.'
  },
  {
    id: 9,
    title: 'Solicitação de Push',
    badge: 'Git',
    userPrompt: `faz push`,
    agentSummary: 'Identificação de que não havia repositório remoto configurado e solicitação da URL do repositório remoto ao usuário.'
  },
  {
    id: 10,
    title: 'Definição da URL do Repositório Remoto',
    badge: 'Git',
    userPrompt: `o repositório é esse https://github.com/brunoom1/studiomusical.git`,
    agentSummary: 'Adição do remote origin apontando para o repositório studiomusical no GitHub.'
  },
  {
    id: 11,
    title: 'Configuração do Repositório via SSH',
    badge: 'SSH & Deploy',
    userPrompt: `configura o repositorio com ssh`,
    agentSummary: 'Configuração do remote para git@github.com:brunoom1/studiomusical.git, autenticação com a chave SSH existente do usuário (id_ed25519) e primeiro push realizado com sucesso para a branch main.'
  },
  {
    id: 12,
    title: 'Confirmação de Push',
    badge: 'Git',
    userPrompt: `faz o push do repositorio`,
    agentSummary: 'Verificação e confirmação de que a branch local main estava 100% atualizada e sincronizada com o GitHub.'
  },
  {
    id: 13,
    title: 'Criação da GitHub Action para GitHub Pages',
    badge: 'CI/CD',
    userPrompt: `cria uma action do github para publicar no github web page.`,
    agentSummary: 'Criação do workflow .github/workflows/deploy.yml utilizando as GitHub Actions oficiais (checkout, setup-node, npm test, build e deploy-pages).'
  },
  {
    id: 14,
    title: 'Instalação do Google Analytics',
    badge: 'Analytics',
    userPrompt: `instala o google analytics`,
    agentSummary: 'Criação do módulo src/lib/analytics.ts com GA4 gtag.js, rastreamento de navegação e eventos musicais, criação do .env.example e integração no GitHub Actions.'
  },
  {
    id: 15,
    title: 'Inserção da Tag Google Tag Manager (GTM-W2H7WJ2G)',
    badge: 'Analytics',
    userPrompt: `<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-W2H7WJ2G"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>`,
    agentSummary: 'Inclusão da tag GTM-W2H7WJ2G no <head> e bloco <noscript> no <body> do index.html, além da integração direta com window.dataLayer e window.gtag.'
  },
  {
    id: 16,
    title: 'Configuração do Base URL /studiomusical/',
    badge: 'Build',
    userPrompt: `precisa configurar no build para o base url /studiomusical/`,
    agentSummary: 'Configuração fixa de base: "/studiomusical/" no vite.config.ts e no script build do package.json, assegurando resolução perfeita de todos os assets no GitHub Pages.'
  },
  {
    id: 17,
    title: 'Renomeação para Studio Musical e Cordas Interativas',
    badge: 'Branding',
    userPrompt: `Vamos trocar o título do projeto de Cordas.com para Studio Musical e ao invés de violão interativo, será cordas interativas.`,
    agentSummary: 'Atualização global do título para Studio Musical e subtítulo para Cordas Interativas no cabeçalho, title HTML, rodapé, GA4, package.json, GEMINI.md e PLAN.md.'
  },
  {
    id: 18,
    title: 'Remoção do Braço Vertical e Inclusão do Histórico Completo',
    badge: 'Histórico & UX',
    userPrompt: `Vamos retirar a opção de braço vertical
na página planejamento, gostaria de deixar um histórico das mensagens que trocamos. Deixe os prompts que eu coloquei completos. E suas respostas, pode resumir`,
    agentSummary: 'Remoção da alternância vertical, consolidando a visualização horizontal ergonômica, e criação desta seção completa de histórico com todos os prompts do usuário na íntegra e resumos das ações do agente.'
  },
  {
    id: 19,
    title: 'Cifras Dinâmicas de Acordo com a Quantidade de Cordas Selecionada',
    badge: 'Teoria & UI',
    userPrompt: `as cifras devem ser mostradas de acordo com a quantidade de cordas que foi selecionada`,
    agentSummary: 'Adaptação do motor harmônico de acordes e do componente de diagrama de caixas (ChordDiagram) para 4, 6 e 7 cordas. Implementados shapes dedicados para Cavaquinho/4 cordas, violão tradicional (6 cordas) e violão de 7 cordas com baixarias de choro. Os diagramas SVG, o braço interativo e a síntese polifônica de áudio agora se adaptam com precisão ao instrumento selecionado.'
  },
  {
    id: 20,
    title: 'Dicionário e Catálogo de Acordes Fixos para 4, 6 e 7 Cordas',
    badge: 'Catálogo & Harmonia',
    userPrompt: `quero ter uma dicionário de acordes fixos para 4 6 e 7 cordas, pesquise na internet, faça um catálogo de acorde para cada um dos filtros que temos para que as cifras estejam mais de acordo com o que já temos estabelecido hoje`,
    agentSummary: 'Criação do módulo src/lib/musicTheory/chordCatalog.ts com um catálogo completo de posições fixas, reais e consagradas para todos os filtros (tônicas, tríades, tétrades 7/7M, 7(13), 7(9), 7(b9), m7, m7b5, dim7, 6). Os acordes cobrem violão tradicional de 6 cordas (com posições abertas e dedilhados clássicos), cavaquinho em 4 cordas (D-G-B-D com formas abertas e pestanas do samba) e violão de 7 cordas (com baixarias na 7ª corda em C2 no estilo de Dino 7 Cordas), incluindo resolução de enarmonia e priorização de exibição sobre os cálculos transponíveis.'
  },
  {
    id: 21,
    title: 'Substituição das Notas Cinzas no Braço por Cores Vibrantes',
    badge: 'Ergonomia & UI',
    userPrompt: `No braço interativo, as notas cinzas parecem que não são para tocar. coloque um cor diferente no lugar`,
    agentSummary: 'Eliminação completa dos tons cinzas que causavam a impressão de notas desativadas. Introdução de uma paleta harmônica viva e iluminada: Laranja Coral para 2ª/9ª, Azul Turquesa para 4ª/11ª, Rosa Carmim para 6ª/13ª e Azul Real para extensões, mantendo o Dourado para Tônica, Azul Céu para Terças, Verde Esmeralda para Quintas e Púrpura para Sétimas, além de atualizar a legenda superior e o cálculo dinâmico de intervalos nos acordes.'
  },
  {
    id: 22,
    title: 'Unificação Visual das Bolinhas no Verde das Quintas',
    badge: 'Design & Visual',
    userPrompt: `vamos colocar todas as bolinhas da mesma cor, pode ser o verdezinho que está sendo usado nas quintas`,
    agentSummary: 'Unificação de todas as notas da escala e dos acordes no verde esmeralda vibrante das quintas (fill-emerald-600 com borda stroke-emerald-300), mantendo o destaque visual obrigatório da tônica em âmbar dourado com halo luminoso, simplificando e limpando a legenda e a leitura visual no braço.'
  },
  {
    id: 23,
    title: 'Efeito Sutil de Escala no Hover e Botão para Colorir Intervalos',
    badge: 'Interatividade & UI',
    userPrompt: `Sobre o efeito ao passar o mouse por sobre a nota no braço, pode só aplicar um pequeno efeito de scala, sem crescer muito
Vamos manter o esquema de cores opicional, pode ter um botão mostrar todos os intervalos, e ai, se ativo, ele apresenta várias cores dependendo do intervalo.`,
    agentSummary: 'Ajuste do hover para uma expansão sutil e suave de 8% (scale-108) com ponto de origem centralizado no círculo da nota (transformOrigin). Adição do botão "Colorir por Intervalo" no topo do braço: quando desativado (padrão), exibe a paleta verde esmeralda unificada com tônica dourada; quando ativado, expande para a paleta multicolorida por intervalo (2ª, 3ª, 4ª, 5ª, 6ª, 7ª) e alterna dinamicamente a legenda.'
  }
];

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
          Planejamento Oficial do Studio Musical
        </h1>
        <p className="text-xs text-stone-300 mt-1 max-w-3xl leading-relaxed">
          Esta documentação técnica reflete a arquitetura harmônica, regras de desenvolvimento, histórico de evolução e decisões de engenharia do projeto.
        </p>
      </div>

      {/* NOVO: Seção de Histórico de Diálogos & Mensagens */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-amber-300">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold uppercase tracking-wider">
              Histórico de Mensagens & Decisões do Projeto
            </h2>
          </div>
          <span className="text-[11px] font-mono text-stone-400 bg-stone-950 px-2.5 py-1 rounded-lg border border-stone-800">
            {CONVERSATION_HISTORY.length} Interações Registradas
          </span>
        </div>
        <p className="text-xs text-stone-400 mb-6">
          Registro completo dos prompts enviados pelo usuário com o resumo das ações executadas pelo agente ao longo do ciclo de desenvolvimento.
        </p>

        <div className="space-y-4">
          {CONVERSATION_HISTORY.map((turn) => (
            <div
              key={`turn-${turn.id}`}
              className="p-4 rounded-xl bg-stone-950/80 border border-stone-800/90 hover:border-amber-500/40 transition-all space-y-3"
            >
              {/* Título do Turno */}
              <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-amber-500/30">
                    #{turn.id}
                  </span>
                  <span className="text-xs font-bold text-stone-200">
                    {turn.title}
                  </span>
                </div>
                {turn.badge && (
                  <span className="text-[10px] font-semibold bg-stone-800 text-amber-300 px-2 py-0.5 rounded border border-stone-700">
                    {turn.badge}
                  </span>
                )}
              </div>

              {/* Prompt Completo do Usuário */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                  <User className="w-3.5 h-3.5" />
                  <span>Prompt do Usuário (Completo):</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed select-text">
                  {turn.userPrompt}
                </div>
              </div>

              {/* Resumo da Resposta do Agente */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ação / Resposta do Agente (Resumo):</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-stone-300 text-xs leading-relaxed">
                  {turn.agentSummary}
                </div>
              </div>
            </div>
          ))}
        </div>
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
              <strong className="text-stone-200 block">Configuração de 4, 6 e 7 Cordas com Afinador Personalizado</strong>
              <span className="text-stone-400">Afinador interativo corda por corda com presets para Cavaquinho, Ukulele, Baixo, Violão Padrão, Drop D e Dino 7 Cordas.</span>
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
{`studiomusical/
├── .github/workflows/deploy.yml # CI/CD Deploy automático no GitHub Pages
├── GEMINI.md                    # Regras & diretrizes do agente
├── PLAN.md                      # Planejamento completo do projeto
├── src/
│   ├── types/music.ts           # Modelagem de dados de teoria musical
│   ├── lib/
│   │   ├── musicTheory/
│   │   │   ├── constants.ts     # 12 semitons, frequências em Hz e afinações
│   │   │   ├── fretboard.ts     # Mapeamento do braço (4, 6 e 7 cordas)
│   │   │   ├── scales.ts        # Algoritmo de escalas e shapes CAGED
│   │   │   ├── chords.ts        # Fórmulas de acordes (7, 7M, dim) e voicings
│   │   │   ├── arpeggios.ts     # Shapes de arpejos ao longo do braço
│   │   │   ├── harmonicField.ts # Campos harmônicos Maior e Menor Harmônica
│   │   │   └── sambaChoroPresets.ts # Shapes e cadências de Samba & Choro
│   │   ├── audio/
│   │   │   └── guitarSynth.ts   # Sintetizador com Web Audio API nativo
│   │   └── analytics.ts         # Integração com GA4 e Google Tag Manager
│   ├── components/
│   │   ├── Header.tsx           # Navegação e seletores de preferências
│   │   ├── FilterBar.tsx        # Filtros de notas, escalas e acordes
│   │   ├── Fretboard.tsx        # Braço interativo vetorial SVG horizontal
│   │   ├── TuningModal.tsx      # Modal de afinação personalizada corda a corda
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
