export type NoteName = 
  | 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' 
  | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#' | 'Ab' 
  | 'A' | 'A#' | 'Bb' | 'B';

export type SolfegeName = 
  | 'Dó' | 'Dó#' | 'Réb' | 'Ré' | 'Ré#' | 'Mib' 
  | 'Mi' | 'Fá' | 'Fá#' | 'Solb' | 'Sol' | 'Sol#' | 'Láb' 
  | 'Lá' | 'Lá#' | 'Sib' | 'Si';

export type IntervalType = 
  | '1'   // Tônica
  | 'b2'  // 2ª menor
  | '2'   // 2ª maior
  | 'b3'  // 3ª menor
  | '3'   // 3ª maior
  | '4'   // 4ª justa
  | 'b5'  // 5ª diminuta
  | '5'   // 5ª justa
  | '#5'  // 5ª aumentada
  | '6'   // 6ª maior
  | 'bb7' // 7ª diminuta
  | 'b7'  // 7ª menor
  | '7'   // 7ª maior (7M / 7+)
  | 'b9'  // 9ª menor
  | '9'   // 9ª maior
  | '#9'  // 9ª aumentada
  | '11'  // 11ª justa
  | '#11' // 11ª aumentada
  | 'b13' // 13ª menor
  | '13'; // 13ª maior

export interface IntervalInfo {
  semitones: number;
  shortName: string;
  fullName: string;
  category: 'root' | 'third' | 'fifth' | 'seventh' | 'tension';
}

export type ScaleCategory = 
  | 'major' 
  | 'minor' 
  | 'harmonic_minor' 
  | 'melodic_minor' 
  | 'pentatonic' 
  | 'modes' 
  | 'symmetrical';

export interface ScaleDefinition {
  id: string;
  name: string;
  ptName: string;
  category: ScaleCategory;
  intervals: number[]; // semitons a partir da tônica, ex: [0, 2, 4, 5, 7, 9, 11]
  intervalNames: IntervalType[];
  description: string;
  usageTip: string;
}

export type ChordCategory = 
  | 'triad'
  | 'seventh'      // Tétrades com 7 dominante
  | 'major7'       // Tétrades com 7M / 7+
  | 'minor7'       // m7
  | 'half_dim'     // m7b5 (meio-diminuto / quinta diminuta)
  | 'diminished'   // dim7 (diminuto com sétima diminuta)
  | 'altered'      // 7(b9), 7(#9), 7(13), 7(b13)
  | 'extended';    // 9, 7M(9), m9, 6/9

export interface ChordFormula {
  id: string;
  symbol: string;
  suffix: string;
  name: string;
  category: ChordCategory;
  intervals: number[]; // semitons a partir da tônica
  intervalNames: IntervalType[];
  description: string;
}

export interface FretMarker {
  stringIndex: number; // 0 = 1ª corda (E aguda), 5 = 6ª corda (E grave) ou 6 = 7ª corda
  fret: number;
  note: NoteName;
  interval: IntervalType;
  isRoot: boolean;
  finger?: number; // 1, 2, 3, 4
  frequency: number; // Hz
}

export interface ChordShape {
  id: string;
  name: string;
  chordSymbol: string;
  root: NoteName;
  baseFret: number; // Casa inicial do shape
  frets: (number | null)[]; // null = corda abafada (X), 0 = solta, >0 = número da casa
  fingers: (number | null)[]; // 1, 2, 3, 4 ou null
  barres?: { fret: number; fromString: number; toString: number }[];
  description?: string;
  isIdiomaticForSamba?: boolean;
}

export interface ArpeggioShape {
  id: string;
  name: string;
  chordSymbol: string;
  root: NoteName;
  baseFret: number;
  markers: FretMarker[];
  description: string;
}

export interface HarmonicDegree {
  roman: string;
  chordName: string;
  chordSymbol: string;
  chordRoot: NoteName;
  formulaId: string;
  functionName: string; // Tônica, Subdominante, Dominante, etc.
  scaleName: string;
  scaleId: string;
  arpeggioSymbol: string;
  notes: NoteName[];
}

export interface HarmonicField {
  key: NoteName;
  type: 'major' | 'minor_natural' | 'minor_harmonic' | 'minor_melodic';
  typeName: string;
  degrees: HarmonicDegree[];
}

export interface SambaChoroProgression {
  id: string;
  title: string;
  key: NoteName;
  style: 'Samba' | 'Choro' | 'Bossa Nova' | 'Partido Alto';
  rhythmTip: string;
  description: string;
  steps: {
    chord: string;
    roman: string;
    measure: number;
    tip: string;
    shape: ChordShape;
  }[];
}

export type ViewOrientation = 'horizontal' | 'vertical';
export type StringCount = 4 | 6 | 7;
export type DisplayMode = 'notes' | 'intervals' | 'fingers';
export type NoteNotation = 'anglo' | 'solfege'; // 'C, D, E' vs 'Dó, Ré, Mi'
export type ActiveTab = 'scales' | 'chords' | 'arpeggios' | 'harmonic_field' | 'samba_choro' | 'plan';

export interface StringTuning {
  stringNumber: number;
  openNote: NoteName;
  octave: number;
  midiNumber: number;
  frequency: number;
}

export interface TuningPreset {
  id: string;
  name: string;
  stringCount: StringCount;
  description: string;
  strings: StringTuning[];
}
