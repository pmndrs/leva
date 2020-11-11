export const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x))
export const floor = (min: number, x: number) => Math.max(min, Math.floor(x))
export const pad = (x: number, pad: number) => String(x).padStart(pad, '0')
