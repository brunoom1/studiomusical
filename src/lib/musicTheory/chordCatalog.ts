import { ChordShape, NoteName, StringCount } from '../../types/music';
import { CHORD_FORMULAS } from './chords';

// Mapeamento canônico para enarmônicos (Db -> C#, Eb -> D#, etc.)
export const ENHARMONIC_CANONICAL: Record<NoteName, NoteName> = {
  'C': 'C',
  'C#': 'C#',
  'Db': 'C#',
  'D': 'D',
  'D#': 'Eb',
  'Eb': 'Eb',
  'E': 'E',
  'F': 'F',
  'F#': 'F#',
  'Gb': 'F#',
  'G': 'G',
  'G#': 'Ab',
  'Ab': 'Ab',
  'A': 'A',
  'A#': 'Bb',
  'Bb': 'Bb',
  'B': 'B'
};

export interface FixedChordDef {
  name: string;
  baseFret: number;
  frets: (number | null)[];
  fingers: (number | null)[];
  barres?: { fret: number; fromString: number; toString: number }[];
  isIdiomaticForSamba?: boolean;
  description?: string;
}

// Chave do catálogo: `${root}_${formulaId}_${stringCount}`
export type ChordCatalogKey = `${NoteName}_${string}_${StringCount}`;

export const FIXED_CHORD_CATALOG: Record<string, FixedChordDef[]> = {
  // =========================================================================
  // 6 CORDAS (VIOLÃO PADRÃO - E A D G B E)
  // Ordem das cordas no array frets: [1ª E, 2ª B, 3ª G, 4ª D, 5ª A, 6ª E]
  // =========================================================================

  // --- C (Dó) - 6 Cordas ---
  'C_major_triad_6': [
    { name: 'C Aberto Tradicional', baseFret: 1, frets: [0, 1, 0, 2, 3, null], fingers: [null, 1, null, 2, 3, null], isIdiomaticForSamba: true, description: 'Posição aberta fundamental de Dó maior no violão.' },
    { name: 'C Pestana (Forma de Lá)', baseFret: 3, frets: [3, 5, 5, 5, 3, null], fingers: [1, 4, 3, 2, 1, null], isIdiomaticForSamba: true, description: 'Pestana na 3ª casa na forma de Lá.' },
    { name: 'C Pestana (Forma de Mi)', baseFret: 8, frets: [8, 8, 9, 10, 10, 8], fingers: [1, 1, 2, 4, 3, 1], isIdiomaticForSamba: false, description: 'Pestana na 8ª casa.' }
  ],
  'C_minor_triad_6': [
    { name: 'Cm Pestana (Forma de Lá menor)', baseFret: 3, frets: [3, 4, 5, 5, 3, null], fingers: [1, 2, 4, 3, 1, null], isIdiomaticForSamba: true, description: 'Pestana clássica de Dó menor na 3ª casa.' },
    { name: 'Cm Pestana (Forma de Mi menor)', baseFret: 8, frets: [8, 8, 8, 10, 10, 8], fingers: [1, 1, 1, 4, 3, 1], isIdiomaticForSamba: false }
  ],
  'C_major7_6': [
    { name: 'C7M Aberto', baseFret: 1, frets: [0, 0, 0, 2, 3, null], fingers: [null, null, null, 2, 3, null], isIdiomaticForSamba: true, description: 'Dó com sétima maior aberto límpido e ressonante.' },
    { name: 'C7M Pestana Samba/Bossa', baseFret: 3, frets: [3, 5, 4, 5, 3, null], fingers: [1, 4, 2, 3, 1, null], isIdiomaticForSamba: true, description: 'Voicing clássico de bossa nova e samba.' },
    { name: 'C7M (Forma de Mi na 8ª casa)', baseFret: 8, frets: [null, 8, 9, 9, null, 8], fingers: [null, 2, 4, 3, null, 1], isIdiomaticForSamba: true }
  ],
  'C_major7_9_6': [
    { name: 'C7M(9) Bossa Nova', baseFret: 3, frets: [null, 3, 4, 2, 3, null], fingers: [null, 2, 4, 1, 3, null], isIdiomaticForSamba: true, description: 'O acorde símbolo de Chega de Saudade e Garota de Ipanema.' },
    { name: 'C7M(9) Aberto', baseFret: 1, frets: [0, 3, 0, 0, 3, null], fingers: [null, 2, null, null, 1, null], isIdiomaticForSamba: true }
  ],
  'C_minor_major7_6': [
    { name: 'Cm(7M) Choro', baseFret: 3, frets: [3, 4, 4, 5, 3, null], fingers: [1, 2, 3, 4, 1, null], isIdiomaticForSamba: true, description: 'Acorde misterioso de Choro e Jazz na menor melódica.' }
  ],
  'C_dominant7_6': [
    { name: 'C7 Aberto', baseFret: 1, frets: [0, 1, 3, 2, 3, null], fingers: [null, 1, 4, 2, 3, null], isIdiomaticForSamba: true, description: 'Dó com sétima dominante clássico preparando Fá.' },
    { name: 'C7 Samba/Choro (Sem 5ª)', baseFret: 3, frets: [null, 5, 3, 5, 3, null], fingers: [null, 4, 1, 3, 2, null], isIdiomaticForSamba: true, description: 'Voicing enxuto e percussivo para samba.' },
    { name: 'C7 Pestana', baseFret: 8, frets: [8, 8, 9, 8, 10, 8], fingers: [1, 1, 2, 1, 3, 1], isIdiomaticForSamba: false }
  ],
  'C_dominant7_9_6': [
    { name: 'C7(9) Bossa/Samba', baseFret: 3, frets: [null, 3, 3, 2, 3, null], fingers: [null, 3, 4, 1, 2, null], isIdiomaticForSamba: true, description: 'Acorde dominante elegante com a nona maior.' }
  ],
  'C_dominant7_13_6': [
    { name: 'C7(13) Samba Clássico', baseFret: 8, frets: [null, 10, 9, 8, null, 8], fingers: [null, 4, 3, 2, null, 1], isIdiomaticForSamba: true, description: 'Dominante de 13ª perfeito para cadências de choro.' },
    { name: 'C7(13) Forma de 5ª corda', baseFret: 3, frets: [5, 3, 3, 2, 3, null], fingers: [4, 2, 3, 1, 2, null], isIdiomaticForSamba: true }
  ],
  'C_dominant7_b9_6': [
    { name: 'C7(b9) Choro/Samba', baseFret: 8, frets: [null, null, 9, 8, null, 8], fingers: [null, null, 3, 2, null, 1], isIdiomaticForSamba: true, description: 'Tensão máxima preparando Fm.' }
  ],
  'C_dominant7_sharp9_6': [
    { name: 'C7(#9) Hendrix/Jazz', baseFret: 3, frets: [null, 4, 3, 2, 3, null], fingers: [null, 4, 2, 1, 3, null], isIdiomaticForSamba: true }
  ],
  'C_dominant7_b13_6': [
    { name: 'C7(b13)', baseFret: 8, frets: [null, 9, 9, 8, null, 8], fingers: [null, 3, 2, 1, null, 1], isIdiomaticForSamba: true }
  ],
  'C_minor7_6': [
    { name: 'Cm7 Samba (sem 5ª)', baseFret: 8, frets: [null, 8, 8, 8, null, 8], fingers: [null, 1, 1, 1, null, 1], isIdiomaticForSamba: true, description: 'Forma compacta com polegar na 6ª corda.' },
    { name: 'Cm7 Pestana', baseFret: 3, frets: [3, 4, 3, 5, 3, null], fingers: [1, 2, 1, 3, 1, null], isIdiomaticForSamba: true }
  ],
  'C_minor7_9_6': [
    { name: 'Cm7(9)', baseFret: 3, frets: [null, 3, 3, 1, 3, null], fingers: [null, 3, 4, 1, 2, null], isIdiomaticForSamba: true }
  ],
  'C_half_diminished_6': [
    { name: 'Cm7(b5) Clássico', baseFret: 3, frets: [null, 4, 3, 4, 3, null], fingers: [null, 3, 1, 4, 2, null], isIdiomaticForSamba: true, description: 'O IIm7(b5) para preparar Bbm.' },
    { name: 'Cm7(b5) Baixo 6ª', baseFret: 8, frets: [null, null, 8, 8, null, 8], fingers: [null, null, 2, 1, null, 1], isIdiomaticForSamba: true }
  ],
  'C_diminished7_6': [
    { name: 'Cº (dim7) 5ª corda', baseFret: 3, frets: [null, 4, 2, 4, 3, null], fingers: [null, 4, 1, 3, 2, null], isIdiomaticForSamba: true, description: 'Diminuto pleno simétrico na 3ª casa.' },
    { name: 'Cº (dim7) 6ª corda', baseFret: 8, frets: [null, 7, 8, 7, null, 8], fingers: [null, 2, 4, 1, null, 3], isIdiomaticForSamba: true }
  ],
  'C_major6_6': [
    { name: 'C6 Aberto', baseFret: 1, frets: [0, 1, 2, 2, 3, null], fingers: [null, 1, 3, 2, 4, null], isIdiomaticForSamba: true, description: 'Dó com sexta aberto tradicional.' },
    { name: 'C6 Samba Raiz', baseFret: 8, frets: [null, null, 9, 7, null, 8], fingers: [null, null, 3, 1, null, 2], isIdiomaticForSamba: true }
  ],
  'C_diminished_triad_6': [
    { name: 'Cdim Tríade', baseFret: 3, frets: [null, 4, 5, 4, 3, null], fingers: [null, 3, 4, 2, 1, null], isIdiomaticForSamba: true }
  ],
  'C_augmented_triad_6': [
    { name: 'Caug Tríade Aumentada', baseFret: 3, frets: [null, 5, 5, 6, 3, null], fingers: [null, 3, 2, 4, 1, null], isIdiomaticForSamba: true }
  ],

  // --- D (Ré) - 6 Cordas ---
  'D_major_triad_6': [
    { name: 'D Aberto Tradicional', baseFret: 1, frets: [2, 3, 2, 0, null, null], fingers: [1, 3, 2, null, null, null], isIdiomaticForSamba: true, description: 'Ré maior aberto límpido.' },
    { name: 'D Pestana (Forma de Lá)', baseFret: 5, frets: [5, 7, 7, 7, 5, null], fingers: [1, 4, 3, 2, 1, null], isIdiomaticForSamba: true },
    { name: 'D Pestana (Forma de Mi)', baseFret: 10, frets: [10, 10, 11, 12, 12, 10], fingers: [1, 1, 2, 4, 3, 1], isIdiomaticForSamba: false }
  ],
  'D_minor_triad_6': [
    { name: 'Dm Aberto Tradicional', baseFret: 1, frets: [1, 3, 2, 0, null, null], fingers: [1, 3, 2, null, null, null], isIdiomaticForSamba: true, description: 'Ré menor aberto indispensável.' },
    { name: 'Dm Pestana (Forma de Lá menor)', baseFret: 5, frets: [5, 6, 7, 7, 5, null], fingers: [1, 2, 4, 3, 1, null], isIdiomaticForSamba: true }
  ],
  'D_major7_6': [
    { name: 'D7M Aberto', baseFret: 1, frets: [2, 2, 2, 0, null, null], fingers: [1, 1, 1, null, null, null], isIdiomaticForSamba: true, description: 'Mini-pestana suave na 2ª casa.' },
    { name: 'D7M Samba/Bossa', baseFret: 5, frets: [5, 7, 6, 7, 5, null], fingers: [1, 4, 2, 3, 1, null], isIdiomaticForSamba: true }
  ],
  'D_major7_9_6': [
    { name: 'D7M(9) Bossa', baseFret: 5, frets: [null, 5, 6, 4, 5, null], fingers: [null, 2, 4, 1, 3, null], isIdiomaticForSamba: true }
  ],
  'D_dominant7_6': [
    { name: 'D7 Aberto Clássico', baseFret: 1, frets: [2, 1, 2, 0, null, null], fingers: [3, 1, 2, null, null, null], isIdiomaticForSamba: true },
    { name: 'D7 Samba (sem 5ª)', baseFret: 5, frets: [null, 7, 5, 7, 5, null], fingers: [null, 4, 1, 3, 2, null], isIdiomaticForSamba: true }
  ],
  'D_dominant7_9_6': [
    { name: 'D7(9) Bossa/Samba', baseFret: 5, frets: [null, 5, 5, 4, 5, null], fingers: [null, 3, 4, 1, 2, null], isIdiomaticForSamba: true }
  ],
  'D_dominant7_13_6': [
    { name: 'D7(13) Samba Clássico', baseFret: 10, frets: [null, 12, 11, 10, null, 10], fingers: [null, 4, 3, 2, null, 1], isIdiomaticForSamba: true },
    { name: 'D7(13) Baixo 5ª', baseFret: 5, frets: [7, 5, 5, 4, 5, null], fingers: [4, 2, 3, 1, 2, null], isIdiomaticForSamba: true }
  ],
  'D_minor7_6': [
    { name: 'Dm7 Aberto', baseFret: 1, frets: [1, 1, 2, 0, null, null], fingers: [1, 1, 2, null, null, null], isIdiomaticForSamba: true },
    { name: 'Dm7 Samba/Bossa', baseFret: 5, frets: [5, 6, 5, 7, 5, null], fingers: [1, 2, 1, 3, 1, null], isIdiomaticForSamba: true }
  ],
  'D_minor7_9_6': [
    { name: 'Dm7(9) Clássico', baseFret: 5, frets: [null, 5, 5, 3, 5, null], fingers: [null, 3, 4, 1, 2, null], isIdiomaticForSamba: true, description: 'O clássico voicing IIm7 de cadência II-V-I em C.' }
  ],
  'D_half_diminished_6': [
    { name: 'Dm7(b5) Clássico', baseFret: 5, frets: [null, 6, 5, 6, 5, null], fingers: [null, 3, 1, 4, 2, null], isIdiomaticForSamba: true }
  ],
  'D_diminished7_6': [
    { name: 'Dº (dim7)', baseFret: 4, frets: [null, 6, 4, 6, 5, null], fingers: [null, 4, 1, 3, 2, null], isIdiomaticForSamba: true }
  ],
  'D_major6_6': [
    { name: 'D6 Aberto', baseFret: 1, frets: [2, 0, 2, 0, null, null], fingers: [2, null, 1, null, null, null], isIdiomaticForSamba: true },
    { name: 'D6 Samba', baseFret: 5, frets: [null, 7, 7, 7, 5, null], fingers: [null, 3, 3, 3, 1, null], isIdiomaticForSamba: true }
  ],

  // --- E (Mi) - 6 Cordas ---
  'E_major_triad_6': [
    { name: 'E Aberto Tradicional', baseFret: 1, frets: [0, 0, 1, 2, 2, 0], fingers: [null, null, 1, 3, 2, null], isIdiomaticForSamba: true, description: 'O acorde mais ressonante do violão.' },
    { name: 'E Pestana (Forma de Lá)', baseFret: 7, frets: [7, 9, 9, 9, 7, null], fingers: [1, 4, 3, 2, 1, null], isIdiomaticForSamba: true }
  ],
  'E_minor_triad_6': [
    { name: 'Em Aberto Tradicional', baseFret: 1, frets: [0, 0, 0, 2, 2, 0], fingers: [null, null, null, 3, 2, null], isIdiomaticForSamba: true, description: 'Mi menor aberto fundamental.' }
  ],
  'E_major7_6': [
    { name: 'E7M Aberto', baseFret: 1, frets: [0, 0, 1, 1, 2, 0], fingers: [null, null, 1, 2, 3, null], isIdiomaticForSamba: true },
    { name: 'E7M Samba/Bossa', baseFret: 7, frets: [7, 9, 8, 9, 7, null], fingers: [1, 4, 2, 3, 1, null], isIdiomaticForSamba: true }
  ],
  'E_dominant7_6': [
    { name: 'E7 Aberto Tradicional', baseFret: 1, frets: [0, 0, 1, 0, 2, 0], fingers: [null, null, 1, null, 2, null], isIdiomaticForSamba: true },
    { name: 'E7 Samba (sem 5ª)', baseFret: 1, frets: [null, 3, 1, 2, null, 0], fingers: [null, 4, 1, 2, null, null], isIdiomaticForSamba: true }
  ],
  'E_minor7_6': [
    { name: 'Em7 Aberto', baseFret: 1, frets: [0, 0, 0, 0, 2, 0], fingers: [null, null, null, null, 2, null], isIdiomaticForSamba: true },
    { name: 'Em7 Samba (sem 5ª)', baseFret: 7, frets: [null, 8, 7, 9, 7, null], fingers: [null, 2, 1, 3, 1, null], isIdiomaticForSamba: true }
  ],

  // --- F (Fá) - 6 Cordas ---
  'F_major_triad_6': [
    { name: 'F Pestana 1ª Casa', baseFret: 1, frets: [1, 1, 2, 3, 3, 1], fingers: [1, 1, 2, 4, 3, 1], isIdiomaticForSamba: false, description: 'A tradicional pestana na 1ª casa.' },
    { name: 'F Samba Enxuto', baseFret: 1, frets: [null, 1, 2, 3, null, 1], fingers: [null, 1, 2, 3, null, 1], isIdiomaticForSamba: true }
  ],
  'F_minor_triad_6': [
    { name: 'Fm Pestana 1ª Casa', baseFret: 1, frets: [1, 1, 1, 3, 3, 1], fingers: [1, 1, 1, 4, 3, 1], isIdiomaticForSamba: false }
  ],
  'F_major7_6': [
    { name: 'F7M Samba com Polegar', baseFret: 1, frets: [null, 1, 2, 2, null, 1], fingers: [null, 1, 3, 2, null, 1], isIdiomaticForSamba: true, description: 'O voicing clássico do Samba e Choro carioca.' },
    { name: 'F7M Aberto Suave', baseFret: 1, frets: [0, 1, 2, 3, null, null], fingers: [null, 1, 2, 3, null, null], isIdiomaticForSamba: true }
  ],
  'F_major6_6': [
    { name: 'F6 Noel Rosa / Cartola', baseFret: 1, frets: [null, 1, 2, 0, null, 1], fingers: [null, 1, 3, null, null, 1], isIdiomaticForSamba: true, description: 'O shape clássico de abertura do samba tradicional.' }
  ],
  'F_dominant7_6': [
    { name: 'F7 Pestana', baseFret: 1, frets: [1, 1, 2, 1, 3, 1], fingers: [1, 1, 2, 1, 3, 1], isIdiomaticForSamba: false },
    { name: 'F7 Samba (sem 5ª)', baseFret: 1, frets: [null, null, 2, 1, null, 1], fingers: [null, null, 2, 1, null, 1], isIdiomaticForSamba: true }
  ],
  'F_dominant7_13_6': [
    { name: 'F7(13) Samba & Choro', baseFret: 1, frets: [null, 3, 2, 1, null, 1], fingers: [null, 4, 3, 2, null, 1], isIdiomaticForSamba: true }
  ],

  // --- G (Sol) - 6 Cordas ---
  'G_major_triad_6': [
    { name: 'G Aberto Tradicional', baseFret: 1, frets: [3, 0, 0, 0, 2, 3], fingers: [4, null, null, null, 1, 2], isIdiomaticForSamba: true, description: 'Sol maior aberto clássico com 3ª corda Si solta.' },
    { name: 'G Aberto Pop (com Ré)', baseFret: 1, frets: [3, 3, 0, 0, 2, 3], fingers: [4, 3, null, null, 1, 2], isIdiomaticForSamba: true },
    { name: 'G Pestana', baseFret: 3, frets: [3, 3, 4, 5, 5, 3], fingers: [1, 1, 2, 4, 3, 1], isIdiomaticForSamba: false }
  ],
  'G_minor_triad_6': [
    { name: 'Gm Pestana 3ª Casa', baseFret: 3, frets: [3, 3, 3, 5, 5, 3], fingers: [1, 1, 1, 4, 3, 1], isIdiomaticForSamba: false }
  ],
  'G_major7_6': [
    { name: 'G7M Samba/Bossa', baseFret: 3, frets: [null, 3, 4, 4, null, 3], fingers: [null, 1, 3, 2, null, 1], isIdiomaticForSamba: true, description: 'O voicing soberbo de Tom Jobim e Baden Powell.' },
    { name: 'G7M Aberto', baseFret: 1, frets: [2, 0, 0, 0, null, 3], fingers: [1, null, null, null, null, 2], isIdiomaticForSamba: true }
  ],
  'G_dominant7_6': [
    { name: 'G7 Aberto Clássico', baseFret: 1, frets: [1, 0, 0, 0, 2, 3], fingers: [1, null, null, null, 2, 3], isIdiomaticForSamba: true },
    { name: 'G7 Samba (sem 5ª)', baseFret: 3, frets: [null, null, 4, 3, null, 3], fingers: [null, null, 3, 1, null, 2], isIdiomaticForSamba: true }
  ],
  'G_dominant7_13_6': [
    { name: 'G7(13) Samba Clássico', baseFret: 3, frets: [null, 5, 4, 3, null, 3], fingers: [null, 4, 3, 2, null, 1], isIdiomaticForSamba: true, description: 'O acorde mais tocado de preparação no Tom de Dó.' }
  ],
  'G_minor7_6': [
    { name: 'Gm7 Samba (sem 5ª)', baseFret: 3, frets: [null, 3, 3, 3, null, 3], fingers: [null, 1, 1, 1, null, 1], isIdiomaticForSamba: true, description: 'Mini-pestana suave nas cordas agudas.' }
  ],

  // --- A (Lá) - 6 Cordas ---
  'A_major_triad_6': [
    { name: 'A Aberto Tradicional', baseFret: 1, frets: [0, 2, 2, 2, 0, null], fingers: [null, 3, 2, 1, null, null], isIdiomaticForSamba: true, description: 'Lá maior aberto.' },
    { name: 'A Pestana 5ª Casa', baseFret: 5, frets: [5, 5, 6, 7, 7, 5], fingers: [1, 1, 2, 4, 3, 1], isIdiomaticForSamba: false }
  ],
  'A_minor_triad_6': [
    { name: 'Am Aberto Tradicional', baseFret: 1, frets: [0, 1, 2, 2, 0, null], fingers: [null, 1, 3, 2, null, null], isIdiomaticForSamba: true, description: 'Lá menor aberto fundamental.' }
  ],
  'A_major7_6': [
    { name: 'A7M Aberto', baseFret: 1, frets: [0, 2, 1, 2, 0, null], fingers: [null, 3, 1, 2, null, null], isIdiomaticForSamba: true },
    { name: 'A7M Samba', baseFret: 5, frets: [null, 5, 6, 6, null, 5], fingers: [null, 1, 3, 2, null, 1], isIdiomaticForSamba: true }
  ],
  'A_dominant7_6': [
    { name: 'A7 Aberto Tradicional', baseFret: 1, frets: [0, 2, 0, 2, 0, null], fingers: [null, 2, null, 1, null, null], isIdiomaticForSamba: true },
    { name: 'A7 Samba (sem 5ª)', baseFret: 5, frets: [null, null, 6, 5, null, 5], fingers: [null, null, 3, 1, null, 2], isIdiomaticForSamba: true }
  ],
  'A_dominant7_13_6': [
    { name: 'A7(13) Samba Clássico', baseFret: 5, frets: [null, 7, 6, 5, null, 5], fingers: [null, 4, 3, 2, null, 1], isIdiomaticForSamba: true }
  ],
  'A_minor7_6': [
    { name: 'Am7 Aberto', baseFret: 1, frets: [0, 1, 0, 2, 0, null], fingers: [null, 1, null, 2, null, null], isIdiomaticForSamba: true },
    { name: 'Am7 Samba', baseFret: 5, frets: [null, 5, 5, 5, null, 5], fingers: [null, 1, 1, 1, null, 1], isIdiomaticForSamba: true }
  ],

  // --- B (Si) - 6 Cordas ---
  'B_major_triad_6': [
    { name: 'B Pestana 2ª Casa', baseFret: 2, frets: [2, 4, 4, 4, 2, null], fingers: [1, 4, 3, 2, 1, null], isIdiomaticForSamba: true }
  ],
  'B_minor_triad_6': [
    { name: 'Bm Pestana 2ª Casa', baseFret: 2, frets: [2, 3, 4, 4, 2, null], fingers: [1, 2, 4, 3, 1, null], isIdiomaticForSamba: true }
  ],
  'B_dominant7_6': [
    { name: 'B7 Aberto Clássico', baseFret: 1, frets: [2, 0, 2, 1, 2, null], fingers: [4, null, 3, 1, 2, null], isIdiomaticForSamba: true, description: 'Si com sétima aberto histórico do violão.' }
  ],
  'B_half_diminished_6': [
    { name: 'Bm7(b5) Clássico', baseFret: 2, frets: [null, 3, 2, 3, 2, null], fingers: [null, 3, 1, 4, 2, null], isIdiomaticForSamba: true, description: 'O meio-diminuto mais tocado do violão de samba e bossa.' }
  ],

  // --- Bb / A# - 6 Cordas ---
  'Bb_major_triad_6': [
    { name: 'Bb Pestana 1ª Casa', baseFret: 1, frets: [1, 3, 3, 3, 1, null], fingers: [1, 4, 3, 2, 1, null], isIdiomaticForSamba: true }
  ],
  'Bb_minor_triad_6': [
    { name: 'Bbm Pestana 1ª Casa', baseFret: 1, frets: [1, 2, 3, 3, 1, null], fingers: [1, 2, 4, 3, 1, null], isIdiomaticForSamba: true }
  ],
  'Bb_major7_6': [
    { name: 'Bb7M Samba/Bossa', baseFret: 1, frets: [null, 3, 2, 3, 1, null], fingers: [null, 3, 2, 4, 1, null], isIdiomaticForSamba: true }
  ],
  'Bb_dominant7_6': [
    { name: 'Bb7 Pestana/Samba', baseFret: 1, frets: [null, 3, 1, 3, 1, null], fingers: [null, 4, 1, 3, 2, null], isIdiomaticForSamba: true }
  ],
  'Bb_minor7_6': [
    { name: 'Bbm7 Samba', baseFret: 1, frets: [null, 2, 1, 3, 1, null], fingers: [null, 2, 1, 3, 1, null], isIdiomaticForSamba: true }
  ],
  'Bb_major6_6': [
    { name: 'Bb6 Choro', baseFret: 1, frets: [null, 3, 3, 3, 1, null], fingers: [null, 3, 3, 3, 1, null], isIdiomaticForSamba: true }
  ],

  // --- Eb / D# - 6 Cordas ---
  'Eb_major_triad_6': [
    { name: 'Eb Pestana 6ª Casa', baseFret: 6, frets: [6, 8, 8, 8, 6, null], fingers: [1, 4, 3, 2, 1, null], isIdiomaticForSamba: true },
    { name: 'Eb Aberto 1ª Posição', baseFret: 1, frets: [3, 4, 3, 1, null, null], fingers: [2, 4, 3, 1, null, null], isIdiomaticForSamba: true }
  ],
  'Eb_dominant7_6': [
    { name: 'Eb7 Samba/Bossa', baseFret: 6, frets: [null, 8, 6, 8, 6, null], fingers: [null, 4, 1, 3, 2, null], isIdiomaticForSamba: true }
  ],

  // --- Ab / G# - 6 Cordas ---
  'Ab_major_triad_6': [
    { name: 'Ab Pestana 4ª Casa', baseFret: 4, frets: [4, 4, 5, 6, 6, 4], fingers: [1, 1, 2, 4, 3, 1], isIdiomaticForSamba: false }
  ],
  'Ab_major7_6': [
    { name: 'Ab7M Samba/Bossa', baseFret: 4, frets: [null, 4, 5, 5, null, 4], fingers: [null, 1, 3, 2, null, 1], isIdiomaticForSamba: true }
  ],

  // --- F# / Gb - 6 Cordas ---
  'F#_major_triad_6': [
    { name: 'F# Pestana 2ª Casa', baseFret: 2, frets: [2, 2, 3, 4, 4, 2], fingers: [1, 1, 2, 4, 3, 1], isIdiomaticForSamba: false }
  ],
  'F#_diminished7_6': [
    { name: 'F#º Diminuto de Passagem', baseFret: 1, frets: [null, 1, 2, 1, null, 2], fingers: [null, 1, 3, 2, null, 4], isIdiomaticForSamba: true, description: 'O diminuto de passagem mais emblemático do samba e choro (Noel Rosa / Cartola).' }
  ],

  // --- C# / Db - 6 Cordas ---
  'C#_major_triad_6': [
    { name: 'C# Pestana 4ª Casa', baseFret: 4, frets: [4, 6, 6, 6, 4, null], fingers: [1, 4, 3, 2, 1, null], isIdiomaticForSamba: true }
  ],
  'C#_dominant7_6': [
    { name: 'C#7 Samba/Bossa', baseFret: 4, frets: [null, 6, 4, 6, 4, null], fingers: [null, 4, 1, 3, 2, null], isIdiomaticForSamba: true }
  ],

  // =========================================================================
  // 4 CORDAS (CAVAQUINHO - D G B D)
  // Ordem das cordas no array frets: [1ª D, 2ª B, 3ª G, 4ª D]
  // =========================================================================

  // --- C (Dó) - 4 Cordas ---
  'C_major_triad_4': [
    { name: 'C Aberto Tradicional', baseFret: 1, frets: [2, 1, 0, 2], fingers: [2, 1, null, 3], isIdiomaticForSamba: true, description: 'Forma clássica aberta de Dó maior no cavaquinho.' },
    { name: 'C Pestana 5ª Casa', baseFret: 5, frets: [5, 5, 5, 5], fingers: [1, 1, 1, 1], isIdiomaticForSamba: true, description: 'Pestana reta completa na 5ª casa.' }
  ],
  'C_minor_triad_4': [
    { name: 'Cm Pestana 5ª Casa', baseFret: 4, frets: [5, 4, 5, 5], fingers: [3, 1, 2, 4], isIdiomaticForSamba: true, description: 'Dó menor clássico de samba no cavaquinho.' }
  ],
  'C_major7_4': [
    { name: 'C7M Aberto', baseFret: 1, frets: [2, 0, 0, 2], fingers: [1, null, null, 2], isIdiomaticForSamba: true, description: 'Dó com sétima maior solto e límpido.' },
    { name: 'C7M Pestana 5ª Casa', baseFret: 4, frets: [5, 5, 4, 5], fingers: [3, 4, 1, 2], isIdiomaticForSamba: true }
  ],
  'C_major7_9_4': [
    { name: 'C7M(9) Choro/Samba', baseFret: 1, frets: [0, 1, 0, 0], fingers: [null, 1, null, null], isIdiomaticForSamba: true }
  ],
  'C_dominant7_4': [
    { name: 'C7 Clássico Samba', baseFret: 1, frets: [2, 1, 3, 2], fingers: [2, 1, 4, 3], isIdiomaticForSamba: true, description: 'O C7 mais tocado nas rodas de samba.' },
    { name: 'C7 Pestana 5ª Casa', baseFret: 3, frets: [5, 5, 3, 5], fingers: [3, 4, 1, 2], isIdiomaticForSamba: true }
  ],
  'C_dominant7_13_4': [
    { name: 'C7(13) Samba & Choro', baseFret: 1, frets: [2, 3, 3, 2], fingers: [1, 3, 4, 2], isIdiomaticForSamba: true, description: 'Cadência elegante preparando Fá.' }
  ],
  'C_dominant7_b9_4': [
    { name: 'C7(b9) Choro Tensão', baseFret: 1, frets: [2, 2, 3, 2], fingers: [1, 2, 4, 3], isIdiomaticForSamba: true }
  ],
  'C_minor7_4': [
    { name: 'Cm7 Samba', baseFret: 1, frets: [1, 1, 3, 1], fingers: [1, 1, 3, 1], isIdiomaticForSamba: true, description: 'Mini-pestana suave na 1ª casa.' },
    { name: 'Cm7 Pestana 5ª Casa', baseFret: 3, frets: [5, 4, 3, 5], fingers: [4, 2, 1, 3], isIdiomaticForSamba: true }
  ],
  'C_half_diminished_4': [
    { name: 'Cm7(b5)', baseFret: 1, frets: [1, 1, 3, 1], fingers: [1, 1, 4, 2], isIdiomaticForSamba: true }
  ],
  'C_diminished7_4': [
    { name: 'Cº (dim7) Simétrico', baseFret: 1, frets: [1, 1, 2, 1], fingers: [1, 1, 3, 2], isIdiomaticForSamba: true, description: 'Acorde simétrico de passagem cromática.' }
  ],
  'C_major6_4': [
    { name: 'C6 Samba Raiz', baseFret: 1, frets: [2, 1, 2, 2], fingers: [2, 1, 3, 4], isIdiomaticForSamba: true, description: 'O clássico C6 do cavaquinho de samba.' }
  ],

  // --- D (Ré) - 4 Cordas ---
  'D_major_triad_4': [
    { name: 'D Aberto Clássico', baseFret: 1, frets: [0, 3, 2, 0], fingers: [null, 3, 2, null], isIdiomaticForSamba: true, description: 'Ré maior aberto fundamental no cavaquinho.' },
    { name: 'D Pestana 7ª Casa', baseFret: 7, frets: [7, 7, 7, 7], fingers: [1, 1, 1, 1], isIdiomaticForSamba: true }
  ],
  'D_minor_triad_4': [
    { name: 'Dm Aberto', baseFret: 1, frets: [3, 3, 2, 0], fingers: [3, 4, 2, null], isIdiomaticForSamba: true, description: 'Ré menor aberto no cavaquinho.' }
  ],
  'D_major7_4': [
    { name: 'D7M Aberto', baseFret: 1, frets: [0, 2, 2, 0], fingers: [null, 2, 1, null], isIdiomaticForSamba: true, description: 'D7M límpido e ressonante.' }
  ],
  'D_dominant7_4': [
    { name: 'D7 Aberto Clássico', baseFret: 1, frets: [0, 1, 2, 0], fingers: [null, 1, 2, null], isIdiomaticForSamba: true, description: 'D7 aberto indispensável no samba.' },
    { name: 'D7 Invertido', baseFret: 1, frets: [4, 1, 2, 0], fingers: [4, 1, 2, null], isIdiomaticForSamba: true }
  ],
  'D_dominant7_13_4': [
    { name: 'D7(13) Samba', baseFret: 1, frets: [4, 0, 2, 0], fingers: [4, null, 1, null], isIdiomaticForSamba: true }
  ],
  'D_minor7_4': [
    { name: 'Dm7 Aberto', baseFret: 1, frets: [3, 1, 2, 0], fingers: [3, 1, 2, null], isIdiomaticForSamba: true, description: 'O IIm7 de Dó maior no cavaquinho.' }
  ],
  'D_major6_4': [
    { name: 'D6 Aberto', baseFret: 1, frets: [0, 0, 2, 0], fingers: [null, null, 1, null], isIdiomaticForSamba: true }
  ],
  'D_half_diminished_4': [
    { name: 'Dm7(b5)', baseFret: 1, frets: [3, 1, 1, 0], fingers: [4, 1, 2, null], isIdiomaticForSamba: true }
  ],

  // --- E (Mi) - 4 Cordas ---
  'E_major_triad_4': [
    { name: 'E Tradicional', baseFret: 1, frets: [2, 0, 1, 2], fingers: [3, null, 1, 2], isIdiomaticForSamba: true }
  ],
  'E_minor_triad_4': [
    { name: 'Em Aberto', baseFret: 1, frets: [2, 0, 0, 2], fingers: [1, null, null, 2], isIdiomaticForSamba: true }
  ],
  'E_dominant7_4': [
    { name: 'E7 Aberto', baseFret: 1, frets: [0, 0, 1, 2], fingers: [null, null, 1, 2], isIdiomaticForSamba: true }
  ],
  'E_minor7_4': [
    { name: 'Em7 Aberto', baseFret: 1, frets: [0, 0, 0, 2], fingers: [null, null, null, 1], isIdiomaticForSamba: true }
  ],

  // --- F (Fá) - 4 Cordas ---
  'F_major_triad_4': [
    { name: 'F Tradicional', baseFret: 1, frets: [3, 1, 2, 3], fingers: [3, 1, 2, 4], isIdiomaticForSamba: true }
  ],
  'F_minor_triad_4': [
    { name: 'Fm Tradicional', baseFret: 1, frets: [3, 1, 1, 3], fingers: [3, 1, 1, 4], isIdiomaticForSamba: true }
  ],
  'F_major7_4': [
    { name: 'F7M Tradicional', baseFret: 1, frets: [2, 1, 2, 3], fingers: [2, 1, 3, 4], isIdiomaticForSamba: true }
  ],
  'F_dominant7_4': [
    { name: 'F7 Tradicional', baseFret: 1, frets: [1, 1, 2, 3], fingers: [1, 1, 2, 4], isIdiomaticForSamba: true }
  ],
  'F_major6_4': [
    { name: 'F6 Tradicional', baseFret: 1, frets: [0, 1, 2, 3], fingers: [null, 1, 2, 3], isIdiomaticForSamba: true }
  ],

  // --- G (Sol) - 4 Cordas ---
  'G_major_triad_4': [
    { name: 'G Cordas Soltas', baseFret: 1, frets: [0, 0, 0, 0], fingers: [null, null, null, null], isIdiomaticForSamba: true, description: 'Todas as cordas soltas do Cavaquinho formam Sol maior puro!' },
    { name: 'G Posição Fechada', baseFret: 3, frets: [5, 3, 4, 5], fingers: [3, 1, 2, 4], isIdiomaticForSamba: true }
  ],
  'G_minor_triad_4': [
    { name: 'Gm Tradicional', baseFret: 3, frets: [5, 3, 3, 5], fingers: [3, 1, 1, 4], isIdiomaticForSamba: true }
  ],
  'G_major7_4': [
    { name: 'G7M Tradicional', baseFret: 1, frets: [4, 0, 0, 4], fingers: [1, null, null, 2], isIdiomaticForSamba: true }
  ],
  'G_dominant7_4': [
    { name: 'G7 Aberto', baseFret: 1, frets: [3, 0, 0, 3], fingers: [1, null, null, 2], isIdiomaticForSamba: true }
  ],
  'G_major6_4': [
    { name: 'G6 Aberto', baseFret: 1, frets: [2, 0, 0, 0], fingers: [1, null, null, null], isIdiomaticForSamba: true }
  ],

  // --- A (Lá) - 4 Cordas ---
  'A_major_triad_4': [
    { name: 'A Pestana 2ª Casa', baseFret: 2, frets: [2, 2, 2, 2], fingers: [1, 1, 1, 1], isIdiomaticForSamba: true }
  ],
  'A_minor_triad_4': [
    { name: 'Am Tradicional', baseFret: 1, frets: [2, 1, 2, 2], fingers: [2, 1, 3, 4], isIdiomaticForSamba: true }
  ],
  'A_dominant7_4': [
    { name: 'A7 Aberto', baseFret: 1, frets: [2, 2, 0, 2], fingers: [2, 3, null, 1], isIdiomaticForSamba: true }
  ],
  'A_minor7_4': [
    { name: 'Am7 Aberto', baseFret: 1, frets: [2, 1, 0, 2], fingers: [2, 1, null, 3], isIdiomaticForSamba: true }
  ],

  // --- B (Si) - 4 Cordas ---
  'B_major_triad_4': [
    { name: 'B Pestana 4ª Casa', baseFret: 4, frets: [4, 4, 4, 4], fingers: [1, 1, 1, 1], isIdiomaticForSamba: true }
  ],
  'B_minor_triad_4': [
    { name: 'Bm Tradicional', baseFret: 2, frets: [4, 3, 4, 4], fingers: [3, 1, 2, 4], isIdiomaticForSamba: true }
  ],
  'B_half_diminished_4': [
    { name: 'Bm7(b5) Cavaquinho', baseFret: 1, frets: [3, 0, 2, 0], fingers: [3, null, 1, null], isIdiomaticForSamba: true, description: 'O meio-diminuto tradicional para preparar Am.' }
  ],

  // --- Bb / A# - 4 Cordas ---
  'Bb_major_triad_4': [
    { name: 'Bb Pestana 3ª Casa', baseFret: 3, frets: [3, 3, 3, 3], fingers: [1, 1, 1, 1], isIdiomaticForSamba: true }
  ],
  'Bb_minor_triad_4': [
    { name: 'Bbm Cavaquinho', baseFret: 1, frets: [3, 2, 3, 3], fingers: [3, 1, 2, 4], isIdiomaticForSamba: true }
  ],
  'Bb_dominant7_4': [
    { name: 'Bb7 Aberto/Pestana', baseFret: 1, frets: [0, 3, 1, 3], fingers: [null, 3, 1, 2], isIdiomaticForSamba: true }
  ],
  'Bb_major7_4': [
    { name: 'Bb7M Cavaquinho', baseFret: 1, frets: [0, 3, 2, 3], fingers: [null, 3, 1, 2], isIdiomaticForSamba: true }
  ],

  // --- Eb / D# - 4 Cordas ---
  'Eb_major_triad_4': [
    { name: 'Eb Aberto 1ª Casa', baseFret: 1, frets: [1, 4, 3, 1], fingers: [1, 4, 3, 1], isIdiomaticForSamba: true },
    { name: 'Eb Pestana 8ª Casa', baseFret: 8, frets: [8, 8, 8, 8], fingers: [1, 1, 1, 1], isIdiomaticForSamba: true }
  ],
  'Eb_dominant7_4': [
    { name: 'Eb7 Cavaquinho', baseFret: 1, frets: [1, 2, 0, 1], fingers: [1, 3, null, 2], isIdiomaticForSamba: true }
  ],

  // --- Ab / G# - 4 Cordas ---
  'Ab_major_triad_4': [
    { name: 'Ab Pestana 1ª Casa', baseFret: 1, frets: [1, 1, 1, 1], fingers: [1, 1, 1, 1], isIdiomaticForSamba: true }
  ],
  'Ab_dominant7_4': [
    { name: 'Ab7 Cavaquinho', baseFret: 1, frets: [4, 1, 1, 4], fingers: [3, 1, 1, 4], isIdiomaticForSamba: true }
  ],

  // --- F# / Gb - 4 Cordas ---
  'F#_major_triad_4': [
    { name: 'F# Cavaquinho', baseFret: 2, frets: [4, 2, 3, 4], fingers: [3, 1, 2, 4], isIdiomaticForSamba: true }
  ],
  'F#_diminished7_4': [
    { name: 'F#º Diminuto Tradicional', baseFret: 1, frets: [1, 2, 1, 2], fingers: [1, 3, 2, 4], isIdiomaticForSamba: true, description: 'O clássico shape diminuto em X do cavaquinho de choro e samba.' }
  ],

  // --- C# / Db - 4 Cordas ---
  'C#_major_triad_4': [
    { name: 'C# Pestana 6ª Casa', baseFret: 6, frets: [6, 6, 6, 6], fingers: [1, 1, 1, 1], isIdiomaticForSamba: true }
  ],
  'C#_dominant7_4': [
    { name: 'C#7 Cavaquinho', baseFret: 2, frets: [3, 2, 4, 3], fingers: [2, 1, 4, 3], isIdiomaticForSamba: true }
  ],

  // =========================================================================
  // 7 CORDAS (VIOLÃO DE 7 CORDAS - E A D G B E + C2)
  // Ordem das cordas no array frets: [1ª E, 2ª B, 3ª G, 4ª D, 5ª A, 6ª E, 7ª C]
  // =========================================================================

  // --- C (Dó) - 7 Cordas ---
  'C_major_triad_7': [
    { name: 'C Baixaria Solta (7ª corda em C2)', baseFret: 1, frets: [0, 1, 0, 2, null, null, 0], fingers: [null, 1, null, 2, null, null, null], isIdiomaticForSamba: true, description: '7ª corda solta ressonando o Dó grave de Dino 7 Cordas.' },
    { name: 'C Completo 7 Cordas', baseFret: 1, frets: [0, 1, 0, 2, 3, null, 0], fingers: [null, 1, null, 2, 3, null, null], isIdiomaticForSamba: true }
  ],
  'C_minor_triad_7': [
    { name: 'Cm Baixaria 7ª Corda', baseFret: 1, frets: [null, 1, 0, 1, null, null, 0], fingers: [null, 2, null, 1, null, null, null], isIdiomaticForSamba: true, description: 'Dó menor com o bordão solto em C2.' }
  ],
  'C_major7_7': [
    { name: 'C7M Baixaria Dino (7ª em C2)', baseFret: 1, frets: [null, 0, 0, 2, null, null, 0], fingers: [null, null, null, 1, null, null, null], isIdiomaticForSamba: true, description: 'Dó com sétima maior límpido com a baixaria em C2.' },
    { name: 'C7M Fechado 7 Cordas', baseFret: 1, frets: [null, 0, 2, 2, null, null, 0], fingers: [null, null, 2, 1, null, null, null], isIdiomaticForSamba: true }
  ],
  'C_dominant7_7': [
    { name: 'C7 Baixaria Choro (7ª corda em C2)', baseFret: 1, frets: [null, 1, 3, 2, null, null, 0], fingers: [null, 1, 3, 2, null, null, null], isIdiomaticForSamba: true, description: 'O clássico C7 de Dino 7 Cordas para preparar a resolução em Fá.' }
  ],
  'C_dominant7_13_7': [
    { name: 'C7(13) Choro & Samba 7 Cordas', baseFret: 1, frets: [null, 3, 3, 2, null, null, 0], fingers: [null, 3, 4, 1, null, null, null], isIdiomaticForSamba: true, description: 'Dominante de 13ª exuberante com o bordão em C2.' }
  ],
  'C_dominant7_b9_7': [
    { name: 'C7(b9) Choro 7 Cordas', baseFret: 1, frets: [null, 2, 3, 2, null, null, 0], fingers: [null, 1, 3, 2, null, null, null], isIdiomaticForSamba: true, description: 'Tensão máxima preparando Fm.' }
  ],
  'C_minor7_7': [
    { name: 'Cm7 Baixaria 7 Cordas', baseFret: 1, frets: [null, 1, 3, 1, null, null, 0], fingers: [null, 1, 3, 2, null, null, null], isIdiomaticForSamba: true }
  ],
  'C_major6_7': [
    { name: 'C6 Baixaria Dino (7ª em C2)', baseFret: 1, frets: [null, 1, 2, 2, null, null, 0], fingers: [null, 1, 3, 2, null, null, null], isIdiomaticForSamba: true, description: 'O acorde de repouso tradicional do violão de 7 cordas no samba antigo.' }
  ],
  'C_diminished7_7': [
    { name: 'Cº (dim7) 7 Cordas', baseFret: 1, frets: [null, 1, 2, 1, null, null, 0], fingers: [null, 1, 3, 2, null, null, null], isIdiomaticForSamba: true }
  ],

  // --- D (Ré) - 7 Cordas ---
  'D_major_triad_7': [
    { name: 'D Baixaria na 7ª corda (Casa 2)', baseFret: 1, frets: [2, 3, 2, 0, null, null, 2], fingers: [2, 4, 3, null, null, null, 1], isIdiomaticForSamba: true, description: 'Ré com a fundamental na 7ª corda (Ré2).' }
  ],
  'D_dominant7_7': [
    { name: 'D7 Baixaria 7ª Corda', baseFret: 1, frets: [null, 1, 2, 0, null, null, 2], fingers: [null, 1, 2, null, null, null, 3], isIdiomaticForSamba: true, description: 'D7 clássico com o baixo na 7ª corda.' }
  ],
  'D_minor7_7': [
    { name: 'Dm7 Baixaria 7ª Corda', baseFret: 1, frets: [1, 1, 2, 0, null, null, 2], fingers: [1, 1, 2, null, null, null, 3], isIdiomaticForSamba: true }
  ],
  'D_major6_7': [
    { name: 'D6 Baixaria 7ª Corda', baseFret: 1, frets: [null, 0, 2, 0, null, null, 2], fingers: [null, null, 1, null, null, null, 2], isIdiomaticForSamba: true }
  ],

  // --- E (Mi) - 7 Cordas ---
  'E_major_triad_7': [
    { name: 'E Baixaria na 7ª corda (Casa 4)', baseFret: 1, frets: [0, 0, 1, 2, 2, 0, 4], fingers: [null, null, 1, 3, 2, null, 4], isIdiomaticForSamba: true }
  ],
  'E_dominant7_7': [
    { name: 'E7 Baixaria 7ª Corda (Casa 4)', baseFret: 1, frets: [0, 0, 1, 0, 2, 0, 4], fingers: [null, null, 1, null, 2, null, 4], isIdiomaticForSamba: true }
  ],

  // --- F (Fá) - 7 Cordas ---
  'F_major_triad_7': [
    { name: 'F Baixaria na 7ª corda (Casa 5)', baseFret: 1, frets: [null, 1, 2, 3, null, null, 5], fingers: [null, 1, 2, 3, null, null, 4], isIdiomaticForSamba: true, description: 'Fá maior com o bordão de Fá na 7ª corda.' }
  ],
  'F_major7_7': [
    { name: 'F7M Baixaria 7ª Corda', baseFret: 1, frets: [null, 1, 2, 2, null, null, 5], fingers: [null, 1, 3, 2, null, null, 4], isIdiomaticForSamba: true }
  ],
  'F_major6_7': [
    { name: 'F6 Baixaria 7 Cordas', baseFret: 1, frets: [null, 1, 2, 0, null, null, 5], fingers: [null, 1, 2, null, null, null, 4], isIdiomaticForSamba: true, description: 'Cadência tradicional de Choro de Dino 7 Cordas.' }
  ],

  // --- G (Sol) - 7 Cordas ---
  'G_major_triad_7': [
    { name: 'G Baixaria na 7ª corda (Casa 7)', baseFret: 1, frets: [3, 0, 0, 0, 2, null, 7], fingers: [2, null, null, null, 1, null, 4], isIdiomaticForSamba: true },
    { name: 'G Tradicional 7 Cordas (7ª abafada)', baseFret: 1, frets: [3, 0, 0, 0, 2, 3, null], fingers: [4, null, null, null, 1, 2, null], isIdiomaticForSamba: true }
  ],
  'G_dominant7_7': [
    { name: 'G7 Baixaria 7 Cordas', baseFret: 1, frets: [1, 0, 0, 0, 2, null, 7], fingers: [1, null, null, null, 2, null, 4], isIdiomaticForSamba: true },
    { name: 'G7 Tradicional 7 Cordas', baseFret: 1, frets: [1, 0, 0, 0, 2, 3, null], fingers: [1, null, null, null, 2, 3, null], isIdiomaticForSamba: true }
  ],
  'G_dominant7_13_7': [
    { name: 'G7(13) 7 Cordas', baseFret: 3, frets: [null, 5, 4, 3, null, 3, null], fingers: [null, 4, 3, 2, null, 1, null], isIdiomaticForSamba: true }
  ],

  // --- A (Lá) - 7 Cordas ---
  'A_major_triad_7': [
    { name: 'A Tradicional 7 Cordas', baseFret: 1, frets: [0, 2, 2, 2, 0, null, null], fingers: [null, 3, 2, 1, null, null, null], isIdiomaticForSamba: true }
  ],
  'A_dominant7_7': [
    { name: 'A7 Tradicional 7 Cordas', baseFret: 1, frets: [0, 2, 0, 2, 0, null, null], fingers: [null, 2, null, 1, null, null, null], isIdiomaticForSamba: true }
  ],

  // --- B (Si) - 7 Cordas ---
  'B_half_diminished_7': [
    { name: 'Bm7(b5) 7 Cordas', baseFret: 2, frets: [null, 3, 2, 3, 2, null, null], fingers: [null, 3, 1, 4, 2, null, null], isIdiomaticForSamba: true }
  ]
};

