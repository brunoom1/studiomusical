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

export interface StringTuning {
  stringNumber: number;
  openNote: NoteName;
  octave: number;
  midiNumber: number;
  frequency: number;
}

export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export const GUITAR_TUNING_6: StringTuning[] = [
  { stringNumber: 1, openNote: 'E', octave: 4, midiNumber: 64, frequency: midiToFrequency(64) },
  { stringNumber: 2, openNote: 'B', octave: 3, midiNumber: 59, frequency: midiToFrequency(59) },
  { stringNumber: 3, openNote: 'G', octave: 3, midiNumber: 55, frequency: midiToFrequency(55) },
  { stringNumber: 4, openNote: 'D', octave: 3, midiNumber: 50, frequency: midiToFrequency(50) },
  { stringNumber: 5, openNote: 'A', octave: 2, midiNumber: 45, frequency: midiToFrequency(45) },
  { stringNumber: 6, openNote: 'E', octave: 2, midiNumber: 40, frequency: midiToFrequency(40) }
];

export const GUITAR_TUNING_7_C: StringTuning[] = [
  ...GUITAR_TUNING_6,
  { stringNumber: 7, openNote: 'C', octave: 2, midiNumber: 36, frequency: midiToFrequency(36) } // 7ª em Dó (Dino 7 cordas)
];
