import { ChordFormula, ChordShape, NoteName, IntervalType, StringCount, StringTuning } from '../../types/music';
import { transposeNote, getNoteIndex, resolveTuning } from './fretboard';

export const CHORD_FORMULAS: ChordFormula[] = [
  // Tríades
  {
    id: 'major_triad',
    symbol: '',
    suffix: '',
    name: 'Maior (Tríade)',
    category: 'triad',
    intervals: [0, 4, 7],
    intervalNames: ['1', '3', '5'],
    description: 'Tríade maior fundamental formada por Tônica, 3ª Maior e 5ª Justa.'
  },
  {
    id: 'minor_triad',
    symbol: 'm',
    suffix: 'm',
    name: 'Menor (Tríade)',
    category: 'triad',
    intervals: [0, 3, 7],
    intervalNames: ['1', 'b3', '5'],
    description: 'Tríade menor formada por Tônica, 3ª Menor e 5ª Justa.'
  },
  {
    id: 'diminished_triad',
    symbol: 'dim',
    suffix: 'dim',
    name: 'Diminuta (Tríade)',
    category: 'triad',
    intervals: [0, 3, 6],
    intervalNames: ['1', 'b3', 'b5'],
    description: 'Tríade diminuta formada por Tônica, 3ª Menor e 5ª Diminuta.'
  },
  {
    id: 'augmented_triad',
    symbol: 'aug',
    suffix: 'aug',
    name: 'Aumentada (Tríade)',
    category: 'triad',
    intervals: [0, 4, 8],
    intervalNames: ['1', '3', '#5'],
    description: 'Tríade aumentada formada por Tônica, 3ª Maior e 5ª Aumentada.'
  },

  // Tétrades com 7M / 7+ (Sétima Maior)
  {
    id: 'major7',
    symbol: '7M',
    suffix: '7M',
    name: 'Maior com Sétima Maior (7M / 7+)',
    category: 'major7',
    intervals: [0, 4, 7, 11],
    intervalNames: ['1', '3', '5', '7'],
    description: 'Acorde brilhante e sofisticado de repouso tonal. Usado no I e IV graus maiores.'
  },
  {
    id: 'minor_major7',
    symbol: 'm(7M)',
    suffix: 'm(7M)',
    name: 'Menor com Sétima Maior',
    category: 'major7',
    intervals: [0, 3, 7, 11],
    intervalNames: ['1', 'b3', '5', '7'],
    description: 'Acorde enigmático da Menor Harmônica e Menor Melódica. Muito presente em Choro e Jazz.'
  },
  {
    id: 'major7_9',
    symbol: '7M(9)',
    suffix: '7M(9)',
    name: 'Maior com 7M e 9ª',
    category: 'major7',
    intervals: [0, 4, 7, 11, 14],
    intervalNames: ['1', '3', '5', '7', '9'],
    description: 'Acorde exuberante e aveludado, símbolo da Bossa Nova e do Samba-Canção.'
  },

  // Tétrades com 7 dominante
  {
    id: 'dominant7',
    symbol: '7',
    suffix: '7',
    name: 'Dominante (7)',
    category: 'seventh',
    intervals: [0, 4, 7, 10],
    intervalNames: ['1', '3', '5', 'b7'],
    description: 'Contém o trítono clássico (entre 3ª maior e 7ª menor). Pede resolução no I grau.'
  },
  {
    id: 'dominant7_9',
    symbol: '7(9)',
    suffix: '7(9)',
    name: 'Dominante com 9ª',
    category: 'seventh',
    intervals: [0, 4, 10, 14],
    intervalNames: ['1', '3', 'b7', '9'],
    description: 'Dominante suave com a nona maior, shape super elegante no violão sem a 5ª.'
  },
  {
    id: 'dominant7_13',
    symbol: '7(13)',
    suffix: '7(13)',
    name: 'Dominante com 13ª',
    category: 'seventh',
    intervals: [0, 4, 10, 21],
    intervalNames: ['1', '3', 'b7', '13'],
    description: 'O acorde mestre das cadências de Samba, Choro e Bossa Nova.'
  },

  // Tétrades Menores (m7)
  {
    id: 'minor7',
    symbol: 'm7',
    suffix: 'm7',
    name: 'Menor com Sétima (m7)',
    category: 'minor7',
    intervals: [0, 3, 7, 10],
    intervalNames: ['1', 'b3', '5', 'b7'],
    description: 'Tétrada suave de repouso menor ou função subdominante (IIm7).'
  },
  {
    id: 'minor7_9',
    symbol: 'm7(9)',
    suffix: 'm7(9)',
    name: 'Menor com 7ª e 9ª (m7(9))',
    category: 'minor7',
    intervals: [0, 3, 10, 14],
    intervalNames: ['1', 'b3', 'b7', '9'],
    description: 'Clássico voicing de violão para o II grau em cadências II-V-I.'
  },

  // Meio-diminuto (m7b5 - Quinta diminuta)
  {
    id: 'half_diminished',
    symbol: 'm7(b5)',
    suffix: 'm7(b5)',
    name: 'Meio-Diminuto / 5ª Diminuta (m7b5 / ø)',
    category: 'half_dim',
    intervals: [0, 3, 6, 10],
    intervalNames: ['1', 'b3', 'b5', 'b7'],
    description: 'Tétrada com 5ª diminuta e 7ª menor. O II grau do campo harmônico menor (IIm7b5).'
  },

  // Diminuto Pleno (dim7 - Sétima diminuta)
  {
    id: 'diminished7',
    symbol: 'dim7',
    suffix: 'º',
    name: 'Diminuto Pleno (dim7 / º)',
    category: 'diminished',
    intervals: [0, 3, 6, 9],
    intervalNames: ['1', 'b3', 'b5', 'bb7'],
    description: 'Acorde 100% simétrico formado por sobreposição de terças menores (3 semitons). Crucial no Choro para passagem harmônica.'
  },

  // Acordes Alterados para Samba & Choro
  {
    id: 'dominant7_b9',
    symbol: '7(b9)',
    suffix: '7(b9)',
    name: 'Dominante com 9ª Menor (7(b9))',
    category: 'altered',
    intervals: [0, 4, 10, 13],
    intervalNames: ['1', '3', 'b7', 'b9'],
    description: 'O acorde dominante que prepara acordes menores no Choro e Samba com máxima tensão.'
  },
  {
    id: 'dominant7_sharp9',
    symbol: '7(#9)',
    suffix: '7(#9)',
    name: 'Dominante com 9ª Aumentada (7(#9))',
    category: 'altered',
    intervals: [0, 4, 10, 15],
    intervalNames: ['1', '3', 'b7', '#9'],
    description: 'O acorde de blues/jazz que combina 3ª maior com a sonoridade de 3ª menor blues (#9).'
  },
  {
    id: 'dominant7_b13',
    symbol: '7(b13)',
    suffix: '7(b13)',
    name: 'Dominante com 13ª Menor (7(b13))',
    category: 'altered',
    intervals: [0, 4, 10, 20],
    intervalNames: ['1', '3', 'b7', 'b13'],
    description: 'Tensão lírica e emotiva, muito usada na cadência V7(b13) -> Im.'
  },
  {
    id: 'major6',
    symbol: '6',
    suffix: '6',
    name: 'Maior com Sexta (6)',
    category: 'extended',
    intervals: [0, 4, 7, 9],
    intervalNames: ['1', '3', '5', '6'],
    description: 'Acorde de repouso tradicional do Samba antigo e Choro tradicional (ex: F6, C6).'
  }
];

