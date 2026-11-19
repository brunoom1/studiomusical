import { NoteName, SolfegeName, IntervalType, IntervalInfo } from '../../types/music';

// Sequência cromática canônica de 12 semitons
export const CHROMATIC_NOTES: NoteName[] = [
  'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'
];

export const CHROMATIC_NOTES_SHARP: NoteName[] = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

export const CHROMATIC_NOTES_FLAT: NoteName[] = [
  'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
];

export const NOTE_TO_SOLFEGE: Record<NoteName, SolfegeName> = {
  'C': 'Dó',
  'C#': 'Dó#',
  'Db': 'Réb',
  'D': 'Ré',
  'D#': 'Ré#',
  'Eb': 'Mib',
  'E': 'Mi',
  'F': 'Fá',
  'F#': 'Fá#',
  'Gb': 'Solb',
  'G': 'Sol',
  'G#': 'Sol#',
  'Ab': 'Láb',
  'A': 'Lá',
  'A#': 'Lá#',
  'Bb': 'Sib',
  'B': 'Si'
};

export const ENHARMONIC_MAP: Record<string, NoteName> = {
  'B#': 'C',
  'C': 'C',
  'C#': 'C#',
  'Db': 'C#', // ou 'Db'
  'D': 'D',
  'D#': 'Eb',
  'Eb': 'Eb',
  'E': 'E',
  'Fb': 'E',
  'E#': 'F',
  'F': 'F',
  'F#': 'F#',
  'Gb': 'F#',
  'G': 'G',
  'G#': 'Ab',
  'Ab': 'Ab',
  'A': 'A',
  'A#': 'Bb',
  'Bb': 'Bb',
  'B': 'B',
  'Cb': 'B'
};

export const INTERVALS_INFO: Record<IntervalType, IntervalInfo> = {
  '1': { semitones: 0, shortName: 'T', fullName: 'Tônica', category: 'root' },
  'b2': { semitones: 1, shortName: '2m', fullName: '2ª Menor', category: 'tension' },
  '2': { semitones: 2, shortName: '2M', fullName: '2ª Maior', category: 'tension' },
  'b3': { semitones: 3, shortName: '3m', fullName: '3ª Menor', category: 'third' },
  '3': { semitones: 4, shortName: '3M', fullName: '3ª Maior', category: 'third' },
  '4': { semitones: 5, shortName: '4J', fullName: '4ª Justa', category: 'tension' },
  'b5': { semitones: 6, shortName: '5b / #4', fullName: '5ª Diminuta / 4ª Aum.', category: 'fifth' },
  '5': { semitones: 7, shortName: '5J', fullName: '5ª Justa', category: 'fifth' },
  '#5': { semitones: 8, shortName: '5# / 6m', fullName: '5ª Aumentada', category: 'fifth' },
  '6': { semitones: 9, shortName: '6M', fullName: '6ª Maior', category: 'tension' },
  'bb7': { semitones: 9, shortName: '7dim', fullName: '7ª Diminuta', category: 'seventh' },
  'b7': { semitones: 10, shortName: '7', fullName: '7ª Menor (Dominante)', category: 'seventh' },
  '7': { semitones: 11, shortName: '7M', fullName: '7ª Maior (7+)', category: 'seventh' },
  'b9': { semitones: 13, shortName: '9b', fullName: '9ª Menor', category: 'tension' },
  '9': { semitones: 14, shortName: '9', fullName: '9ª Maior', category: 'tension' },
  '#9': { semitones: 15, shortName: '9#', fullName: '9ª Aumentada', category: 'tension' },
  '11': { semitones: 17, shortName: '11', fullName: '11ª Justa', category: 'tension' },
  '#11': { semitones: 18, shortName: '11#', fullName: '11ª Aumentada', category: 'tension' },
  'b13': { semitones: 20, shortName: '13b', fullName: '13ª Menor', category: 'tension' },
  '13': { semitones: 21, shortName: '13', fullName: '13ª Maior', category: 'tension' }
};

// Afinação padrão do violão:
// Cordas indexadas de 0 a 5 (ou 6):
// 0: 1ª corda - E4 (Mi agudo)
// 1: 2ª corda - B3 (Si)
// 2: 3ª corda - G3 (Sol)
// 3: 4ª corda - D3 (Ré)
// 4: 5ª corda - A2 (Lá)
// 5: 6ª corda - E2 (Mi grave)
// 6: 7ª corda - C2 (Dó grave - afinação tradicional de choro) ou B1

export type { StringTuning } from '../../types/music';
import { StringTuning, TuningPreset } from '../../types/music';

export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function noteToMidi(note: NoteName, octave: number): number {
  const noteIndices: Record<NoteName, number> = {
    'C': 0, 'C#': 1, 'Db': 1,
    'D': 2, 'D#': 3, 'Eb': 3,
    'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6,
    'G': 7, 'G#': 8, 'Ab': 8,
    'A': 9, 'A#': 10, 'Bb': 10,
    'B': 11
  };
  const noteIndex = noteIndices[note] ?? 0;
  // MIDI 60 é C4 (Dó central, oitava 4) => (4 + 1) * 12 + 0 = 60
  return (octave + 1) * 12 + noteIndex;
}

export function createStringTuning(stringNumber: number, openNote: NoteName, octave: number): StringTuning {
  const midiNumber = noteToMidi(openNote, octave);
  return {
    stringNumber,
    openNote,
    octave,
    midiNumber,
    frequency: midiToFrequency(midiNumber)
  };
}

// Afinações de 4 cordas
export const TUNING_CAVAQUINHO_4: StringTuning[] = [
  createStringTuning(1, 'D', 4), // Ré agudo
  createStringTuning(2, 'B', 3), // Si
  createStringTuning(3, 'G', 3), // Sol
  createStringTuning(4, 'D', 3)  // Ré grave
];

