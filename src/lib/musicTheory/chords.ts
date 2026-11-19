import { ChordFormula, ChordShape, NoteName, IntervalType } from '../../types/music';
import { transposeNote, getNoteIndex } from './fretboard';

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

// Modelagem algorítmica de shapes de violão (6 cordas: E A D G B E)
// Cada shape define uma posição base transponível com a casa inicial calculada dinamicamente
export interface TransposableShape {
  id: string;
  name: string;
  formulaId: string;
  rootString: number; // 0 = 6ª corda (E), 1 = 5ª corda (A), 2 = 4ª corda (D) (no formato tab: string 6 é index 5)
  rootOffsetInShape: number; // quantos semitons a tônica está da baseFret
  fretOffsets: (number | null)[]; // offsets de cada corda (1ª a 6ª corda: E, B, G, D, A, E)
  fingers: (number | null)[];
  isIdiomaticForSamba?: boolean;
}

export const TRANSPOSABLE_SHAPES: TransposableShape[] = [
  // --- 7M / 7+ ---
  {
    id: 'maj7_root6',
    name: 'Shape 7M (Baixo na 6ª corda)',
    formulaId: 'major7',
    rootString: 5, // 6ª corda
    rootOffsetInShape: 0,
    // [1ª corda, 2ª, 3ª, 4ª, 5ª, 6ª corda]
    fretOffsets: [null, 0, 1, 1, null, 0], // ex: 1X221X (F7M em 1ª casa: 1-X-2-2-1-X)
    fingers: [null, 2, 4, 3, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj7_root5',
    name: 'Shape 7M (Baixo na 5ª corda - Forma de A)',
    formulaId: 'major7',
    rootString: 4, // 5ª corda
    rootOffsetInShape: 0,
    fretOffsets: [0, 2, 1, 2, 0, null], // ex: X35453
    fingers: [1, 3, 2, 4, 1, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj7_9_root5',
    name: 'Shape 7M(9) (Baixo na 5ª corda - Voicing Bossa/Samba)',
    formulaId: 'major7_9',
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 1, 1, 0, null], // ex: X-3-2-2-3-X
    fingers: [null, 3, 2, 1, 1, null],
    isIdiomaticForSamba: true
  },

  // --- 7 Dominante ---
  {
    id: 'dom7_root6',
    name: 'Shape 7 (Baixo na 6ª corda - Tradicional Choro/Samba)',
    formulaId: 'dominant7',
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, null, 0, 0, null, 0], // Simplificado ou tétrade completa: 1-X-1-2-X-X
    fingers: [null, null, 2, 1, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_full_root6',
    name: 'Shape 7 Pestana (Baixo na 6ª corda)',
    formulaId: 'dominant7',
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [0, 0, 1, 0, 2, 0], // ex: 131211
    fingers: [1, 1, 2, 1, 3, 1],
    isIdiomaticForSamba: false
  },
  {
    id: 'dom7_root5',
    name: 'Shape 7 (Baixo na 5ª corda)',
    formulaId: 'dominant7',
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 0, 2, 0, null], // ex: X-3-2-3-1-X
    fingers: [null, 3, 1, 4, 2, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_13_root6',
    name: 'Shape 7(13) (Baixo na 6ª corda - Clássico Samba & Choro)',
    formulaId: 'dominant7_13',
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 1, 0, null, 0], // ex: G7(13): 3-X-3-4-5-X
    fingers: [null, 4, 3, 2, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_9_root5',
    name: 'Shape 7(9) (Baixo na 5ª corda)',
    formulaId: 'dominant7_9',
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 2, 1, 0, null], // ex: C7(9): X-3-2-3-3-X
    fingers: [null, 3, 4, 2, 1, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_b9_root6',
    name: 'Shape 7(b9) (Baixo na 6ª corda - Resolução Menor Choro)',
    formulaId: 'dominant7_b9',
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, null, 1, 0, null, 0], // ex: A7(b9): 5-X-5-6-X-X
    fingers: [null, null, 3, 2, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'dom7_b13_root6',
    name: 'Shape 7(b13) (Baixo na 6ª corda)',
    formulaId: 'dominant7_b13',
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 1, 0, null, 0],
    fingers: [null, 3, 2, 1, null, 1],
    isIdiomaticForSamba: true
  },

  // --- Menor com 7 (m7) ---
  {
    id: 'm7_root6',
    name: 'Shape m7 (Baixo na 6ª corda - Samba/Choro sem 5ª)',
    formulaId: 'minor7',
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, 0, 0, 0, null, 0], // ex: Gm7: 3-X-3-3-3-X
    fingers: [null, 1, 1, 1, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7_root5',
    name: 'Shape m7 (Baixo na 5ª corda)',
    formulaId: 'minor7',
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [0, 1, 0, 2, 0, null], // ex: Dm7: X-5-7-5-6-5
    fingers: [1, 2, 1, 3, 1, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7_9_root5',
    name: 'Shape m7(9) (Baixo na 5ª corda)',
    formulaId: 'minor7_9',
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 2, 0, 0, null], // ex: Dm7(9): X-5-3-5-5-X
    fingers: [null, 3, 4, 1, 2, null],
    isIdiomaticForSamba: true
  },

  // --- Meio-Diminuto (m7b5 - 5ª diminuta) ---
  {
    id: 'm7b5_root6',
    name: 'Shape m7(b5) (Baixo na 6ª corda)',
    formulaId: 'half_diminished',
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, null, 0, 0, null, 0], // Voicing tradicional: 1-X-1-1-X-X ou com 5ª
    fingers: [null, null, 2, 1, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'm7b5_root5',
    name: 'Shape m7(b5) (Baixo na 5ª corda - Forma clássica de violão)',
    formulaId: 'half_diminished',
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 0, 1, 0, null], // ex: Bm7(b5): X-2-3-2-3-X
    fingers: [null, 3, 1, 2, 1, null],
    isIdiomaticForSamba: true
  },

  // --- Diminuto Pleno (dim7 / º) ---
  {
    id: 'dim7_root5',
    name: 'Shape Diminuto º (Baixo na 5ª corda)',
    formulaId: 'diminished7',
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, -1, 1, 0, null], // ex: F#º: X-4-5-3-5-X -> X-0-1-(-1)-1-X
    fingers: [null, 3, 1, 4, 2, null],
    isIdiomaticForSamba: true
  },
  {
    id: 'dim7_root6',
    name: 'Shape Diminuto º (Baixo na 6ª corda)',
    formulaId: 'diminished7',
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, 1, 2, 1, null, 0], // ex: G#º: 4-X-3-4-3-X
    fingers: [null, 3, 4, 2, null, 1],
    isIdiomaticForSamba: true
  },

  // --- Maior com 6ª (6) ---
  {
    id: 'maj6_root6',
    name: 'Shape 6 (Baixo na 6ª corda - Samba Antigo)',
    formulaId: 'major6',
    rootString: 5,
    rootOffsetInShape: 0,
    fretOffsets: [null, null, 1, 1, null, 0], // ex: F6: 1-X-0-2-1-X
    fingers: [null, null, 2, 1, null, 1],
    isIdiomaticForSamba: true
  },
  {
    id: 'maj6_root5',
    name: 'Shape 6 (Baixo na 5ª corda)',
    formulaId: 'major6',
    rootString: 4,
    rootOffsetInShape: 0,
    fretOffsets: [null, 2, 2, 2, 0, null],
    fingers: [null, 3, 3, 3, 1, null],
    isIdiomaticForSamba: true
  }
];

