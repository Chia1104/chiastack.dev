export const generateWinPatterns = (size: number) => {
  const patterns: number[][] = [];

  // 生成行的勝利模式
  for (let row = 0; row < size; row++) {
    const pattern: number[] = [];
    for (let col = 0; col < size; col++) {
      pattern.push(row * size + col);
    }
    patterns.push(pattern);
  }

  // 生成列的勝利模式
  for (let col = 0; col < size; col++) {
    const pattern: number[] = [];
    for (let row = 0; row < size; row++) {
      pattern.push(row * size + col);
    }
    patterns.push(pattern);
  }

  // 生成主對角線的勝利模式
  const mainDiagonal: number[] = [];
  for (let i = 0; i < size; i++) {
    mainDiagonal.push(i * size + i);
  }
  patterns.push(mainDiagonal);

  // 生成副對角線的勝利模式
  const antiDiagonal: number[] = [];
  for (let i = 0; i < size; i++) {
    antiDiagonal.push(i * size + (size - 1 - i));
  }
  patterns.push(antiDiagonal);

  return patterns;
};
