export type MusicAttributes = {
    timeSignature: [number, number];
    keySignature: number;
    tempo: number;
};

export type TimeSignature = [number, number] & { __isTimeSignature: true }; 
export type KeySignature = number & { __isKeySignature: true };  
