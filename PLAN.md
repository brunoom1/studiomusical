# Planejamento & Arquitetura do Projeto: Cordas.com

Guia Interativo de Shapes, Escalas, Acordes, Arpejos e Repertório para Violão.

---

## 1. Visão Geral
O **Cordas.com** é uma aplicação web completa e interativa concebida para violonistas de todos os níveis, com foco especial no violão brasileiro (Choro, Samba, Bossa Nova) e no estudo aprofundado de harmonia e improvisação.

A aplicação inclui:
- **Catálogo de Escalas**: Maiores, Menores (Natural, Harmônica, Melódica), Pentatônicas, Modos Gregos, Diminutas e Tons Inteiros.
- **Acordes & Variações**: Tríades e tétrades com 7ª dominante, 7M (7+), 5ª diminuta/aumentada, meio-diminutos ($m7b5$), diminutos ($dim7$), 6ª, 9ª e tensões.
- **Arpejos**: Arpejos das tétrades e tríades mapeados nos shapes ao longo de todo o braço do violão.
- **Campo Harmônico Dinâmico**: Seleção por tom (ex: Fá Maior), mostrando todos os 7 graus, acordes, escalas e arpejos correspondentes.
- **Módulo Especial Samba & Choro**: Progressões clássicas (II-V-I, diminutos de passagem, preparações secundárias) e shapes idiomáticos de violão de 6 e 7 cordas.
- **Braço Interativo & Diagramas**: Renderização vetorial SVG de alta definição, suporte a 6 e 7 cordas, alternância entre visualização Horizontal e Vertical, modos de exibição de Notas, Intervalos e Digitação (dedos 1, 2, 3, 4).
- **Áudio Sintetizado**: Reprodução acústica imediata de notas, escalas, arpejos e acordes via Web Audio API.
- **Aba de Planejamento & Roadmap Integrada**: Esta documentação e o roteiro de evolução do projeto ficam acessíveis diretamente dentro da própria página web do projeto.

---

## 2. Estrutura de Filtros do Site

| Tipo de Filtro | Opções Disponíveis | Descrição / Comportamento |
| :--- | :--- | :--- |
| **Tônica / Nota** | C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, B | Define a nota fundamental para escalas, acordes ou o tom geral. |
| **Módulo** | Escalas, Acordes, Arpejos, Campo Harmônico, Samba & Choro, Planejamento | Alterna a experiência principal do usuário. |
| **Tipos de Escala** | Maior, Menor Natural, Menor Harmônica, Menor Melódica, Pentatônica Maior/Menor/Blues, Dórico, Frígio, Lídio, Mixolídio, Lócrio, Diminuta, Tons Inteiros | Gera shapes no braço com indicação de digitação e intervalos. |
| **Tipos de Acorde** | Tríades (M, m, dim, aug, sus), Tétrades (7, 7M/7+, m7, m7b5, dim7, 6, m6, 7(9), 7(b9), 7(#9), 7(13), 7M(9)) | Filtra variações com 7, 7M, quinta diminuta e diminutos completos. |
| **Campo Harmônico** | Maior, Menor Natural, Menor Harmônica, Menor Melódica | Mostra a tabela completa dos 7 graus com clique para explorar cada acorde e arpejo. |
| **Estilos (Samba & Choro)** | Seleção de Tom (ex: Tom de Fá) | Exibe progressões reais (ex: F6 -> F#º -> Gm7 -> C7(13)) com os shapes tradicionais do violão. |
| **Visualização** | Horizontal / Vertical, 6 ou 7 cordas, C-D-E / Dó-Ré-Mi, Notas / Intervalos / Dedos | Total customização para o usuário. |

---

## 3. Arquitetura Técnica

### Frontend & Tecnologias
- **Framework**: React 18 / 19 com TypeScript e Vite.
- **Estilização**: Tailwind CSS com tema musical moderno (paleta inspirada em violão de madeira nobre e interfaces modernas de áudio).
- **Ícones**: Lucide React.
- **Áudio**: Web Audio API nativo com gerador de envoltória harmônica (Physical modeling simplificado de cordas pinçadas com afinação precisa em Hertz).
- **Diagramas**: Componentes SVG dinâmicos e responsivos (braço completo e mini-boxes de acordes).

### Estrutura de Código
```
cordas.com/
├── PLAN.md                               # Documento de planejamento do projeto
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── types/
│   │   └── music.ts                      # Tipos de dados de teoria musical
│   ├── lib/
│   │   ├── musicTheory/
│   │   │   ├── constants.ts              # Notas, intervalos e frequências
│   │   │   ├── fretboard.ts              # Mapeamento do braço (6 e 7 cordas)
│   │   │   ├── scales.ts                 # Escalas maiores, menores, modos e shapes
│   │   │   ├── chords.ts                 # Dicionário e gerador de acordes (CAGED)
│   │   │   ├── arpeggios.ts              # Shapes de arpejos para cada tétrade/tríade
│   │   │   ├── harmonicField.ts          # Campos harmônicos e funções
│   │   │   └── sambaChoroPresets.ts      # Shapes e progressões de Samba e Choro
│   │   └── audio/
│   │       └── guitarSynth.ts            # Síntese sonora de violão via Web Audio API
│   ├── components/
│   │   ├── Header.tsx                    # Topbar com seletor 6/7 cordas, visualização, Dó/C
│   │   ├── FilterBar.tsx                 # Barra dinâmica de filtros
│   │   ├── Fretboard.tsx                 # Braço interativo em SVG
│   │   ├── ChordDiagram.tsx              # Caixa de acorde (Chord Box SVG)
│   │   ├── HarmonicFieldExplorer.tsx     # Painel do Campo Harmônico
│   │   ├── SambaChoroView.tsx            # Visão dedicada para Samba & Choro
│   │   ├── ProjectPlanView.tsx           # Planejamento & Roadmap embutido no site
│   │   └── AudioBar.tsx                  # Controles de reprodução de áudio
│   ├── App.tsx
│   └── main.tsx
```

---

## 4. Roteiro de Implementação
1. **Passo 1**: Setup do projeto Vite + React + Tailwind + Lucide + TypeScript.
2. **Passo 2**: Implementação do Motor de Teoria Musical (`musicTheory/`).
3. **Passo 3**: Implementação do sintetizador de violão em Web Audio API (`guitarSynth.ts`).
4. **Passo 4**: Desenvolvimento do Braço Interativo (SVG Fretboard) e dos mini-diagramas de acordes.
5. **Passo 5**: Construção dos módulos: Escalas, Acordes, Arpejos, Campo Harmônico e Samba & Choro.
6. **Passo 6**: Integração da página/aba de Planejamento do Projeto (`ProjectPlanView.tsx`).
7. **Passo 7**: Testes automatizados de teoria musical e verificação funcional no navegador.