/**
 * Consulta o Dicionário Fixo de Acordes para a tônica, fórmula e quantidade de cordas especificadas.
 * Faz resolução automática de notas enarmônicas (ex: Db -> C#, Eb -> D#, etc.).
 */
export function getFixedChordShapes(
  root: NoteName,
  formulaId: string,
  stringCount: StringCount
): ChordShape[] {
  const formula = CHORD_FORMULAS.find(f => f.id === formulaId);
  const suffix = formula?.suffix ?? '';

  // 1. Tenta consulta direta com o nome exato da nota
  let key = `${root}_${formulaId}_${stringCount}`;
  let defs = FIXED_CHORD_CATALOG[key];

  // 2. Se não encontrou, tenta com o enarmônico canônico correspondente
  if (!defs || defs.length === 0) {
    const canonicalRoot = ENHARMONIC_CANONICAL[root];
    if (canonicalRoot && canonicalRoot !== root) {
      key = `${canonicalRoot}_${formulaId}_${stringCount}`;
      defs = FIXED_CHORD_CATALOG[key];
    }
  }

  if (!defs || defs.length === 0) {
    return [];
  }

  return defs.map((def, idx) => ({
    id: `fixed_${root}_${formulaId}_${stringCount}_${idx}`,
    name: `${root}${suffix} - ${def.name}`,
    chordSymbol: `${root}${suffix}`,
    root,
    baseFret: def.baseFret,
    frets: def.frets,
    fingers: def.fingers,
    barres: def.barres,
    isIdiomaticForSamba: def.isIdiomaticForSamba,
    stringCount,
    description: def.description || formula?.description
  }));
}
