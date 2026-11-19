import { describe, it, expect } from 'vitest';
import { transposeNote, identifyInterval, getNoteAtFret, resolveTuning } from '../fretboard';
import { SCALES_DATABASE, getScaleNotes, getScaleFretboardMarkers, getCagedFretRange } from '../scales';
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

  it('deve gerar cifras/shapes de acordo com a quantidade de cordas selecionada (4, 6 e 7 cordas)', () => {
    // 4 cordas (ex: Cavaquinho / 4 cordas)
    const shapes4 = generateShapesForChord('C', 'major7', 4);
    expect(shapes4.length).toBeGreaterThan(0);
    shapes4.forEach(shape => {
      expect(shape.frets.length).toBe(4);
      expect(shape.stringCount).toBe(4);
    });

    // 6 cordas (Violão padrão)
    const shapes6 = generateShapesForChord('C', 'major7', 6);
    expect(shapes6.length).toBeGreaterThan(0);
    shapes6.forEach(shape => {
      expect(shape.frets.length).toBe(6);
      expect(shape.stringCount).toBe(6);
    });

    // 7 cordas (Violão 7 cordas)
    const shapes7 = generateShapesForChord('C', 'major7', 7);
    expect(shapes7.length).toBeGreaterThan(0);
    shapes7.forEach(shape => {
      expect(shape.frets.length).toBe(7);
      expect(shape.stringCount).toBe(7);
    });
  });

  it('deve consultar o catálogo/dicionário de acordes fixos para 4, 6 e 7 cordas com enarmonia', () => {
    // C Maior Aberto no Violão 6 cordas
    const c6Fixed = generateShapesForChord('C', 'major_triad', 6);
    expect(c6Fixed.some(s => s.name.includes('Aberto'))).toBe(true);
    expect(c6Fixed[0].frets).toEqual([0, 1, 0, 2, 3, null]);

    // G Maior no Cavaquinho (4 cordas soltas)
    const g4Fixed = generateShapesForChord('G', 'major_triad', 4);
    expect(g4Fixed.some(s => s.frets.every(f => f === 0))).toBe(true);

    // C7 com baixaria na 7ª corda solta (C2) no 7 cordas
    const c7Fixed = generateShapesForChord('C', 'dominant7', 7);
    expect(c7Fixed.some(s => s.name.includes('7ª corda'))).toBe(true);
    // 7ª corda é o último índice no array frets (índice 6)
    expect(c7Fixed[0].frets[6]).toBe(0);

    // Enarmonia (Db -> C#)
    const dbFixed = generateShapesForChord('Db', 'major_triad', 6);
    expect(dbFixed.length).toBeGreaterThan(0);
    expect(dbFixed[0].chordSymbol).toBe('Db');
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

  it('deve filtrar com exatidão notas de cordas soltas que não pertencem à tonalidade selecionada', () => {
    const majorScale = SCALES_DATABASE.find(s => s.id === 'major')!;

    // No Tom de Fá Maior (F G A Bb C D E):
    // Cordas do violão: 0: E4, 1: B3, 2: G3, 3: D3, 4: A2, 5: E2
    // A corda 1 solta (B) NÃO pertence à escala de Fá maior (possui Bb)!
    const markersF = getScaleFretboardMarkers('F', majorScale, 6);
    const openMarkersF = markersF.filter(m => m.fret === 0);

    const openStringIndicesF = openMarkersF.map(m => m.stringIndex);
    expect(openStringIndicesF).toContain(0); // E
    expect(openStringIndicesF).not.toContain(1); // B solta NÃO deve estar presente!
    expect(openStringIndicesF).toContain(2); // G
    expect(openStringIndicesF).toContain(3); // D
    expect(openStringIndicesF).toContain(4); // A
    expect(openStringIndicesF).toContain(5); // E

    // E as notas com bemol devem ser grafadas como Bb (não A#)
    const bbMarkers = markersF.filter(m => m.note === 'Bb');
    expect(bbMarkers.length).toBeGreaterThan(0);
    const aSharpMarkers = markersF.filter(m => m.note === 'A#');
    expect(aSharpMarkers.length).toBe(0);

    // No Tom de F# Maior:
    // E natural, G natural, D natural, A natural NÃO pertencem à escala de F# maior!
    // Apenas a corda B solta pertence.
    const markersFSharp = getScaleFretboardMarkers('F#', majorScale, 6);
    const openMarkersFSharp = markersFSharp.filter(m => m.fret === 0);
    const openStringIndicesFSharp = openMarkersFSharp.map(m => m.stringIndex);

    expect(openStringIndicesFSharp).toEqual([1]); // Apenas a corda B (índice 1) solta é válida
  });

  it('deve calcular dinamicamente o alcance de trastes dos shapes CAGED a partir da tônica', () => {
    // Para G Maior: Shape E tem tônica na 6ª corda traste 3 -> casas 3 a 7
    const rangeG = getCagedFretRange('G', 'shape_e');
    expect(rangeG.min).toBe(3);
    expect(rangeG.max).toBe(7);

    // Para A Maior: Shape E tem tônica na 6ª corda traste 5 -> casas 5 a 9
    const rangeA = getCagedFretRange('A', 'shape_e');
    expect(rangeA.min).toBe(5);
    expect(rangeA.max).toBe(9);
  });
});
