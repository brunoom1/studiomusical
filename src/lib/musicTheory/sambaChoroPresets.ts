import { SambaChoroProgression, NoteName } from '../../types/music';

export const SAMBA_CHORO_PRESETS: SambaChoroProgression[] = [
  {
    id: 'samba_f_tradicional',
    title: 'Cadência Quadrada de Samba & Choro (Tom de Fá)',
    key: 'F',
    style: 'Samba',
    rhythmTip: 'Levada de telecoteco no polegar e dedos indicadores/médio/anelar, acentuando o tempo 2 do compasso de 2/4.',
    description: 'A progressão mais famosa do Samba e Choro tradicional. O diminuto de passagem F#º conduz o baixo cromaticamente da tônica F para o IIm (Gm7).',
    steps: [
      {
        chord: 'F6',
        roman: 'I6',
        measure: 1,
        tip: 'Shape clássico com o polegar na 6ª corda e sem a 5ª. Tônica no baixo.',
        shape: {
          id: 'f6_samba',
          name: 'F6 (Tradicional)',
          chordSymbol: 'F6',
          root: 'F',
          baseFret: 1,
          frets: [null, 1, 2, 0, null, 1], // 1-X-0-2-1-X
          fingers: [null, 1, 3, 0, null, 1],
          isIdiomaticForSamba: true,
          description: 'Acorde de repouso com som vintage de Noel Rosa e Cartola.'
        }
      },
      {
        chord: 'F#º (dim7)',
        roman: '#Iº',
        measure: 2,
        tip: 'Diminuto de passagem cromática. Conduz o baixo da casa 1 para a casa 3.',
        shape: {
          id: 'fsharp_dim_samba',
          name: 'F#º (Diminuto de Passagem)',
          chordSymbol: 'F#º',
          root: 'F#',
          baseFret: 1,
          frets: [null, 1, 2, 1, null, 2], // 2-X-1-2-1-X
          fingers: [null, 1, 3, 2, null, 4],
          isIdiomaticForSamba: true,
          description: 'Conexão cromática fundamental do violão brasileiro.'
        }
      },
      {
        chord: 'Gm7',
        roman: 'IIm7',
        measure: 3,
        tip: 'Pestana suave nas cordas centrais ou acorde pinçado com polegar na 6ª corda.',
        shape: {
          id: 'gm7_samba',
          name: 'Gm7 (Forma de Choro)',
          chordSymbol: 'Gm7',
          root: 'G',
          baseFret: 3,
          frets: [null, 3, 3, 3, null, 3], // 3-X-3-3-3-X
          fingers: [null, 1, 1, 1, null, 1],
          isIdiomaticForSamba: true,
          description: 'Subdominante limpa e aveludada.'
        }
      },
      {
        chord: 'C7(13)',
        roman: 'V7(13)',
        measure: 4,
        tip: 'A 13ª (nota Lá) na 2ª corda dá a assinatura sonora do Samba moderno e Bossa.',
        shape: {
          id: 'c7_13_samba',
          name: 'C7(13) (Dominante com 13ª)',
          chordSymbol: 'C7(13)',
          root: 'C',
          baseFret: 2,
          frets: [null, 5, 3, 2, 3, null], // X-3-2-3-5-X
          fingers: [null, 4, 2, 1, 3, null],
          isIdiomaticForSamba: true,
          description: 'Tensão elegante que resolve perfeitamente no F6.'
        }
      }
    ]
  },
  {
    id: 'choro_f_preparacao',
    title: 'Cadência com Dominante Secundário D7(b9) (Tom de Fá)',
    key: 'F',
    style: 'Choro',
    rhythmTip: 'Toque o baixo na primeira semicolcheia e responda com o acorde sincopado na mão direita.',
    description: 'Cadência consagrada por Jacob do Bandolim e Waldir Azevedo. O acorde D7(b9) é o V7 do IIm, criando forte atração tonal para Gm7.',
    steps: [
      {
        chord: 'F7M',
        roman: 'I7M',
        measure: 1,
        tip: 'Voicing moderno sem quinta.',
        shape: {
          id: 'fmaj7_choro',
          name: 'F7M (Voicing Nobre)',
          chordSymbol: 'F7M',
          root: 'F',
          baseFret: 1,
          frets: [null, 1, 2, 2, null, 1],
          fingers: [null, 1, 3, 2, null, 1],
          isIdiomaticForSamba: true
        }
      },
      {
        chord: 'D7(b9)',
        roman: 'V7/II',
        measure: 2,
        tip: 'A 9ª menor (nota Eb) cria a tensão que resolve na 5ª ou tônica de Gm7.',
        shape: {
          id: 'd7_b9_choro',
          name: 'D7(b9) (Baixo na 5ª corda)',
          chordSymbol: 'D7(b9)',
          root: 'D',
          baseFret: 4,
          frets: [null, 4, 5, 4, 5, null], // X-5-4-5-4-X
          fingers: [null, 1, 3, 2, 4, null],
          isIdiomaticForSamba: true
        }
      },
      {
        chord: 'Gm7(9)',
        roman: 'IIm7(9)',
        measure: 3,
        tip: 'A 9ª adicionada (nota Lá) abre o timbre e permite o fraseado do solista.',
        shape: {
          id: 'gm7_9_choro',
          name: 'Gm7(9) (Voicing Expandido)',
          chordSymbol: 'Gm7(9)',
          root: 'G',
          baseFret: 3,
          frets: [null, 3, 3, 3, null, 3],
          fingers: [null, 1, 1, 1, null, 1],
          isIdiomaticForSamba: true
        }
      },
      {
        chord: 'C7(b9)',
        roman: 'V7(b9)',
        measure: 4,
        tip: 'Dominante tenso com b9 (Db) preparando o retorno para F.',
        shape: {
          id: 'c7_b9_choro',
          name: 'C7(b9) (Tensão Clássica)',
          chordSymbol: 'C7(b9)',
          root: 'C',
          baseFret: 2,
          frets: [null, 2, 3, 2, 3, null], // X-3-2-3-2-X
          fingers: [null, 1, 3, 2, 4, null],
          isIdiomaticForSamba: true
        }
      }
    ]
  },
  {
    id: 'samba_c_tradicional',
    title: 'Cadência Tradicional no Tom de Dó (C)',
    key: 'C',
    style: 'Samba',
    rhythmTip: 'Condução rítmica fluida e swingada com levada típica de violão de 6 e 7 cordas.',
    description: 'A clássica progressão C6 -> C#º -> Dm7 -> G7(13).',
    steps: [
      {
        chord: 'C6',
        roman: 'I6',
        measure: 1,
        tip: 'Polegar na 5ª corda (casa 3) com acorde nas cordas centrais.',
        shape: {
          id: 'c6_samba',
          name: 'C6',
          chordSymbol: 'C6',
          root: 'C',
          baseFret: 3,
          frets: [null, 5, 5, 5, 3, null],
          fingers: [null, 3, 3, 3, 1, null],
          isIdiomaticForSamba: true
        }
      },
      {
        chord: 'C#º',
        roman: '#Iº',
        measure: 2,
        tip: 'Diminuto de passagem conduzindo para Dm7.',
        shape: {
          id: 'csharp_dim',
          name: 'C#º',
          chordSymbol: 'C#º',
          root: 'C#',
          baseFret: 3,
          frets: [null, 5, 3, 5, 4, null],
          fingers: [null, 3, 1, 4, 2, null],
          isIdiomaticForSamba: true
        }
      },
      {
        chord: 'Dm7',
        roman: 'IIm7',
        measure: 3,
        tip: 'IIm com baixo na 5ª corda casa 5.',
        shape: {
          id: 'dm7_samba',
          name: 'Dm7',
          chordSymbol: 'Dm7',
          root: 'D',
          baseFret: 5,
          frets: [null, 6, 5, 7, 5, null],
          fingers: [null, 2, 1, 3, 1, null],
          isIdiomaticForSamba: true
        }
      },
      {
        chord: 'G7(13)',
        roman: 'V7(13)',
        measure: 4,
        tip: 'G7 com a 13ª (E) na 2ª corda casa 5.',
        shape: {
          id: 'g7_13_samba',
          name: 'G7(13)',
          chordSymbol: 'G7(13)',
          root: 'G',
          baseFret: 3,
          frets: [null, 5, 4, 3, null, 3],
          fingers: [null, 4, 3, 2, null, 1],
          isIdiomaticForSamba: true
        }
      }
    ]
  }
];
