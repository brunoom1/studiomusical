import { ScaleDefinition, NoteName, FretMarker, StringCount } from '../../types/music';
import { transposeNote, getNoteAtFret, identifyInterval } from './fretboard';

export const SCALES_DATABASE: ScaleDefinition[] = [
  {
    id: 'major',
    name: 'Major (Ionian)',
    ptName: 'Maior (Jônio)',
    category: 'major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    intervalNames: ['1', '2', '3', '4', '5', '6', '7'],
    description: 'A base da harmonia ocidental. Sonoridade brilhante, alegre e resoluta.',
    usageTip: 'Ideal para improvisar sobre o I grau maior (7M) em qualquer estilo.'
  },
  {
    id: 'natural_minor',
    name: 'Natural Minor (Aeolian)',
    ptName: 'Menor Natural (Eólio)',
    category: 'minor',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    intervalNames: ['1', '2', 'b3', '4', '5', 'b13', 'b7'],
    description: 'Relativa menor da escala maior. Sonoridade melancólica e introspectiva.',
    usageTip: 'Usada sobre acordes menores (m7) em tonalidades menores.'
  },
  {
    id: 'harmonic_minor',
    name: 'Harmonic Minor',
    ptName: 'Menor Harmônica',
    category: 'harmonic_minor',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    intervalNames: ['1', '2', 'b3', '4', '5', 'b13', '7'],
    description: 'A escala clássica com a 7ª maior gerando o intervalo dramático de 2ª aumentada e o acorde V7.',
    usageTip: 'Fundamental no Choro, Flamenco, Samba e Bossa ao solar sobre o acorde V7(b9) ou Im(maj7).'
  },
  {
    id: 'melodic_minor',
    name: 'Melodic Minor (Jazz Minor)',
    ptName: 'Menor Melódica (Jazz)',
    category: 'melodic_minor',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    intervalNames: ['1', '2', 'b3', '4', '5', '6', '7'],
    description: 'Menor moderna com 6ª e 7ª maiores. Fonte da escala alterada e do modo Lídio Dominante.',
    usageTip: 'Usada sobre acordes m6, m(7M) e seus modos para acordes alterados.'
  },
  {
    id: 'penta_major',
    name: 'Major Pentatonic',
    ptName: 'Pentatônica Maior',
    category: 'pentatonic',
    intervals: [0, 2, 4, 7, 9],
    intervalNames: ['1', '2', '3', '5', '6'],
    description: '5 notas sem semitons conflitantes. Sonoridade aberta, limpa e versátil.',
    usageTip: 'Perfeita para solos cantáveis em samba, MPB, pop e blues.'
  },
  {
    id: 'penta_minor',
    name: 'Minor Pentatonic',
    ptName: 'Pentatônica Menor',
    category: 'pentatonic',
    intervals: [0, 3, 5, 7, 10],
    intervalNames: ['1', 'b3', '4', '5', 'b7'],
    description: 'A digitação mais famosa do violão e da guitarra.',
    usageTip: 'Excelente para frases rítmicas e expressivas sobre acordes menores ou de blues.'
  },
  {
    id: 'blues',
    name: 'Blues Scale',
    ptName: 'Escala Blues',
    category: 'pentatonic',
    intervals: [0, 3, 5, 6, 7, 10],
    intervalNames: ['1', 'b3', '4', 'b5', '5', 'b7'],
    description: 'Pentatônica menor acrescida da blue note (quinta diminuta / 4ª aumentada).',
    usageTip: 'Traz aquela tensão típica e malícia ao fraseado.'
  },
  {
    id: 'dorian',
    name: 'Dorian Mode',
    ptName: 'Modo Dórico',
    category: 'modes',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    intervalNames: ['1', '2', 'b3', '4', '5', '6', 'b7'],
    description: 'Menor com a 6ª maior. Menos sombrio que o eólio, muito comum no samba-jazz e MPB.',
    usageTip: 'Excelente sobre acordes de II grau menor (IIm7).'
  },
  {
    id: 'phrygian',
    name: 'Phrygian Mode',
    ptName: 'Modo Frígio',
    category: 'modes',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    intervalNames: ['1', 'b2', 'b3', '4', '5', 'b13', 'b7'],
    description: 'Menor com a marcante 2ª menor (b9). Sabor espanhol, flamenco e modal.',
    usageTip: 'Usado sobre o III grau ou acordes com b9 (sus4b9).'
  },
  {
    id: 'lydian',
    name: 'Lydian Mode',
    ptName: 'Modo Lídio',
    category: 'modes',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    intervalNames: ['1', '2', '3', '#11', '5', '6', '7'],
    description: 'Maior com a 4ª aumentada (#11). Sonoridade etérea, moderna e flutuante.',
    usageTip: 'Ideal para acordes 7M(#11) no IV grau maior.'
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian Mode',
    ptName: 'Modo Mixolídio',
    category: 'modes',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    intervalNames: ['1', '2', '3', '4', '5', '6', 'b7'],
    description: 'Maior com 7ª menor. O modo dos acordes dominantes (V7).',
    usageTip: 'A escala mestra para solar sobre qualquer acorde de 7 dominante em samba e choro.'
  },
  {
    id: 'locrian',
    name: 'Locrian Mode',
    ptName: 'Modo Lócrio',
    category: 'modes',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    intervalNames: ['1', 'b2', 'b3', '4', 'b5', 'b13', 'b7'],
    description: 'Escala com 5ª diminuta. Instável e tensa.',
    usageTip: 'Aplicada sobre o acorde meio-diminuto (m7b5) no VII grau maior ou II grau menor.'
  },
  {
    id: 'diminished_hw',
    name: 'Diminished (Half-Whole)',
    ptName: 'Escala Diminuta (St-T / Dom-Dim)',
    category: 'symmetrical',
    intervals: [0, 1, 3, 4, 6, 7, 9, 10],
    intervalNames: ['1', 'b9', '#9', '3', '#11', '5', '13', 'b7'],
    description: 'Escala simétrica alternando semitom e tom. Conhecida como Dominante Diminuta.',
    usageTip: 'Perfeita para acordes dominantes com tensões V7(b9, #9, #11, 13).'
  },
  {
    id: 'diminished_wh',
    name: 'Diminished (Whole-Half)',
    ptName: 'Escala Diminuta (T-St)',
    category: 'symmetrical',
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
    intervalNames: ['1', '2', 'b3', '4', 'b5', '#5', '6', '7'],
    description: 'Escala simétrica alternando tom e semitom. Construída para acordes diminutos plenos (dim7).',
    usageTip: 'Usada diretamente sobre qualquer acorde diminuto (ex: F#º preparando Gm).'
  },
  {
    id: 'whole_tone',
    name: 'Whole Tone (Hexatonic)',
    ptName: 'Tons Inteiros (Hexafônica)',
    category: 'symmetrical',
    intervals: [0, 2, 4, 6, 8, 10],
    intervalNames: ['1', '2', '3', '#11', '#5', 'b7'],
    description: 'Escala de 6 notas inteiramente formada por intervalos de 1 tom. Sem centro tonal fixo.',
    usageTip: 'Aplicável sobre acordes dominantes com quinta aumentada ou 9(#5).'
  },
  {
    id: 'altered',
    name: 'Altered Scale (Super Locrian)',
    ptName: 'Escala Alterada (Superlócria)',
    category: 'melodic_minor',
    intervals: [0, 1, 3, 4, 6, 8, 10],
    intervalNames: ['1', 'b9', '#9', '3', 'b5', '#5', 'b7'],
    description: '7º modo da Menor Melódica. Contém todas as tensões alteradas (b9, #9, b5, #5).',
    usageTip: 'A escala definitiva para acordes V7alt preparando a resolução em acordes menores ou maiores.'
  }
];

