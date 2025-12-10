/**
 * Tree node class.
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(
    val?: number | null,
    left?: TreeNode | null,
    right?: TreeNode | null
  ) {
    this.val = val === undefined ? 0 : (val ?? 0);
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * Depth-first search.
 * @param node - The root node.
 * @param onEnter - The callback function to call when entering a node.
 * @param onLeave - The callback function to call when leaving a node.
 */
export const dfs = (
  node: TreeNode | null,
  onEnter: (node: TreeNode) => void,
  onLeave?: (node: TreeNode) => void
) => {
  if (node === null) return;
  onEnter(node);
  dfs(node.left, onEnter, onLeave);
  dfs(node.right, onEnter, onLeave);
  onLeave?.(node);
};

/**
 * Depth-first search iterative.
 * @param node - The root node.
 * @param onEnter - The callback function to call when entering a node.
 * @param onLeave - The callback function to call when leaving a node.
 */
export const dfsIterative = (
  node: TreeNode | null,
  onEnter: (node: TreeNode) => void,
  onLeave?: (node: TreeNode) => void
) => {
  if (node === null) return;
  const stack: [TreeNode, boolean][] = [[node, false]];
  while (stack.length > 0) {
    const item = stack.pop();
    if (item === undefined) continue;
    const [current, visited] = item;
    if (visited) {
      onLeave?.(current);
    } else {
      stack.push([current, true]);
      if (current.right) stack.push([current.right, false]);
      if (current.left) stack.push([current.left, false]);
      onEnter(current);
    }
  }
};

/**
 * Breadth-first search.
 * @param node - The root node.
 * @param callback - The callback function to call when visiting a node.
 */
export const bfs = (
  node: TreeNode | null,
  callback: (node: TreeNode) => void
) => {
  if (node === null) return;
  const queue: TreeNode[] = [node];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) continue;
    callback(current);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
};

/**
 * Create a tree node from an array of values.
 * @param values - The array of values.
 * @returns The root node.
 */
export const createTreeNode = (values: (number | null)[]): TreeNode | null => {
  if (values.length === 0 || values[0] === null) return null;

  const root = new TreeNode(values[0]);
  const queue: TreeNode[] = [root];
  let index = 1;

  while (index < values.length) {
    const node = queue.shift();
    if (node === undefined) continue;

    if (index < values.length) {
      const leftVal = values[index++];
      if (leftVal !== null) {
        node.left = new TreeNode(leftVal);
        queue.push(node.left);
      }
    }

    if (index < values.length) {
      const rightVal = values[index++];
      if (rightVal !== null) {
        node.right = new TreeNode(rightVal);
        queue.push(node.right);
      }
    }
  }

  return root;
};

/**
 * Comparator type for bound functions.
 * Returns true if first argument should be ordered before second argument.
 * For numeric arrays: (a, b) => a < b
 */
export type BoundComparatorType<T> = (a: T, b: T) => boolean;

/**
 * Lower bound - finds the first element that is NOT less than value.
 * Uses binary search on a sorted array.
 *
 * @param arr - The sorted array to search.
 * @param value - The value to compare.
 * @param compare - Comparator function: (a, b) => a < b
 * @param start - The start index (inclusive).
 * @param to - The end index (exclusive).
 * @returns The index of the first element >= value, or `to` if not found.
 *
 * @example
 * ```ts
 * const arr = [1, 2, 4, 4, 4, 6, 8];
 * const compare = (a: number, b: number) => a < b;
 *
 * lowerBound(arr, 4, compare); // 2 (first element >= 4)
 * lowerBound(arr, 5, compare); // 5 (first element >= 5, which is 6)
 * lowerBound(arr, 0, compare); // 0 (all elements >= 0)
 * lowerBound(arr, 9, compare); // 7 (no element >= 9)
 * ```
 */
export function lowerBound<T>(
  arr: readonly T[],
  value: T,
  compare: BoundComparatorType<T>,
  start = 0,
  to: number = arr.length
): number {
  let count = to - start;
  while (count > 0) {
    const step = count >> 1;
    const mid = start + step;
    const element = arr[mid];
    if (element !== undefined && compare(element, value)) {
      // arr[mid] < value, search right half
      start = mid + 1;
      count -= step + 1;
    } else {
      // arr[mid] >= value, search left half
      count = step;
    }
  }
  return start;
}

/**
 * Upper bound - finds the first element that is greater than value.
 * Uses binary search on a sorted array.
 *
 * @param arr - The sorted array to search.
 * @param value - The value to compare.
 * @param compare - Comparator function: (a, b) => a < b (same as lowerBound!)
 * @param start - The start index (inclusive).
 * @param to - The end index (exclusive).
 * @returns The index of the first element > value, or `to` if not found.
 *
 * @example
 * ```ts
 * const arr = [1, 2, 4, 4, 4, 6, 8];
 * const compare = (a: number, b: number) => a < b;
 *
 * upperBound(arr, 4, compare); // 5 (first element > 4, which is 6)
 * upperBound(arr, 5, compare); // 5 (first element > 5, which is 6)
 * upperBound(arr, 0, compare); // 0 (all elements > 0)
 * upperBound(arr, 8, compare); // 7 (no element > 8)
 *
 * // Count occurrences of 4:
 * upperBound(arr, 4, compare) - lowerBound(arr, 4, compare); // 3
 * ```
 */
export function upperBound<T>(
  arr: readonly T[],
  value: T,
  compare: BoundComparatorType<T>,
  start = 0,
  to: number = arr.length
): number {
  let count = to - start;
  while (count > 0) {
    const step = count >> 1;
    const mid = start + step;
    const element = arr[mid];
    if (element !== undefined && !compare(value, element)) {
      // value >= arr[mid], search right half
      start = mid + 1;
      count -= step + 1;
    } else {
      // value < arr[mid], search left half
      count = step;
    }
  }
  return start;
}