export const TUNING_BASS_4: StringTuning[] = [
  createStringTuning(1, 'G', 2),
  createStringTuning(2, 'D', 2),
  createStringTuning(3, 'A', 1),
  createStringTuning(4, 'E', 1)
];

export const TUNING_UKULELE_4: StringTuning[] = [
  createStringTuning(1, 'A', 4),
  createStringTuning(2, 'E', 4),
  createStringTuning(3, 'C', 4),
  createStringTuning(4, 'G', 4)
];

export const TUNING_GUITAR_TOP_4: StringTuning[] = [
  createStringTuning(1, 'E', 4),
  createStringTuning(2, 'B', 3),
  createStringTuning(3, 'G', 3),
  createStringTuning(4, 'D', 3)
];

// Afinações de 6 cordas
export const GUITAR_TUNING_6: StringTuning[] = [
  createStringTuning(1, 'E', 4),
  createStringTuning(2, 'B', 3),
  createStringTuning(3, 'G', 3),
  createStringTuning(4, 'D', 3),
  createStringTuning(5, 'A', 2),
  createStringTuning(6, 'E', 2)
];

export const GUITAR_TUNING_DROP_D: StringTuning[] = [
  createStringTuning(1, 'E', 4),
  createStringTuning(2, 'B', 3),
  createStringTuning(3, 'G', 3),
  createStringTuning(4, 'D', 3),
  createStringTuning(5, 'A', 2),
  createStringTuning(6, 'D', 2)
];

export const GUITAR_TUNING_DADGAD: StringTuning[] = [
  createStringTuning(1, 'D', 4),
  createStringTuning(2, 'A', 3),
  createStringTuning(3, 'G', 3),
  createStringTuning(4, 'D', 3),
  createStringTuning(5, 'A', 2),
  createStringTuning(6, 'D', 2)
];

export const GUITAR_TUNING_OPEN_D: StringTuning[] = [
  createStringTuning(1, 'D', 4),
  createStringTuning(2, 'A', 3),
  createStringTuning(3, 'F#', 3),
  createStringTuning(4, 'D', 3),
  createStringTuning(5, 'A', 2),
  createStringTuning(6, 'D', 2)
];

// Afinações de 7 cordas
export const GUITAR_TUNING_7_C: StringTuning[] = [
  ...GUITAR_TUNING_6,
  createStringTuning(7, 'C', 2) // 7ª em Dó (Dino 7 cordas / Samba / Choro)
];

export const GUITAR_TUNING_7_B: StringTuning[] = [
  ...GUITAR_TUNING_6,
  createStringTuning(7, 'B', 1) // 7ª em Si (Violão 7 cordas erudito / jazz)
];

export const GUITAR_TUNING_7_DROP_A: StringTuning[] = [
  ...GUITAR_TUNING_6,
  createStringTuning(7, 'A', 1)
];

// Lista consolidada de Presets por número de cordas
export const TUNING_PRESETS: TuningPreset[] = [
  // 4 cordas
  { id: 'cavaquinho_d', name: 'Cavaquinho Tradicional (D-G-B-D)', stringCount: 4, description: 'Afinação tradicional de samba e choro para cavaquinho.', strings: TUNING_CAVAQUINHO_4 },
  { id: 'guitar_top4', name: 'Violão 4 Cordas Agudas (D-G-B-E)', stringCount: 4, description: 'As 4 primeiras cordas do violão padrão.', strings: TUNING_GUITAR_TOP_4 },
  { id: 'ukulele_std', name: 'Ukulele Standard (G-C-E-A)', stringCount: 4, description: 'Afinação soprano/concerto/tenor padrão de ukulele.', strings: TUNING_UKULELE_4 },
  { id: 'bass_4', name: 'Contrabaixo Elétrico / Acústico (E-A-D-G)', stringCount: 4, description: 'Afinação em quartas justas do baixo de 4 cordas.', strings: TUNING_BASS_4 },

  // 6 cordas
  { id: 'guitar_std', name: 'Violão Padrão (E-A-D-G-B-E)', stringCount: 6, description: 'Afinação universal de violão clássico, nylon e aço.', strings: GUITAR_TUNING_6 },
  { id: 'guitar_drop_d', name: 'Drop D (D-A-D-G-B-E)', stringCount: 6, description: 'Bordão 6ª corda rebaixado 1 tom para Ré.', strings: GUITAR_TUNING_DROP_D },
  { id: 'guitar_dadgad', name: 'DADGAD (D-A-D-G-A-D)', stringCount: 6, description: 'Afinação modal celta e fingerstyle moderna.', strings: GUITAR_TUNING_DADGAD },
  { id: 'guitar_open_d', name: 'Open D (D-A-D-F#-A-D)', stringCount: 6, description: 'Afinação aberta que forma a tríade de Ré maior solta.', strings: GUITAR_TUNING_OPEN_D },

  // 7 cordas
  { id: 'guitar_7_c', name: 'Violão 7 Cordas Choro (7ª em Dó)', stringCount: 7, description: 'Afinação lendária do Dino 7 Cordas, com o bordão em C2.', strings: GUITAR_TUNING_7_C },
  { id: 'guitar_7_b', name: 'Violão 7 Cordas Tradicional (7ª em Si)', stringCount: 7, description: 'Afinação estendida em quartas (B-E-A-D-G-B-E).', strings: GUITAR_TUNING_7_B },
  { id: 'guitar_7_drop_a', name: 'Violão 7 Cordas Drop A', stringCount: 7, description: '7ª corda rebaixada para Lá grave (A1).', strings: GUITAR_TUNING_7_DROP_A }
];
