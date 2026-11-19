import { NoteName, FretMarker, StringCount, StringTuning } from '../../types/music';
import { CHORD_FORMULAS, getChordNotes } from './chords';
import { getNoteAtFret, identifyInterval, resolveTuning } from './fretboard';

export interface ArpeggioPattern {
  id: string;
  name: string;
  formulaId: string;
  rootString: number; // 5 = corda 6, 4 = corda 5
  cagedShape: 'E' | 'A' | 'D' | 'C' | 'G';
  fretSpan: number; // amplitude de casas (ex: 4 casas)
  description: string;
}

export const ARPEGGIO_PATTERNS: ArpeggioPattern[] = [
  // Arpejos de 7M
  {
    id: 'arp_maj7_e',
    name: 'Arpejo 7M - Posição Forma de E (Baixo na 6ª corda)',
    formulaId: 'major7',
    rootString: 5,
    cagedShape: 'E',
    fretSpan: 4,
    description: 'Arpejo de 2 oitavas completas com tônica na 6ª corda. Excelente para varredura ou dedilhado veloz.'
  },
  {
    id: 'arp_maj7_a',
    name: 'Arpejo 7M - Posição Forma de A (Baixo na 5ª corda)',
    formulaId: 'major7',
    rootString: 4,
    cagedShape: 'A',
    fretSpan: 4,
    description: 'Arpejo com tônica na 5ª corda, muito confortável para a mão esquerda.'
  },

  // Arpejos de 7 Dominante
  {
    id: 'arp_dom7_e',
    name: 'Arpejo 7 Dominante - Posição Forma de E (Baixo na 6ª corda)',
    formulaId: 'dominant7',
    rootString: 5,
    cagedShape: 'E',
    fretSpan: 4,
    description: 'Arpejo sobre o acorde dominante (1 - 3 - 5 - b7). Essencial para improvisação de choro e jazz.'
  },
  {
    id: 'arp_dom7_a',
    name: 'Arpejo 7 Dominante - Posição Forma de A (Baixo na 5ª corda)',
    formulaId: 'dominant7',
    rootString: 4,
    cagedShape: 'A',
    fretSpan: 4,
    description: 'Arpejo com baixo na 5ª corda cobrindo da 5ª corda até a 1ª corda.'
  },

  // Arpejos de m7
  {
    id: 'arp_m7_e',
    name: 'Arpejo m7 - Posição Forma de E (Baixo na 6ª corda)',
    formulaId: 'minor7',
    rootString: 5,
    cagedShape: 'E',
    fretSpan: 4,
    description: 'Arpejo de acorde menor com 7ª (1 - b3 - 5 - b7). Fluido e melódico.'
  },
  {
    id: 'arp_m7_a',
    name: 'Arpejo m7 - Posição Forma de A (Baixo na 5ª corda)',
    formulaId: 'minor7',
    rootString: 4,
    cagedShape: 'A',
    fretSpan: 4,
    description: 'Arpejo com início na 5ª corda, desenhando a tríade menor com a 7ª na 3ª corda.'
  },

  // Arpejos de m7b5 (Meio-diminuto / Quinta diminuta)
  {
    id: 'arp_m7b5_e',
    name: 'Arpejo m7(b5) - Posição Forma de E (Baixo na 6ª corda)',
    formulaId: 'half_diminished',
    rootString: 5,
    cagedShape: 'E',
    fretSpan: 4,
    description: 'Arpejo meio-diminuto (1 - b3 - b5 - b7). Marca com precisão a harmonia do IIm7b5.'
  },
  {
    id: 'arp_m7b5_a',
    name: 'Arpejo m7(b5) - Posição Forma de A (Baixo na 5ª corda)',
    formulaId: 'half_diminished',
    rootString: 4,
    cagedShape: 'A',
    fretSpan: 4,
    description: 'Digitação muito usada por Dino 7 Cordas e violonistas modernos sobre o II grau menor.'
  },

  // Arpejos de Diminuto Pleno (dim7)
  {
    id: 'arp_dim7_all',
    name: 'Arpejo Diminuto º (Simétrico a cada 3 casas)',
    formulaId: 'diminished7',
    rootString: 5,
    cagedShape: 'E',
    fretSpan: 4,
    description: 'Por ser simétrico, o mesmo arpejo se repete a cada 3 trastes ao longo de todo o braço!'
  }
];

export function getArpeggioFretboardMarkers(
  root: NoteName,
  formulaId: string,
  tuningInput: StringTuning[] | StringCount = 6,
  fretRange?: { min: number; max: number }
): FretMarker[] {
  const formula = CHORD_FORMULAS.find(f => f.id === formulaId);
  if (!formula) return [];

  const tuning = resolveTuning(tuningInput);
  const notes = getChordNotes(root, formula);
  const markers: FretMarker[] = [];

  const minFret = fretRange ? fretRange.min : 0;
  const maxFret = fretRange ? fretRange.max : 15;

  for (let s = 0; s < tuning.length; s++) {
    for (let f = minFret; f <= maxFret; f++) {
      const { note, frequency } = getNoteAtFret(s, f, tuning);
      if (notes.includes(note)) {
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

// Retorna as notas do arpejo em ordem ascendente para reprodução de áudio
export function getArpeggioPlaybackNotes(
  root: NoteName,
  formulaId: string,
  stringCount: StringCount = 6,
  startFret: number = 0
): { note: NoteName; frequency: number; fret: number; stringIndex: number }[] {
  const markers = getArpeggioFretboardMarkers(root, formulaId, stringCount, {
    min: startFret,
    max: startFret + 4
  });

  // Ordena por frequência crescente para soar como um arpejo ascendente natural
  return markers
    .sort((a, b) => a.frequency - b.frequency)
    .map(m => ({
      note: m.note,
      frequency: m.frequency,
      fret: m.fret,
      stringIndex: m.stringIndex
    }));
}
