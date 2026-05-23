import { bitflag, type Bitflag } from "../lib/bitflag";
import { bitMask, getLeftmostOneBitPosition, isPowerOf2 } from "../lib/bitops";

export class RhythmicObject {
    tags: Bitflag = bitflag();
    duration: NoteDuration;
    constructor(duration: NoteDuration) {
        this.duration = duration;
    }
}
export class Rest extends RhythmicObject {}
export class Note extends RhythmicObject {
    pitch: NotePitch;
    articulation: Articulation;
    dynamic: Dynamic;
    // todo: slurs
    constructor(
        duration: NoteDuration,
        pitch: NotePitch,
        articulation: Articulation,
        dynamic: Dynamic,
    ) {
        super(duration);
        this.pitch = pitch;
        this.articulation = articulation;
        this.dynamic = dynamic;
    }
}

export type NoteDuration = number & { __isNoteDuration: true };
export const QUARTER_NOTE = (1 << 0) as NoteDuration;
export const HALF_NOTE = (1 << 1) as NoteDuration;
export const WHOLE_NOTE = (1 << 2) as NoteDuration;
export const EIGHTH_NOTE = (1 << (0 + 16)) as NoteDuration;
export const SIXTEENTH_NOTE = (1 << (1 + 16)) as NoteDuration;

export function makeNoteDuration(
    wholeDuration: number,
    fracDurationNumerator: number = 0,
    fracDurationDenominator: number = 1,
): NoteDuration {
    // checks if denom is power of 2
    if (!isPowerOf2(fracDurationDenominator)) {
        throw new Error("denom is not power of 2");
    }

    return (wholeDuration |
        (fracDurationNumerator <<
            (16 +
                getLeftmostOneBitPosition(fracDurationDenominator) -
                getLeftmostOneBitPosition(
                    fracDurationNumerator,
                )))) as NoteDuration;
}

export function destructNoteDuration(noteDuration: NoteDuration): {
    wholeBeats: number;
    fracBeatsNumerator: number;
    fracBeatsDenominator: number;
} {
    return {
        wholeBeats: noteDuration & bitMask(16),
        fracBeatsDenominator:
            1 << (getLeftmostOneBitPosition(noteDuration) - 16),
        fracBeatsNumerator: noteDuration >> 16,
    };
}

export type NotePitch = number & { __isNotePitch: true };
const chromaticScaleNotes = {
    c: 0,
    "c#": 1,
    db: 1,
    d: 2,
    "d#": 3,
    eb: 3,
    e: 4,
    f: 5,
    "f#": 6,
    gb: 6,
    g: 7,
    "g#": 8,
    ab: 8,
    a: 9,
    "a#": 10,
    bb: 10,
    b: 11,
} as const;

/// number of semitones from c0
export function makeNotePitch(
    chromaticScaleNote:
        | keyof typeof chromaticScaleNotes
        | Capitalize<keyof typeof chromaticScaleNotes>,
    octave: number,
): NotePitch {
    return (
        chromaticScaleNotes[chromaticScaleNote.toLowerCase()] +
        (octave - 1) * 12
    );
}

export function notePitchToToneHz(notePitch: NotePitch): number {
    return 440 * 2 ** ((notePitch - makeNotePitch("a", 4)) / 12);
}

export type Articulation = number & { __isArticulation: true };
export const STACCATO: Articulation = (1 << 0) as Articulation;

export type Dynamic = number & { __isDynamic: true };
export const dynamics = {
    p: 0 as Dynamic,
    mp: 1 as Dynamic,
    mf: 2 as Dynamic,
    f: 3 as Dynamic,
};
