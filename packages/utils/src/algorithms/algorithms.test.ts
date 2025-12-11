import { describe, it, expect, vi } from "vitest";

import {
  TreeNode,
  dfs,
  dfsIterative,
  bfs,
  createTreeNode,
  lowerBound,
  upperBound,
} from "./algorithms";

describe("TreeNode", () => {
  it("should create a node with default values", () => {
    const node = new TreeNode();
    expect(node.val).toBe(0);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  it("should create a node with specified value", () => {
    const node = new TreeNode(5);
    expect(node.val).toBe(5);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  it("should create a node with null value (defaults to 0)", () => {
    const node = new TreeNode(null);
    expect(node.val).toBe(0);
  });

  it("should create a node with left and right children", () => {
    const left = new TreeNode(2);
    const right = new TreeNode(3);
    const node = new TreeNode(1, left, right);
    expect(node.val).toBe(1);
    expect(node.left).toBe(left);
    expect(node.right).toBe(right);
  });
});

describe("createTreeNode", () => {
  it("should return null for empty array", () => {
    const result = createTreeNode([]);
    expect(result).toBeNull();
  });

  it("should return null if first element is null", () => {
    const result = createTreeNode([null]);
    expect(result).toBeNull();
  });

  it("should create a single node tree", () => {
    const result = createTreeNode([1]);
    expect(result).not.toBeNull();
    expect(result?.val).toBe(1);
    expect(result?.left).toBeNull();
    expect(result?.right).toBeNull();
  });

  it("should create a complete binary tree", () => {
    //       1
    //      / \
    //     2   3
    //    / \ / \
    //   4  5 6  7
    const result = createTreeNode([1, 2, 3, 4, 5, 6, 7]);
    expect(result?.val).toBe(1);
    expect(result?.left?.val).toBe(2);
    expect(result?.right?.val).toBe(3);
    expect(result?.left?.left?.val).toBe(4);
    expect(result?.left?.right?.val).toBe(5);
    expect(result?.right?.left?.val).toBe(6);
    expect(result?.right?.right?.val).toBe(7);
  });

  it("should create a tree with null children", () => {
    //       1
    //      / \
    //     2   3
    //        /
    //       6
    const result = createTreeNode([1, 2, 3, null, null, 6]);
    expect(result?.val).toBe(1);
    expect(result?.left?.val).toBe(2);
    expect(result?.right?.val).toBe(3);
    expect(result?.left?.left).toBeNull();
    expect(result?.left?.right).toBeNull();
    expect(result?.right?.left?.val).toBe(6);
  });
});

describe("dfs (recursive)", () => {
  it("should handle null node", () => {
    const onEnter = vi.fn();
    dfs(null, onEnter);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it("should traverse nodes in preorder (onEnter)", () => {
    //       1
    //      / \
    //     2   3
    const root = createTreeNode([1, 2, 3]);
    const values: number[] = [];
    dfs(root, (node) => values.push(node.val));
    expect(values).toEqual([1, 2, 3]);
  });

  it("should traverse nodes in postorder (onLeave)", () => {
    //       1
    //      / \
    //     2   3
    const root = createTreeNode([1, 2, 3]);
    const values: number[] = [];
    dfs(
      root,
      () => {
        /* empty */
      },
      (node) => values.push(node.val)
    );
    expect(values).toEqual([2, 3, 1]);
  });

  it("should call both onEnter and onLeave", () => {
    //       1
    //      / \
    //     2   3
    const root = createTreeNode([1, 2, 3]);
    const enterValues: number[] = [];
    const leaveValues: number[] = [];
    dfs(
      root,
      (node) => enterValues.push(node.val),
      (node) => leaveValues.push(node.val)
    );
    expect(enterValues).toEqual([1, 2, 3]);
    expect(leaveValues).toEqual([2, 3, 1]);
  });

  it("should traverse a more complex tree correctly", () => {
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    const root = createTreeNode([1, 2, 3, 4, 5]);
    const values: number[] = [];
    dfs(root, (node) => values.push(node.val));
    expect(values).toEqual([1, 2, 4, 5, 3]);
  });
});

describe("dfsIterative", () => {
  it("should handle null node", () => {
    const onEnter = vi.fn();
    dfsIterative(null, onEnter);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it("should traverse nodes in preorder (onEnter)", () => {
    //       1
    //      / \
    //     2   3
    const root = createTreeNode([1, 2, 3]);
    const values: number[] = [];
    dfsIterative(root, (node) => values.push(node.val));
    expect(values).toEqual([1, 2, 3]);
  });

  it("should traverse nodes in postorder (onLeave)", () => {
    //       1
    //      / \
    //     2   3
    const root = createTreeNode([1, 2, 3]);
    const values: number[] = [];
    dfsIterative(
      root,
      () => {
        /* empty */
      },
      (node) => values.push(node.val)
    );
    expect(values).toEqual([2, 3, 1]);
  });

  it("should call both onEnter and onLeave", () => {
    //       1
    //      / \
    //     2   3
    const root = createTreeNode([1, 2, 3]);
    const enterValues: number[] = [];
    const leaveValues: number[] = [];
    dfsIterative(
      root,
      (node) => enterValues.push(node.val),
      (node) => leaveValues.push(node.val)
    );
    expect(enterValues).toEqual([1, 2, 3]);
    expect(leaveValues).toEqual([2, 3, 1]);
  });

  it("should produce same result as recursive dfs", () => {
    const root = createTreeNode([1, 2, 3, 4, 5, 6, 7]);
    const recursiveEnter: number[] = [];
    const recursiveLeave: number[] = [];
    const iterativeEnter: number[] = [];
    const iterativeLeave: number[] = [];

    dfs(
      root,
      (node) => recursiveEnter.push(node.val),
      (node) => recursiveLeave.push(node.val)
    );

    dfsIterative(
      root,
      (node) => iterativeEnter.push(node.val),
      (node) => iterativeLeave.push(node.val)
    );

    expect(iterativeEnter).toEqual(recursiveEnter);
    expect(iterativeLeave).toEqual(recursiveLeave);
  });
});

describe("bfs", () => {
  it("should handle null node", () => {
    const callback = vi.fn();
    bfs(null, callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should traverse nodes in level order", () => {
    //       1
    //      / \
    //     2   3
    //    / \ / \
    //   4  5 6  7
    const root = createTreeNode([1, 2, 3, 4, 5, 6, 7]);
    const values: number[] = [];
    bfs(root, (node) => values.push(node.val));
    expect(values).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should traverse single node", () => {
    const root = createTreeNode([1]);
    const values: number[] = [];
    bfs(root, (node) => values.push(node.val));
    expect(values).toEqual([1]);
  });

  it("should handle tree with null children", () => {
    //       1
    //      / \
    //     2   3
    //        /
    //       6
    const root = createTreeNode([1, 2, 3, null, null, 6]);
    const values: number[] = [];
    bfs(root, (node) => values.push(node.val));
    expect(values).toEqual([1, 2, 3, 6]);
  });

  it("should traverse left-skewed tree", () => {
    //     1
    //    /
    //   2
    //  /
    // 3
    const root = createTreeNode([1, 2, null, 3]);
    const values: number[] = [];
    bfs(root, (node) => values.push(node.val));
    expect(values).toEqual([1, 2, 3]);
  });

  it("should traverse right-skewed tree", () => {
    //  1
    //   \
    //    2
    //     \
    //      3
    const root = createTreeNode([1, null, 2, null, 3]);
    const values: number[] = [];
    bfs(root, (node) => values.push(node.val));
    expect(values).toEqual([1, 2, 3]);
  });
});

const numCompare = (a: number, b: number) => a < b;

describe("lowerBound", () => {
  it("should return 0 for empty array", () => {
    const result = lowerBound([], 5, numCompare);
    expect(result).toBe(0);
  });

  it("should find first element >= value", () => {
    const arr = [1, 2, 4, 4, 4, 6, 8];
    expect(lowerBound(arr, 4, numCompare)).toBe(2);
  });

  it("should return insertion point for non-existing value", () => {
    const arr = [1, 2, 4, 6, 8];
    // 5 不存在，應該回傳 3（第一個 >= 5 的位置，即 6 的位置）
    expect(lowerBound(arr, 5, numCompare)).toBe(3);
  });

  it("should return 0 when value is smaller than all elements", () => {
    const arr = [5, 6, 7, 8];
    expect(lowerBound(arr, 1, numCompare)).toBe(0);
  });

  it("should return array length when value is greater than all elements", () => {
    const arr = [1, 2, 3, 4];
    expect(lowerBound(arr, 10, numCompare)).toBe(4);
  });

  it("should work with single element array", () => {
    expect(lowerBound([5], 3, numCompare)).toBe(0);
    expect(lowerBound([5], 5, numCompare)).toBe(0);
    expect(lowerBound([5], 7, numCompare)).toBe(1);
  });

  it("should respect start and to parameters", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    // 在索引 2~5 範圍內搜尋 4
    expect(lowerBound(arr, 4, numCompare, 2, 5)).toBe(3);
  });

  it("should handle array with zero values", () => {
    const arr = [0, 0, 1, 2, 3];
    expect(lowerBound(arr, 0, numCompare)).toBe(0);
    expect(lowerBound(arr, 1, numCompare)).toBe(2);
  });
});

describe("upperBound", () => {
  it("should return 0 for empty array", () => {
    const result = upperBound([], 5, numCompare);
    expect(result).toBe(0);
  });

  it("should find first element > value", () => {
    const arr = [1, 2, 4, 4, 4, 6, 8];
    expect(upperBound(arr, 4, numCompare)).toBe(5);
  });

  it("should return insertion point for non-existing value", () => {
    const arr = [1, 2, 4, 6, 8];
    // 5 不存在，應該回傳 3（第一個 > 5 的位置，即 6 的位置）
    expect(upperBound(arr, 5, numCompare)).toBe(3);
  });

  it("should return 0 when value is smaller than all elements", () => {
    const arr = [5, 6, 7, 8];
    expect(upperBound(arr, 1, numCompare)).toBe(0);
  });

  it("should return array length when value is greater than or equal to all elements", () => {
    const arr = [1, 2, 3, 4];
    expect(upperBound(arr, 4, numCompare)).toBe(4);
    expect(upperBound(arr, 10, numCompare)).toBe(4);
  });

  it("should work with single element array", () => {
    expect(upperBound([5], 3, numCompare)).toBe(0);
    expect(upperBound([5], 5, numCompare)).toBe(1);
    expect(upperBound([5], 7, numCompare)).toBe(1);
  });

  it("should respect start and to parameters", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    // 在索引 2~6 範圍內搜尋 4
    expect(upperBound(arr, 4, numCompare, 2, 6)).toBe(4);
  });

  it("should handle array with zero values", () => {
    const arr = [0, 0, 1, 2, 3];
    expect(upperBound(arr, 0, numCompare)).toBe(2);
    expect(upperBound(arr, 1, numCompare)).toBe(3);
  });
});

describe("lowerBound and upperBound together", () => {
  it("should count occurrences of a value", () => {
    const arr = [1, 2, 4, 4, 4, 6, 8];
    const count =
      upperBound(arr, 4, numCompare) - lowerBound(arr, 4, numCompare);
    expect(count).toBe(3);
  });

  it("should return 0 count for non-existing value", () => {
    const arr = [1, 2, 4, 6, 8];
    const count =
      upperBound(arr, 5, numCompare) - lowerBound(arr, 5, numCompare);
    expect(count).toBe(0);
  });

  it("should find range of duplicates", () => {
    const arr = [1, 1, 1, 2, 2, 3, 3, 3, 3];
    // 找出所有 3 的範圍
    const lower = lowerBound(arr, 3, numCompare);
    const upper = upperBound(arr, 3, numCompare);
    expect(lower).toBe(5);
    expect(upper).toBe(9);
    expect(arr.slice(lower, upper)).toEqual([3, 3, 3, 3]);
  });

  it("should work with custom objects", () => {
    interface Item {
      id: number;
      name: string;
    }
    const arr: Item[] = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 3, name: "c" },
      { id: 3, name: "d" },
      { id: 5, name: "e" },
    ];
    const compareById = (a: Item, b: Item) => a.id < b.id;
    const searchValue: Item = { id: 3, name: "" };

    expect(lowerBound(arr, searchValue, compareById)).toBe(2);
    expect(upperBound(arr, searchValue, compareById)).toBe(4);
  });
});
