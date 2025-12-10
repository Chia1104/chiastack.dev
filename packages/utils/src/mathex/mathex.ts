/**
 * Ceil the number to the nearest even number.
 * @param x - The number to ceil.
 * @returns The nearest even number.
 */
export function ceiledEven(x: number): number {
  const ceiled = Math.ceil(x);
  return ceiled % 2 !== 0 ? ceiled - 1 : ceiled;
}

/**
 * Ceil the number to the nearest odd number.
 * @param x - The number to ceil.
 * @returns The nearest odd number.
 */
export function ceiledOdd(x: number): number {
  const ceiled = Math.ceil(x);
  return ceiled % 2 === 0 ? ceiled - 1 : ceiled;
}