export function getScaleNotes(root: NoteName, scale: ScaleDefinition): NoteName[] {
  return scale.intervals.map(semitones => transposeNote(root, semitones));
}

export function getScaleFretboardMarkers(
  root: NoteName,
  scale: ScaleDefinition,
  stringCount: StringCount = 6,
  maxFrets: number = 15,
  fretRange?: { min: number; max: number }
): FretMarker[] {
  const scaleNotes = getScaleNotes(root, scale);
  const markers: FretMarker[] = [];

  const minFret = fretRange ? fretRange.min : 0;
  const maxFret = fretRange ? fretRange.max : maxFrets;

  for (let s = 0; s < (stringCount === 7 ? 7 : 6); s++) {
    for (let f = minFret; f <= maxFret; f++) {
      const { note, frequency } = getNoteAtFret(s, f, stringCount);
      const isScaleNote = scaleNotes.includes(note);

      if (isScaleNote) {
        const interval = identifyInterval(root, note);
        markers.push({
          stringIndex: s,
          fret: f,
          note,
          interval,
          isRoot: note === root,
          frequency
        });
      }
    }
  }

  return markers;
}

// Definição dos 5 Shapes CAGED para Escalas
export interface ScaleBoxShape {
  id: string;
  name: string; // "Shape 1 (Posição E)", "Shape 2 (Posição D)", etc.
  cagedLetter: 'C' | 'A' | 'G' | 'E' | 'D';
  minFretOffset: number; // Offset relativo à tônica na 6ª ou 5ª corda
  maxFretOffset: number;
  description: string;
}

export const CAGED_SHAPES_CONFIG: ScaleBoxShape[] = [
  { id: 'shape_e', name: 'Shape 1 (Base Corda 6 - Forma de E)', cagedLetter: 'E', minFretOffset: 0, maxFretOffset: 4, description: 'Tônica na 6ª corda. Posição básica e mais usada para solos e arpejos.' },
  { id: 'shape_d', name: 'Shape 2 (Base Corda 4 - Forma de D)', cagedLetter: 'D', minFretOffset: 2, maxFretOffset: 6, description: 'Tônica na 4ª corda. Conecta a região média do braço.' },
  { id: 'shape_c', name: 'Shape 3 (Base Corda 5 - Forma de C)', cagedLetter: 'C', minFretOffset: 4, maxFretOffset: 8, description: 'Tônica na 5ª corda. Excelente para arpejos e melodias fluidas.' },
  { id: 'shape_a', name: 'Shape 4 (Base Corda 5 - Forma de A)', cagedLetter: 'A', minFretOffset: 7, maxFretOffset: 11, description: 'Tônica na 5ª corda. O shape clássico de pestana em Lá.' },
  { id: 'shape_g', name: 'Shape 5 (Base Corda 6 - Forma de G)', cagedLetter: 'G', minFretOffset: 9, maxFretOffset: 13, description: 'Tônica na 6ª corda. Shape amplo que completa o ciclo do braço.' }
];
