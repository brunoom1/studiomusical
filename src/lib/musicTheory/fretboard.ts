import { NoteName, IntervalType, StringCount, StringTuning } from '../../types/music';
import { 
  CHROMATIC_NOTES, 
  CHROMATIC_NOTES_FLAT, 
  CHROMATIC_NOTES_SHARP, 
  GUITAR_TUNING_6, 
  GUITAR_TUNING_7_C, 
  TUNING_CAVAQUINHO_4,
  midiToFrequency 
} from './constants';

export const FLAT_KEYS: NoteName[] = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'];

export function getNoteIndex(note: NoteName): number {
  const index = CHROMATIC_NOTES.indexOf(note);
  if (index !== -1) return index;
  const altMap: Record<string, number> = {
    'Db': 1, 'C#': 1,
    'D#': 3, 'Eb': 3,
    'Gb': 6, 'F#': 6,
    'G#': 8, 'Ab': 8,
    'A#': 10, 'Bb': 10
  };
  return altMap[note] ?? 0;
}

export function transposeNote(note: NoteName, semitones: number, preferFlat?: boolean): NoteName {
  const idx = getNoteIndex(note);
  const newIdx = (idx + semitones) % 12;
  const positiveIdx = newIdx < 0 ? newIdx + 12 : newIdx;

  const isFlatContext = preferFlat ?? FLAT_KEYS.includes(note);
  return isFlatContext ? CHROMATIC_NOTES_FLAT[positiveIdx] : CHROMATIC_NOTES_SHARP[positiveIdx];
}

export function getSemitoneDistance(fromNote: NoteName, toNote: NoteName): number {
  const fromIdx = getNoteIndex(fromNote);
  const toIdx = getNoteIndex(toNote);
  const dist = (toIdx - fromIdx) % 12;
  return dist < 0 ? dist + 12 : dist;
}

export function resolveTuning(tuningOrCount: StringTuning[] | StringCount = 6): StringTuning[] {
  if (Array.isArray(tuningOrCount)) {
    return tuningOrCount;
  }
  if (tuningOrCount === 4) return TUNING_CAVAQUINHO_4;
  if (tuningOrCount === 7) return GUITAR_TUNING_7_C;
  return GUITAR_TUNING_6;
}

export function getTuning(stringCount: StringCount): StringTuning[] {
  return resolveTuning(stringCount);
}

export function getNoteAtFret(
  stringIndex: number, 
  fret: number, 
  tuningInput: StringTuning[] | StringCount = 6
): {
  note: NoteName;
  midi: number;
  frequency: number;
} {
  const tuning = resolveTuning(tuningInput);
  const stringInfo = tuning[stringIndex] || tuning[0];
  const midi = stringInfo.midiNumber + fret;
  const note = transposeNote(stringInfo.openNote, fret);
  const frequency = midiToFrequency(midi);

  return { note, midi, frequency };
}

export function identifyInterval(rootNote: NoteName, note: NoteName): IntervalType {
  const distance = getSemitoneDistance(rootNote, note);
  const map: Record<number, IntervalType> = {
    0: '1',
    1: 'b2',
    2: '2',
    3: 'b3',
    4: '3',
    5: '4',
    6: 'b5',
    7: '5',
    8: '#5',
    9: '6',
    10: 'b7',
    11: '7'
  };
  return map[distance] || '1';
}

export const FRET_MARKERS_DOTS = [3, 5, 7, 9, 15, 17, 19, 21];
export const FRET_MARKERS_DOUBLE = [12, 24];
