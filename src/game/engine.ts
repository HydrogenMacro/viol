import type { MusicAttributes } from "./musicAttributes";
import { Note, notePitchToToneHz, type NotePitch } from "./note";

export class ViolEngine {
    currentMap: ViolMusic;
    noteSource: OscillatorNode = playTone(0);
    play(note: NotePitch) {
        this.noteSource.stop();
        this.noteSource.disconnect();
        this.noteSource = playTone(notePitchToToneHz(note));
    }
    stop() {
        this.noteSource.stop();
        this.noteSource.disconnect();
        this.noteSource = playTone(0);
    }
}


export class ViolMusic {
    initialAttributes: MusicAttributes;
    duration: number;
    notes: Array<Note>;
    measureAttributeChanges: Map<number, Partial<MusicAttributes>>;
}

const audioCtx = new AudioContext();

function playTone(hertz: number): OscillatorNode {
    const oscillator = audioCtx.createOscillator();

    // Set the exact frequency
    oscillator.type = "sawtooth"; // Can also be 'square', 'triangle', or 'sawtooth'
    oscillator.frequency.value = hertz;

    // Connect to the speakers and play
    oscillator.connect(audioCtx.destination);

    oscillator.frequency.value = hertz;
    oscillator.start();

    return oscillator;
}
