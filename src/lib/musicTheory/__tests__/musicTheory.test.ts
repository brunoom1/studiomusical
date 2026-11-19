import { describe, it, expect } from 'vitest';
import { transposeNote, identifyInterval, getNoteAtFret, resolveTuning } from '../fretboard';
import { SCALES_DATABASE, getScaleNotes, getScaleFretboardMarkers } from '../scales';
import { generateShapesForChord } from '../chords';
import { getHarmonicField } from '../harmonicField';
import { getArpeggioFretboardMarkers } from '../arpeggios';
import { SAMBA_CHORO_PRESETS } from '../sambaChoroPresets';
import { createStringTuning, GUITAR_TUNING_DROP_D, TUNING_CAVAQUINHO_4 } from '../constants';

describe('Motor de Teoria Musical - Studio Musical', () => {
  it('deve calcular corretamente a transposição cromática', () => {
    expect(transposeNote('C', 2)).toBe('D');
    expect(transposeNote('F', 7)).toBe('C');
    expect(transposeNote('A', 3)).toBe('C');
    expect(transposeNote('E', 1)).toBe('F');
  });

  it('deve suportar afinações e contagens de cordas personalizadas (4, 6 e 7 cordas)', () => {
    // 4 cordas (Cavaquinho)
    const tuning4 = resolveTuning(4);
    expect(tuning4.length).toBe(4);
    expect(tuning4[0].openNote).toBe('D');
    expect(tuning4[1].openNote).toBe('B');

    // 6 cordas (Violão Drop D)
    const noteAtBassOpen = getNoteAtFret(5, 0, GUITAR_TUNING_DROP_D);
    expect(noteAtBassOpen.note).toBe('D');

    // Criação de corda customizada
    const customString = createStringTuning(1, 'G', 4);
    expect(customString.openNote).toBe('G');
    expect(customString.octave).toBe(4);
    expect(customString.midiNumber).toBe(67);
  });

  it('deve gerar markers de escala adaptados para instrumento de 4 cordas', () => {
    const majorScale = SCALES_DATABASE.find(s => s.id === 'major')!;
    const markers = getScaleFretboardMarkers('D', majorScale, TUNING_CAVAQUINHO_4);
    const maxStringIndex = Math.max(...markers.map(m => m.stringIndex));
    expect(maxStringIndex).toBeLessThanOrEqual(3);
    expect(markers.length).toBeGreaterThan(0);
  });

  it('deve gerar corretamente as notas da Escala Maior no Tom de Fá', () => {
    const majorScale = SCALES_DATABASE.find(s => s.id === 'major')!;
    const notesInF = getScaleNotes('F', majorScale);
    expect(notesInF).toEqual(['F', 'G', 'A', 'Bb', 'C', 'D', 'E']);
  });

  it('deve gerar corretamente as notas da Escala Menor Harmônica no Tom de Fá', () => {
    const harmonicMinor = SCALES_DATABASE.find(s => s.id === 'harmonic_minor')!;
    const notesInF = getScaleNotes('F', harmonicMinor);
    // F, G, Ab, Bb, C, Db, E
    expect(notesInF).toEqual(['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'E']);
  });

  it('deve identificar corretamente os intervalos a partir da tônica', () => {
    expect(identifyInterval('C', 'C')).toBe('1');
    expect(identifyInterval('C', 'E')).toBe('3');
    expect(identifyInterval('C', 'Eb')).toBe('b3');
    expect(identifyInterval('C', 'G')).toBe('5');
    expect(identifyInterval('C', 'Bb')).toBe('b7');
    expect(identifyInterval('C', 'B')).toBe('7');
    expect(identifyInterval('C', 'F#')).toBe('b5');
  });

  it('deve calcular o Campo Harmônico Maior de Fá (F)', () => {
    const field = getHarmonicField('F', 'major');
    expect(field.degrees).toHaveLength(7);
    expect(field.degrees[0].chordSymbol).toBe('F7M');
    expect(field.degrees[1].chordSymbol).toBe('Gm7');
    expect(field.degrees[2].chordSymbol).toBe('Am7');
    expect(field.degrees[3].chordSymbol).toBe('Bb7M');
    expect(field.degrees[4].chordSymbol).toBe('C7');
    expect(field.degrees[5].chordSymbol).toBe('Dm7');
    expect(field.degrees[6].chordSymbol).toBe('Em7(b5)');
  });

  it('deve calcular o Campo Harmônico Menor Harmônico de Fá (F)', () => {
    const field = getHarmonicField('F', 'minor_harmonic');
    expect(field.degrees[0].chordSymbol).toBe('Fm(7M)');
    expect(field.degrees[1].chordSymbol).toBe('Gm7(b5)');
    expect(field.degrees[4].chordSymbol).toBe('C7(b9)');
    expect(field.degrees[6].chordSymbol).toBe('Eº');
  });

  it('deve gerar acordes com 7, 7M e diminutos', () => {
    const f7Shapes = generateShapesForChord('F', 'dominant7');
    const f7MShapes = generateShapesForChord('F', 'major7');
    const fDimShapes = generateShapesForChord('F#', 'diminished7');

    expect(f7Shapes.length).toBeGreaterThan(0);
    expect(f7MShapes.length).toBeGreaterThan(0);
    expect(fDimShapes.length).toBeGreaterThan(0);
  });

  it('deve gerar markers de arpejos para tétrades', () => {
    const markers = getArpeggioFretboardMarkers('F', 'major7', 6);
    expect(markers.length).toBeGreaterThan(0);
    const notesInArp = new Set(markers.map(m => m.note));
    expect(notesInArp.has('F')).toBe(true);
    expect(notesInArp.has('A')).toBe(true);
    expect(notesInArp.has('C')).toBe(true);
    expect(notesInArp.has('E')).toBe(true);
  });

  it('deve carregar os presets tradicionais de Samba & Choro para o Tom de Fá', () => {
    const presetF = SAMBA_CHORO_PRESETS.find(p => p.key === 'F');
    expect(presetF).toBeDefined();
    expect(presetF!.steps.length).toBe(4);
    expect(presetF!.steps[0].chord).toBe('F6');
    expect(presetF!.steps[1].chord).toContain('F#º');
    expect(presetF!.steps[2].chord).toBe('Gm7');
    expect(presetF!.steps[3].chord).toContain('C7(13)');
  });
});