export function getChordNotes(root: NoteName, formula: ChordFormula): NoteName[] {
  return formula.intervals.map(semitones => transposeNote(root, semitones % 12));
}

// Modelagem algorítmica de shapes de acordes (suporta 4, 6 e 7 cordas)
// Cada shape define uma posição base transponível com a casa inicial calculada dinamicamente
export interface TransposableShape {
  id: string;
  name: string;
  formulaId: string;
  stringCount?: StringCount; // 4, 6 ou 7 cordas (padrão 6)
  rootString: number; // Índice da corda onde a tônica se encontra no array frets
  rootOffsetInShape: number; // quantos semitons a tônica está da baseFret
  fretOffsets: (number | null)[]; // offsets de cada corda (da 1ª corda até a mais grave)
  fingers: (number | null)[];
  isIdiomaticForSamba?: boolean;
}

export const TRANSPOSABLE_SHAPES: TransposableShape[] = [
  // ==========================================
  // SHAPES PARA 6 CORDAS (VIOLÃO PADRÃO)
  // [1ª corda E, 2ª B, 3ª G, 4ª D, 5ª A, 6ª E]
  // ==========================================

  // --- Tríades Maiores (6 cordas) ---
  {
    id: 'maj_triad_root6',
    name: 'Forma de Mi (Baixo na 6ª corda)',
    formulaId: 'major_triad',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [0, 0, 1, 2, 2, 0], // ex: F em 1ª casa: 1-3-3-2-1-1
    fingers: [1, 1, 2, 4, 3, 1],
    isIdiomaticForSamba: false
  },
  {
    id: 'maj_triad_root5',
    name: 'Forma de Lá (Baixo na 5ª corda)',
    formulaId: 'major_triad',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [0, 2, 2, 2, 0, null], // ex: C em 3ª casa: X-3-5-5-5-3
    fingers: [1, 4, 3, 2, 1, null],
    isIdiomaticForSamba: true
  },

  // --- Tríades Menores (6 cordas) ---
  {
    id: 'min_triad_root6',
    name: 'Forma de Mi Menor (Baixo na 6ª corda)',
    formulaId: 'minor_triad',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [0, 0, 0, 2, 2, 0], // ex: Fm em 1ª casa: 1-3-3-1-1-1
    fingers: [1, 1, 1, 4, 3, 1],
    isIdiomaticForSamba: false
  },
  {
    id: 'min_triad_root5',
    name: 'Forma de Lá Menor (Baixo na 5ª corda)',
    formulaId: 'minor_triad',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [0, 1, 2, 2, 0, null], // ex: Dm em 5ª casa: X-5-7-7-6-5
    fingers: [1, 2, 4, 3, 1, null],
    isIdiomaticForSamba: true
  },

  // --- Tríades Diminuta e Aumentada (6 cordas) ---
  {
    id: 'dim_triad_root5',
    name: 'Shape Tríade Diminuta (Baixo na 5ª corda)',
    formulaId: 'diminished_triad',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, -1, 1, 0, null],
    fingers: [null, 3, 1, 4, 2, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'aug_triad_root5',
    name: 'Shape Tríade Aumentada (Baixo na 5ª corda)',
    formulaId: 'augmented_triad',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 1, 2, 0, null],
    fingers: [null, 3, 2, 4, 1, null],
    isIdiomaticForSamba: true
  },

  // --- 7M / 7+ (6 cordas) ---
  {
    id: 'maj7_root6',
    name: 'Shape 7M (Baixo na 6ª corda)',
    formulaId: 'major7',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, 0, 1, 1, null, 0], // ex: F7M: 1-X-2-2-1-X
    fingers: [null, 2, 4, 3, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj7_root5',
    name: 'Shape 7M (Baixo na 5ª corda - Forma de A)',
    formulaId: 'major7',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [0, 2, 1, 2, 0, null], // ex: C7M: X-3-5-4-5-3
    fingers: [1, 3, 2, 4, 1, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj7_9_root5',
    name: 'Shape 7M(9) (Baixo na 5ª corda - Voicing Bossa/Samba)',
    formulaId: 'major7_9',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 1, 1, 0, null], // ex: C7M(9): X-3-2-2-3-X
    fingers: [null, 3, 2, 1, 1, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'm_maj7_root5',
    name: 'Shape m(7M) (Baixo na 5ª corda)',
    formulaId: 'minor_major7',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [0, 1, 1, 2, 0, null],
    fingers: [1, 2, 3, 4, 1, null],
    isIdiomaticForSamba: true
  },

  // --- 7 Dominante (6 cordas) ---
  {
    id: 'dom7_root6',
    name: 'Shape 7 (Baixo na 6ª corda - Tradicional Choro/Samba)',
    formulaId: 'dominant7',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, null, 0, 0, null, 0], // 1-X-1-2-X-X
    fingers: [null, null, 2, 1, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_full_root6',
    name: 'Shape 7 Pestana (Baixo na 6ª corda)',
    formulaId: 'dominant7',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [0, 0, 1, 0, 2, 0], // 1-3-1-2-1-1
    fingers: [1, 1, 2, 1, 3, 1],
    isIdiomaticForSamba: false
  },
  {
    id: 'dom7_root5',
    name: 'Shape 7 (Baixo na 5ª corda)',
    formulaId: 'dominant7',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 0, 2, 0, null], // X-3-2-3-1-X
    fingers: [null, 3, 1, 4, 2, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_13_root6',
    name: 'Shape 7(13) (Baixo na 6ª corda - Clássico Samba & Choro)',
    formulaId: 'dominant7_13',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 1, 0, null, 0], // G7(13): 3-X-3-4-5-X
    fingers: [null, 4, 3, 2, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_9_root5',
    name: 'Shape 7(9) (Baixo na 5ª corda)',
    formulaId: 'dominant7_9',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 2, 1, 0, null], // C7(9): X-3-2-3-3-X
    fingers: [null, 3, 4, 2, 1, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_b9_root6',
    name: 'Shape 7(b9) (Baixo na 6ª corda - Resolução Menor Choro)',
    formulaId: 'dominant7_b9',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, null, 1, 0, null, 0],
    fingers: [null, null, 3, 2, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_sharp9_root5',
    name: 'Shape 7(#9) (Baixo na 5ª corda)',
    formulaId: 'dominant7_sharp9',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 3, 0, 1, 0, null],
    fingers: [null, 4, 1, 2, 1, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_b13_root6',
    name: 'Shape 7(b13) (Baixo na 6ª corda)',
    formulaId: 'dominant7_b13',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 1, 0, null, 0],
    fingers: [null, 3, 2, 1, null, 1],
    isIdiomaticForSamba: true
  },

  // --- Menor com 7 (m7) (6 cordas) ---
  {
    id: 'm7_root6',
    name: 'Shape m7 (Baixo na 6ª corda - Samba/Choro sem 5ª)',
    formulaId: 'minor7',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, 0, 0, 0, null, 0], // Gm7: 3-X-3-3-3-X
    fingers: [null, 1, 1, 1, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7_root5',
    name: 'Shape m7 (Baixo na 5ª corda)',
    formulaId: 'minor7',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [0, 1, 0, 2, 0, null], // Dm7: X-5-7-5-6-5
    fingers: [1, 2, 1, 3, 1, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7_9_root5',
    name: 'Shape m7(9) (Baixo na 5ª corda)',
    formulaId: 'minor7_9',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 2, 0, 0, null], // Dm7(9): X-5-3-5-5-X
    fingers: [null, 3, 4, 1, 2, null],
    isIdiomaticForSamba: true
  },

  // --- Meio-Diminuto (m7b5) (6 cordas) ---
  {
    id: 'm7b5_root6',
    name: 'Shape m7(b5) (Baixo na 6ª corda)',
    formulaId: 'half_diminished',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, null, 0, 0, null, 0],
    fingers: [null, null, 2, 1, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7b5_root5',
    name: 'Shape m7(b5) (Baixo na 5ª corda - Forma clássica)',
    formulaId: 'half_diminished',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 0, 1, 0, null], // Bm7(b5): X-2-3-2-3-X
    fingers: [null, 3, 1, 2, 1, null],
    isIdiomaticForSamba: true
  },

  // --- Diminuto Pleno (dim7 / º) (6 cordas) ---
  {
    id: 'dim7_root5',
    name: 'Shape Diminuto º (Baixo na 5ª corda)',
    formulaId: 'diminished7',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, -1, 1, 0, null], // F#º: X-4-5-3-5-X
    fingers: [null, 3, 1, 4, 2, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'dim7_root6',
    name: 'Shape Diminuto º (Baixo na 6ª corda)',
    formulaId: 'diminished7',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 2, 1, null, 0], // G#º: 4-X-3-4-3-X
    fingers: [null, 3, 4, 2, null, 1],
    isIdiomaticForSamba: true
  },

  // --- Maior com 6ª (6) (6 cordas) ---
  {
    id: 'maj6_root6',
    name: 'Shape 6 (Baixo na 6ª corda - Samba Antigo)',
    formulaId: 'major6',
    stringCount: 6,
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, null, 1, 1, null, 0], // F6: 1-X-0-2-1-X
    fingers: [null, null, 2, 1, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj6_root5',
    name: 'Shape 6 (Baixo na 5ª corda)',
    formulaId: 'major6',
    stringCount: 6,
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 2, 2, 0, null],
    fingers: [null, 3, 3, 3, 1, null],
    isIdiomaticForSamba: true
  },

  // ==========================================
  // SHAPES PARA 4 CORDAS (CAVAQUINHO / 4 CORDAS)
  // [1ª corda D, 2ª B, 3ª G, 4ª D]
  // ==========================================

  // --- Tríades Maiores (4 cordas) ---
  {
    id: 'maj_triad_4str_p',
    name: 'Shape Maior Pestana (Tônica na 3ª corda)',
    formulaId: 'major_triad',
    stringCount: 4,
    rootString: 2, // 3ª corda (Sol no Cavaquinho)
    rootOffsetInShape: 0,
    fretOffsets: [0, 0, 0, 0], // Pestana completa
    fingers: [1, 1, 1, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj_triad_4str_d',
    name: 'Shape Maior Aberto (Tônica na 4ª corda)',
    formulaId: 'major_triad',
    stringCount: 4,
    rootString: 3, // 4ª corda (Ré no Cavaquinho)
    rootOffsetInShape: 0,
    fretOffsets: [4, 3, 2, 0], // ex: D maior: 0-2-3-4
    fingers: [4, 3, 2, 1],
    isIdiomaticForSamba: true
  },

  // --- Tríades Menores (4 cordas) ---
  {
    id: 'min_triad_4str_p',
    name: 'Shape Menor Pestana (Tônica na 3ª corda)',
    formulaId: 'minor_triad',
    stringCount: 4,
    rootString: 2,
    rootOffsetInShape: 0,
    fretOffsets: [0, -1, 0, 0], // ex: Cm: 5-4-5-5
    fingers: [3, 1, 2, 4],
    isIdiomaticForSamba: true
  },
  {
    id: 'min_triad_4str_d',
    name: 'Shape Menor Aberto (Tônica na 4ª corda)',
    formulaId: 'minor_triad',
    stringCount: 4,
    rootString: 3,
    rootOffsetInShape: 0,
    fretOffsets: [3, 3, 2, 0], // ex: Dm: 0-2-3-3
    fingers: [3, 4, 2, 1],
    isIdiomaticForSamba: true
  },

  // --- Tríades Diminuta e Aumentada (4 cordas) ---
  {
    id: 'dim_triad_4str',
    name: 'Shape Tríade Diminuta (4 cordas)',
    formulaId: 'diminished_triad',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [3, 0, 1, 0],
    fingers: [3, 1, 2, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'aug_triad_4str',
    name: 'Shape Tríade Aumentada (4 cordas)',
    formulaId: 'augmented_triad',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 0, 0, 1],
    fingers: [2, 1, 1, 3],
    isIdiomaticForSamba: true
  },

  // --- 7M (4 cordas) ---
  {
    id: 'maj7_4str_r3',
    name: 'Shape 7M (Tônica na 3ª corda)',
    formulaId: 'major7',
    stringCount: 4,
    rootString: 2,
    rootOffsetInShape: 0,
    fretOffsets: [4, 0, 0, 4], // ex: G7M: 4-0-0-4
    fingers: [3, 1, 1, 4],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj7_4str_r4',
    name: 'Shape 7M (Tônica na 4ª corda)',
    formulaId: 'major7',
    stringCount: 4,
    rootString: 3,
    rootOffsetInShape: 0,
    fretOffsets: [4, 2, 2, 0], // ex: D7M: 0-2-2-4
    fingers: [4, 2, 3, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj7_4str_r2',
    name: 'Shape 7M (Tônica na 2ª corda)',
    formulaId: 'major7',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 0, 3, 1], // ex: C7M: 1-3-0-1
    fingers: [2, 1, 4, 2],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj7_9_4str',
    name: 'Shape 7M(9) (4 cordas - Bossa/Choro)',
    formulaId: 'major7_9',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 2, 3, 1],
    fingers: [1, 2, 4, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'm_maj7_4str',
    name: 'Shape m(7M) (4 cordas)',
    formulaId: 'minor_major7',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [0, 0, 3, 0],
    fingers: [1, 1, 4, 1],
    isIdiomaticForSamba: true
  },

  // --- 7 Dominante (4 cordas) ---
  {
    id: 'dom7_4str_r4',
    name: 'Shape 7 (Tônica na 4ª corda)',
    formulaId: 'dominant7',
    stringCount: 4,
    rootString: 3,
    rootOffsetInShape: 0,
    fretOffsets: [4, 1, 2, 0], // ex: D7: 0-2-1-4
    fingers: [4, 1, 2, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_4str_r3',
    name: 'Shape 7 (Tônica na 3ª corda)',
    formulaId: 'dominant7',
    stringCount: 4,
    rootString: 2,
    rootOffsetInShape: 0,
    fretOffsets: [3, 0, 0, 3], // ex: G7: 3-0-0-3
    fingers: [3, 1, 1, 4],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_4str_r2',
    name: 'Shape 7 (Tônica na 2ª corda)',
    formulaId: 'dominant7',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 0, 2, 1], // ex: C7: 1-2-0-1
    fingers: [2, 1, 3, 2],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_13_4str',
    name: 'Shape 7(13) (Samba & Choro - 4 cordas)',
    formulaId: 'dominant7_13',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 2, 2, 1],
    fingers: [1, 3, 4, 2],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_9_4str',
    name: 'Shape 7(9) (4 cordas)',
    formulaId: 'dominant7_9',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [2, 3, 3, 2],
    fingers: [1, 3, 4, 2],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_b9_4str',
    name: 'Shape 7(b9) (4 cordas - Tensão de Samba)',
    formulaId: 'dominant7_b9',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 2, 1, 2],
    fingers: [1, 3, 2, 4],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_sharp9_4str',
    name: 'Shape 7(#9) (4 cordas)',
    formulaId: 'dominant7_sharp9',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 3, 2, 1],
    fingers: [1, 4, 3, 2],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_b13_4str',
    name: 'Shape 7(b13) (4 cordas)',
    formulaId: 'dominant7_b13',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 1, 2, 1],
    fingers: [1, 2, 4, 3],
    isIdiomaticForSamba: true
  },

  // --- Menor com 7 (m7) (4 cordas) ---
  {
    id: 'm7_4str_r4',
    name: 'Shape m7 (Tônica na 4ª corda)',
    formulaId: 'minor7',
    stringCount: 4,
    rootString: 3,
    rootOffsetInShape: 0,
    fretOffsets: [3, 1, 2, 0], // ex: Dm7: 0-2-1-3
    fingers: [3, 1, 2, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7_4str_r3',
    name: 'Shape m7 (Tônica na 3ª corda)',
    formulaId: 'minor7',
    stringCount: 4,
    rootString: 2,
    rootOffsetInShape: 0,
    fretOffsets: [3, -1, 0, 3], // ex: Gm7: 3-0-1-3
    fingers: [3, 1, 2, 4],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7_4str_r2',
    name: 'Shape m7 (Tônica na 2ª corda)',
    formulaId: 'minor7',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [0, 0, 2, 0], // ex: Cm7: 0-2-0-0
    fingers: [1, 1, 3, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7_9_4str',
    name: 'Shape m7(9) (4 cordas)',
    formulaId: 'minor7_9',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [0, 2, 2, 0],
    fingers: [1, 3, 4, 1],
    isIdiomaticForSamba: true
  },

  // --- Meio-Diminuto (m7b5) (4 cordas) ---
  {
    id: 'half_dim_4str',
    name: 'Shape m7(b5) Clássico (4 cordas)',
    formulaId: 'half_diminished',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [3, 0, 2, 0], // ex: Bm7(b5): 0-2-0-3
    fingers: [3, 1, 2, 1],
    isIdiomaticForSamba: true
  },

  // --- Diminuto Pleno (dim7 / º) (4 cordas) ---
  {
    id: 'dim7_4str',
    name: 'Shape Diminuto Simétrico º (4 cordas)',
    formulaId: 'diminished7',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 0, 1, 0], // ex: 0-1-0-1
    fingers: [2, 1, 3, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dim7_4str_alt',
    name: 'Shape Diminuto Alternativo º (4 cordas)',
    formulaId: 'diminished7',
    stringCount: 4,
    rootString: 0,
    rootOffsetInShape: 0,
    fretOffsets: [0, 1, 0, 1],
    fingers: [1, 3, 2, 4],
    isIdiomaticForSamba: true
  },

  // --- Maior com 6ª (6) (4 cordas) ---
  {
    id: 'maj6_4str',
    name: 'Shape 6 Samba Tradicional (4 cordas)',
    formulaId: 'major6',
    stringCount: 4,
    rootString: 1,
    rootOffsetInShape: 0,
    fretOffsets: [1, 0, 1, 1],
    fingers: [1, 1, 2, 3],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj6_4str_alt',
    name: 'Shape 6 Aberto (4 cordas)',
    formulaId: 'major6',
    stringCount: 4,
    rootString: 2,
    rootOffsetInShape: 0,
    fretOffsets: [2, 0, 0, 0],
    fingers: [2, 1, 1, 1],
    isIdiomaticForSamba: true
  },

  // ==========================================
  // SHAPES PARA 7 CORDAS (VIOLÃO DE 7 CORDAS DE CHORO)
  // [1ª corda E, 2ª B, 3ª G, 4ª D, 5ª A, 6ª E, 7ª C]
  // ==========================================

  // --- Baixaria na 7ª corda (Corda 6) ---
  {
    id: 'maj_triad_root7',
    name: 'Shape Maior (Baixaria na 7ª corda)',
    formulaId: 'major_triad',
    stringCount: 7,
    rootString: 6, // 7ª corda
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 2, 2, null, null, 0],
    fingers: [null, 2, 4, 3, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'min_triad_root7',
    name: 'Shape Menor (Baixaria na 7ª corda)',
    formulaId: 'minor_triad',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 1, 2, null, null, 0],
    fingers: [null, 2, 3, 4, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj7_root7',
    name: 'Shape 7M (Baixaria na 7ª corda - Violão 7 Cordas)',
    formulaId: 'major7',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 0, 2, 2, null, null, 0],
    fingers: [null, 1, 3, 2, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_root7',
    name: 'Shape 7 (Baixaria na 7ª corda - Violão 7 Cordas)',
    formulaId: 'dominant7',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 2, 1, null, null, 0],
    fingers: [null, 2, 3, 1, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_13_root7',
    name: 'Shape 7(13) (Baixaria na 7ª corda - Samba & Choro)',
    formulaId: 'dominant7_13',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 3, 2, 1, null, null, 0],
    fingers: [null, 4, 3, 2, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_b9_root7',
    name: 'Shape 7(b9) (Baixaria na 7ª corda - Resolução Choro)',
    formulaId: 'dominant7_b9',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 2, 1, null, null, 0],
    fingers: [null, 3, 4, 2, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_b13_root7',
    name: 'Shape 7(b13) (Baixaria na 7ª corda)',
    formulaId: 'dominant7_b13',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 2, 1, null, null, 0],
    fingers: [null, 2, 3, 1, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7_root7',
    name: 'Shape m7 (Baixaria na 7ª corda - Violão 7 Cordas)',
    formulaId: 'minor7',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 1, 1, null, null, 0],
    fingers: [null, 2, 3, 4, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'half_dim_root7',
    name: 'Shape m7(b5) (Baixaria na 7ª corda)',
    formulaId: 'half_diminished',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 0, 1, 1, null, null, 0],
    fingers: [null, 1, 2, 3, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dim7_root7',
    name: 'Shape Diminuto º (Baixaria na 7ª corda - Choro)',
    formulaId: 'diminished7',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 0, 1, 0, null, null, 0],
    fingers: [null, 1, 3, 2, null, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj6_root7',
    name: 'Shape 6 (Baixaria na 7ª corda - Samba Antigo)',
    formulaId: 'major6',
    stringCount: 7,
    rootString: 6,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 2, 0, null, null, 0],
    fingers: [null, 2, 3, 1, null, null, 1],
    isIdiomaticForSamba: true
  }
];

