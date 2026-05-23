export function isPowerOf2(n: number) {
    return n > 0 && (n & (n - 1)) === 0;
}

export function getLeftmostOneBitPosition(n: number): number {
    return 32 - Math.clz32(n);
}

export function bitMask(len: number): number {
    return (len << 1) - 1;
}
