# Diretrizes do Agente - Studio Musical (Cordas Interativas)

Este arquivo define as diretrizes, arquitetura e convenções do projeto **Studio Musical** para o agente e para a equipe de desenvolvimento.

---

## 1. Visão do Projeto
O **Studio Musical** é uma aplicação web de cordas interativas para músicos e violonistas, focada em:
- Exploração visual e sonora de **shapes de escalas** (maiores, menores, menores harmônicas, modos, pentatônicas, etc.).
- Catálogo de **acordes e variações** (tríades e tétrades com 7, 7M/7+, b5, m7b5, dim7, 9, 13).
- **Arpejos** mapeados em shapes ao longo de todo o braço do violão.
- **Campo Harmônico Dinâmico** (maior, menor natural, menor harmônica, menor melódica) por tom.
- **Módulo Especial de Samba & Choro** com cadências tradicionais e shapes idiomáticos de violão (6 e 7 cordas).
- Braço interativo do violão em SVG com alternância Horizontal/Vertical, 6 e 7 cordas, notas/intervalos/dedos e áudio integrado (Web Audio API).
- Aba interna de planejamento e roadmap navegável no próprio app.

---

## 2. Stack Tecnológica & Padrões
- **Linguagem**: TypeScript (tipagem estrita para notas, intervalos, acordes e escalas).
- **Framework**: React 18 / 19 com Vite.
- **Estilização**: Tailwind CSS com tema inspirado em madeiras de luthieria e interfaces de áudio (tons de jacarandá, mogno, maple e destaques em âmbar/dourado).
- **Ícones**: `lucide-react`.
- **Áudio**: Web Audio API nativo (síntese polifônica de cordas pinçadas com afinação em Hz sem dependências pesadas externas).
- **Testes**: `vitest` para o motor de teoria musical (`src/lib/musicTheory/`).

---

## 3. Estrutura de Pastas
```
cordas.com/
├── GEMINI.md                    # Diretrizes do agente (este arquivo)
├── PLAN.md                      # Planejamento completo do projeto
├── src/
│   ├── types/music.ts           # Interfaces e tipos de dados teóricos
│   ├── lib/
│   │   ├── musicTheory/         # Motor de cálculo musical (notas, escalas, acordes, campos, arpejos)
│   │   └── audio/               # Sintetizador de violão em Web Audio API
│   ├── components/              # Componentes de interface (Fretboard, ChordDiagram, Filters, etc.)
│   ├── App.tsx
│   └── main.tsx
```

---

## 4. Regras de Desenvolvimento
- Nunca codifique posições de acordes ou notas de forma estática redundante; utilize o motor harmônico algorítmico em `src/lib/musicTheory/` sempre que possível.
- Mantenha a renderização do braço do violão em SVG leve, modular e responsivo.
- O violão suporta modo 6 cordas (E A D G B E) e 7 cordas (com 7ª em C ou B).
- A tônica sempre deve ter destaque visual claro (cor diferenciada).
