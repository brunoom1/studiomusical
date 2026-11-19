import { HarmonicField, HarmonicDegree, NoteName } from '../../types/music';
import { transposeNote } from './fretboard';
import { CHORD_FORMULAS, getChordNotes } from './chords';

export type HarmonicFieldType = 'major' | 'minor_natural' | 'minor_harmonic' | 'minor_melodic';

interface DegreeTemplate {
  roman: string;
  semitones: number;
  formulaId: string;
  suffix: string;
  functionName: string;
  scaleName: string;
  scaleId: string;
}

const MAJOR_FIELD_TEMPLATE: DegreeTemplate[] = [
  { roman: 'I7M', semitones: 0, formulaId: 'major7', suffix: '7M', functionName: 'Tônica (Repouso Maior)', scaleName: 'Jônio (Escala Maior)', scaleId: 'major' },
  { roman: 'IIm7', semitones: 2, formulaId: 'minor7', suffix: 'm7', functionName: 'Subdominante', scaleName: 'Dórico', scaleId: 'dorian' },
  { roman: 'IIIm7', semitones: 4, formulaId: 'minor7', suffix: 'm7', functionName: 'Tônica Antirrelativa', scaleName: 'Frígio', scaleId: 'phrygian' },
  { roman: 'IV7M', semitones: 5, formulaId: 'major7', suffix: '7M', functionName: 'Subdominante', scaleName: 'Lídio', scaleId: 'lydian' },
  { roman: 'V7', semitones: 7, formulaId: 'dominant7', suffix: '7', functionName: 'Dominante (Tensão com Trítono)', scaleName: 'Mixolídio', scaleId: 'mixolydian' },
  { roman: 'VIm7', semitones: 9, formulaId: 'minor7', suffix: 'm7', functionName: 'Tônica Relativa Menor', scaleName: 'Eólio (Menor Natural)', scaleId: 'natural_minor' },
  { roman: 'VIIm7(b5)', semitones: 11, formulaId: 'half_diminished', suffix: 'm7(b5)', functionName: 'Dominante / Sensível', scaleName: 'Lócrio', scaleId: 'locrian' }
];

const MINOR_HARMONIC_TEMPLATE: DegreeTemplate[] = [
  { roman: 'Im(7M)', semitones: 0, formulaId: 'minor_major7', suffix: 'm(7M)', functionName: 'Tônica Menor Tensa', scaleName: 'Menor Harmônica', scaleId: 'harmonic_minor' },
  { roman: 'IIm7(b5)', semitones: 2, formulaId: 'half_diminished', suffix: 'm7(b5)', functionName: 'Subdominante Menor', scaleName: 'Lócrio 6M', scaleId: 'locrian' },
  { roman: 'bIII7M(#5)', semitones: 3, formulaId: 'major7', suffix: '7M(#5)', functionName: 'Tônica Relativa Aumentada', scaleName: 'Jônio #5', scaleId: 'major' },
  { roman: 'IVm7', semitones: 5, formulaId: 'minor7', suffix: 'm7', functionName: 'Subdominante Menor', scaleName: 'Dórico #4', scaleId: 'dorian' },
  { roman: 'V7', semitones: 7, formulaId: 'dominant7_b9', suffix: '7(b9)', functionName: 'Dominante Clássico (Prepara Im)', scaleName: 'Mixolídio b9 b13 (Frígio Maior)', scaleId: 'mixolydian' },
  { roman: 'bVI7M', semitones: 8, formulaId: 'major7', suffix: '7M', functionName: 'Subdominante', scaleName: 'Lídio #9', scaleId: 'lydian' },
  { roman: 'VIIº (dim7)', semitones: 11, formulaId: 'diminished7', suffix: 'º', functionName: 'Dominante Pleno / Sensível', scaleName: 'Escala Diminuta (T-St)', scaleId: 'diminished_wh' }
];

const MINOR_NATURAL_TEMPLATE: DegreeTemplate[] = [
  { roman: 'Im7', semitones: 0, formulaId: 'minor7', suffix: 'm7', functionName: 'Tônica Menor', scaleName: 'Eólio (Menor Natural)', scaleId: 'natural_minor' },
  { roman: 'IIm7(b5)', semitones: 2, formulaId: 'half_diminished', suffix: 'm7(b5)', functionName: 'Subdominante', scaleName: 'Lócrio', scaleId: 'locrian' },
  { roman: 'bIII7M', semitones: 3, formulaId: 'major7', suffix: '7M', functionName: 'Tônica Relativa Maior', scaleName: 'Jônio (Escala Maior)', scaleId: 'major' },
  { roman: 'IVm7', semitones: 5, formulaId: 'minor7', suffix: 'm7', functionName: 'Subdominante', scaleName: 'Dórico', scaleId: 'dorian' },
  { roman: 'Vm7', semitones: 7, formulaId: 'minor7', suffix: 'm7', functionName: 'Dominante Menor (Modal)', scaleName: 'Frígio', scaleId: 'phrygian' },
  { roman: 'bVI7M', semitones: 8, formulaId: 'major7', suffix: '7M', functionName: 'Subdominante', scaleName: 'Lídio', scaleId: 'lydian' },
  { roman: 'bVII7', semitones: 10, formulaId: 'dominant7', suffix: '7', functionName: 'Subdominante / Modal', scaleName: 'Mixolídio', scaleId: 'mixolydian' }
];

export function getHarmonicField(key: NoteName, type: HarmonicFieldType = 'major'): HarmonicField {
  let template = MAJOR_FIELD_TEMPLATE;
  let typeName = 'Campo Harmônico Maior';

  if (type === 'minor_harmonic') {
    template = MINOR_HARMONIC_TEMPLATE;
    typeName = 'Campo Harmônico Menor Harmônico';
  } else if (type === 'minor_natural') {
    template = MINOR_NATURAL_TEMPLATE;
    typeName = 'Campo Harmônico Menor Natural';
  }

  const degrees: HarmonicDegree[] = template.map(deg => {
    const chordRoot = transposeNote(key, deg.semitones);
    const chordSymbol = `${chordRoot}${deg.suffix}`;
    const formula = CHORD_FORMULAS.find(f => f.id === deg.formulaId) || CHORD_FORMULAS[0];
    const notes = getChordNotes(chordRoot, formula);

    return {
      roman: deg.roman,
      chordName: `${chordRoot} ${formula.name}`,
      chordSymbol,
      chordRoot,
      formulaId: deg.formulaId,
      functionName: deg.functionName,
      scaleName: deg.scaleName,
      scaleId: deg.scaleId,
      arpeggioSymbol: `Arp. ${chordSymbol}`,
      notes
    };
  });

  return {
    key,
    type,
    typeName,
    degrees
  };
}
