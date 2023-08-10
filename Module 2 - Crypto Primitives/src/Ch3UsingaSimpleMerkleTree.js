const MerkleTree = require('merkletreejs');
const crypto = require('crypto');
const SHA256 = require('crypto-js/sha256')

function hashFunction(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
}

// Create tree
const leaves = ['a', 'b', 'c', 'd'].map(x => hashFunction(x));
// INFO: Build the Merkle tree using the leaves and hashFunction. Compute the root of the tree and print it.
const tree = new MerkleTree.MerkleTree(leaves, SHA256)
const root = tree.getRoot().toString('hex')
console.log(root)

// Generate and verify proof
// INFO: Generate a proof for the leaf 'b' and verify it against the root of the tree. It should return true if the leaf is part of the tree.
const leaf = hashFunction('b');
const proof = tree.getProof(leaf)
console.log(tree.verify(proof, leaf, root))