// Calcula a casa onde a tônica se encontra na corda indicada
export function findRootFretOnString(
  root: NoteName, 
  stringIndex: number, 
  stringCountOrTuning: StringCount | StringTuning[] = 6
): number {
  const tuning = resolveTuning(stringCountOrTuning);
  const stringInfo = tuning[stringIndex] || tuning[0];
  const openNote = stringInfo.openNote;
  const openIdx = getNoteIndex(openNote);
  const rootIdx = getNoteIndex(root);
  const diff = (rootIdx - openIdx + 12) % 12;
  return diff;
}

// Adapta qualquer shape para a contagem de cordas solicitada
export function adaptShapeToStringCount(shape: ChordShape, targetCount: StringCount): ChordShape {
  if (shape.frets.length === targetCount) {
    return { ...shape, stringCount: targetCount };
  }
  if (targetCount === 4) {
    return {
      ...shape,
      stringCount: 4,
      frets: shape.frets.slice(0, 4),
      fingers: shape.fingers ? shape.fingers.slice(0, 4) : [null, null, null, null]
    };
  }
  if (targetCount === 7) {
    const diff = 7 - shape.frets.length;
    const addedNulls = Array(diff > 0 ? diff : 0).fill(null);
    return {
      ...shape,
      stringCount: 7,
      frets: [...shape.frets, ...addedNulls],
      fingers: [...(shape.fingers || []), ...addedNulls]
    };
  }
  // targetCount === 6
  if (shape.frets.length === 4) {
    return {
      ...shape,
      stringCount: 6,
      frets: [...shape.frets, null, null],
      fingers: [...(shape.fingers || []), null, null]
    };
  }
  return {
    ...shape,
    stringCount: 6,
    frets: shape.frets.slice(0, 6),
    fingers: shape.fingers ? shape.fingers.slice(0, 6) : [null, null, null, null, null, null]
  };
}

