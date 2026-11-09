const { expect } = require('chai');
const { AvlTree } = require('../src/avlTree');

function expectValid(tree, values) {
  const sorted = [...values].sort((a, b) => a - b);
  const seen = new Set();
  const actual = [];
  const visit = (node, parent, low, high) => {
    if (node === null) return 0;
    expect(seen.has(node)).to.equal(false);
    seen.add(node);
    const value = node.getValue();
    expect(value).to.be.above(low).and.below(high);
    expect(node.getParent()).to.equal(parent);
    const leftHeight = visit(node.getLeft(), node, low, value);
    actual.push(value);
    const rightHeight = visit(node.getRight(), node, value, high);
    const height = 1 + Math.max(leftHeight, rightHeight);
    expect(node.getHeight()).to.equal(height);
    expect(Math.abs(leftHeight - rightHeight), `balance at ${value}`).to.be.at.most(1);
    expect(node.getBalance()).to.equal(leftHeight - rightHeight);
    return height;
  };
  visit(tree.root(), null, -Infinity, Infinity);
  expect(actual).to.deep.equal(sorted);
  expect(tree.count()).to.equal(values.size);
  const valueOf = (node) => (node === null ? null : node.getValue());
  expect(valueOf(tree.min())).to.equal(sorted.length ? sorted[0] : null);
  expect(valueOf(tree.max())).to.equal(sorted.length ? sorted[sorted.length - 1] : null);
  for (let query = -1; query <= 15; query += 0.5) {
    expect(tree.has(query)).to.equal(values.has(query));
    expect(valueOf(tree.find(query))).to.equal(values.has(query) ? query : null);
    [true, false].forEach((inclusive) => {
      const lower = sorted.filter((value) => (inclusive ? value <= query : value < query));
      const upper = sorted.filter((value) => (inclusive ? value >= query : value > query));
      expect(valueOf(tree.lowerBound(query, inclusive)))
        .to.equal(lower.length ? lower[lower.length - 1] : null);
      expect(valueOf(tree.upperBound(query, inclusive))).to.equal(upper.length ? upper[0] : null);
    });
  }
}

describe('AvlTree reference removal invariants', () => {
  ['insert', 'insertIterative'].forEach((insert) => {
    const cases = [
      { name: 'rebalance after leaf removal', keys: [0, 1, 2, 3], removes: [0] },
      { name: 'remove a non-root with a left child', keys: [3, 1, 5, 0], removes: [1] },
      { name: 'remove a non-root with a right child', keys: [3, 1, 5, 6], removes: [5] },
      { name: 'remove a leaf root', keys: [0], removes: [0] },
      { name: 'remove a root with a left child', keys: [1, 0], removes: [1] },
      { name: 'remove a root with a right child', keys: [0, 1], removes: [0] },
      { name: 'remove a root with two children', keys: [3, 1, 5, 0, 2, 4, 6], removes: [3] },
      {
        name: 'rebalance the successor path and successive ancestors',
        keys: [7, 3, 11, 1, 5, 9, 13, 0, 2, 4, 6, 8, 10, 12, 14],
        removes: [7, 1, 5, 3, 4, 9, 13, 11, 12, 8, 10, 0, 2, 6, 14]
      }
    ];
    cases.forEach(({ name, keys, removes }) => {
      it(`${insert}: ${name}`, () => {
        const tree = new AvlTree();
        const values = new Set(keys);
        keys.forEach((value) => tree[insert](value));
        expectValid(tree, values);
        removes.forEach((value) => {
          const node = tree.find(value);
          expect(node).not.to.equal(null);
          expect(tree.removeNode(node)).to.equal(true);
          values.delete(value);
          expectValid(tree, values);
        });
      });
    });
  });
});