// Calcula a casa base onde a tônica está na corda indicada
export function findRootFretOnString(root: NoteName, stringIndex: number): number {
  // stringIndex: 5 = corda 6 (E), 4 = corda 5 (A), 3 = corda 4 (D)
  const openNotes: Record<number, NoteName> = {
    5: 'E',
    4: 'A',
    3: 'D',
    2: 'G',
    1: 'B',
    0: 'E'
  };
  const openNote = openNotes[stringIndex] || 'E';
  const openIdx = getNoteIndex(openNote);
  const rootIdx = getNoteIndex(root);
  const diff = (rootIdx - openIdx + 12) % 12;
  return diff;
}

export function generateShapesForChord(root: NoteName, formulaId: string): ChordShape[] {
  const formula = CHORD_FORMULAS.find(f => f.id === formulaId);
  if (!formula) return [];

  const matchedTransposables = TRANSPOSABLE_SHAPES.filter(t => t.formulaId === formulaId);
  const shapes: ChordShape[] = [];

  for (const trans of matchedTransposables) {
    const rootFret = findRootFretOnString(root, trans.rootString);
    // Ajusta a casa inicial para não ser negativa
    const baseFret = rootFret === 0 ? 1 : rootFret;

    const frets = trans.fretOffsets.map((offset, idx) => {
      if (offset === null) return null;
      let calculatedFret = rootFret + offset;
      if (calculatedFret < 0) calculatedFret += 12;
      return calculatedFret;
    });

    const minFret = Math.min(...frets.filter((f): f is number => f !== null && f > 0));

    shapes.push({
      id: `${trans.id}_${root}`,
      name: `${root}${formula.suffix} - ${trans.name}`,
      chordSymbol: `${root}${formula.suffix}`,
      root,
      baseFret: minFret > 0 ? minFret : 1,
      frets,
      fingers: trans.fingers,
      isIdiomaticForSamba: trans.isIdiomaticForSamba,
      description: formula.description
    });
  }

  return shapes;
}
