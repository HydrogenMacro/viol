export type Bitflag = number & { __isBitflag: true };

export function bitflag(n: number = 0): Bitflag {
    return n as Bitflag;
}
export function hasBit(bitflag: Bitflag, idx: number): boolean {
    return (bitflag & (1 << idx)) != 0;
}
export function setBit(bitflag: Bitflag, idx: number) {
    (bitflag as number) |= (1 << idx);
}

export function clearBit(bitflag: Bitflag, idx: number) {
    (bitflag as number) &= ~(1 << idx);
} 