export function generateShapesForChord(
  root: NoteName, 
  formulaId: string, 
  stringCountOrTuning: StringCount | StringTuning[] = 6
): ChordShape[] {
  const formula = CHORD_FORMULAS.find(f => f.id === formulaId);
  if (!formula) return [];

  const targetStringCount: StringCount = Array.isArray(stringCountOrTuning)
    ? (stringCountOrTuning.length as StringCount)
    : stringCountOrTuning;

  // 1. Shapes especificamente modelados para a contagem de cordas selecionada
  let matchedTransposables = TRANSPOSABLE_SHAPES.filter(
    t => t.formulaId === formulaId && (t.stringCount ?? 6) === targetStringCount
  );

  // 2. Se o usuário estiver no Violão de 7 cordas, também inclui todos os shapes tradicionais
  // de 6 cordas adaptados para 7 cordas (com a 7ª corda abafada/null no bordão grave)
  if (targetStringCount === 7) {
    const sixStringTransposables = TRANSPOSABLE_SHAPES.filter(
      t => t.formulaId === formulaId && (t.stringCount ?? 6) === 6
    );
    for (const t of sixStringTransposables) {
      matchedTransposables.push({
        ...t,
        id: `${t.id}_7str`,
        name: `${t.name} (7ª corda abafada)`,
        stringCount: 7,
        fretOffsets: [...t.fretOffsets, null],
        fingers: [...t.fingers, null]
      });
    }
  }

  // 3. Fallback: se por algum motivo não houver shape específico para 4 cordas na fórmula,
  // adapta os shapes de 6 cordas extraindo as 4 primeiras cordas
  if (targetStringCount === 4 && matchedTransposables.length === 0) {
    const sixStringTransposables = TRANSPOSABLE_SHAPES.filter(
      t => t.formulaId === formulaId && (t.stringCount ?? 6) === 6
    );
    for (const t of sixStringTransposables) {
      matchedTransposables.push({
        ...t,
        id: `${t.id}_4str`,
        name: `${t.name} (4 cordas)`,
        stringCount: 4,
        rootString: Math.min(t.rootString, 3),
        fretOffsets: t.fretOffsets.slice(0, 4),
        fingers: t.fingers.slice(0, 4)
      });
    }
  }

  const shapes: ChordShape[] = [];

  for (const trans of matchedTransposables) {
    const rootFret = findRootFretOnString(root, trans.rootString, targetStringCount);
    const validOffsets = trans.fretOffsets.filter((o): o is number => o !== null);
    const minOffset = validOffsets.length > 0 ? Math.min(...validOffsets) : 0;
    let effectiveRootFret = rootFret;
    if (effectiveRootFret + minOffset < 0) {
      effectiveRootFret += 12;
    }

    const frets = trans.fretOffsets.map((offset) => {
      if (offset === null) return null;
      let calculatedFret = effectiveRootFret + offset;
      if (calculatedFret < 0) calculatedFret += 12;
      return calculatedFret;
    });

    const nonZeroFrets = frets.filter((f): f is number => f !== null && f > 0);
    const minFret = nonZeroFrets.length > 0 ? Math.min(...nonZeroFrets) : 1;

    shapes.push({
      id: `${trans.id}_${root}`,
      name: `${root}${formula.suffix} - ${trans.name}`,
      chordSymbol: `${root}${formula.suffix}`,
      root,
      baseFret: minFret > 0 && isFinite(minFret) ? minFret : 1,
      frets,
      fingers: trans.fingers,
      isIdiomaticForSamba: trans.isIdiomaticForSamba,
      stringCount: targetStringCount,
      description: formula.description
    });
  }

  return shapes;
}
