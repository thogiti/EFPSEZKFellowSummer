# Exercises

## Written Questions

1. **Symmetric vs. Asymmetric Encryption**: What are the key differences between symmetric and asymmetric encryption? Provide a practical use case for each.

The key difference between symmetric and asymmetric encryption is that symmetric encryption uses the same key to encrypt and decrypt data, while asymmetric encryption uses a pair of keys, one public and one private, to do so. A practical use case for symmetric encryption is to encrypt data at rest, such as files stored on a hard drive or a cloud service, using a secret key that only the owner knows. A practical use case for asymmetric encryption is to encrypt data in transit, such as messages sent over the internet, using the public key of the recipient, who can then decrypt it with their private key.

2. **Public-Key Cryptography and Key Exchange Protocols**: How can the Diffie-Hellman protocol enhance security in a messaging application?

The Diffie-Hellman protocol is a key exchange protocol that allows two parties, each having an elliptic-curve public-private key pair, to establish a shared secret over an insecure channel. This shared secret can then be used to encrypt subsequent communications using a symmetric-key cipher. A messaging application can use the Diffie-Hellman protocol to enhance security by enabling end-to-end encryption between users, without relying on a trusted third party or exposing the keys to eavesdroppers or hackers.

3. **Hash Functions**: What features make SHA-256 and Poseidon good hash functions for ensuring data integrity? Mention one unique advantage of Poseidon.

SHA-256 and Poseidon are good hash functions for ensuring data integrity because they have the following features: they are deterministic, meaning that the same input always produces the same output; they are one-way, meaning that it is hard to find the input from the output; they are collision-resistant, meaning that it is hard to find two different inputs that produce the same output; and they are fast and efficient, meaning that they can process large amounts of data quickly and with low computational cost. One unique advantage of Poseidon is that it is designed to work natively with $GF(p)$ objects, which are used in many cryptographic protocols such as zero-knowledge proofs and verifiable secret sharing. This makes Poseidon more suitable for applications that require arithmetic operations on large prime fields.

4. **Merkle Trees**: Explain how Merkle trees can help verify data in a large database efficiently.

Merkle trees are data structures that use hash functions to efficiently summarize and verify large data sets. They are trees in which every leaf node is a hash of a data block, and every non-leaf node is a hash of its child nodes. Merkle trees can help verify data in a large database efficiently by allowing users to check only a small portion of the tree, instead of the whole data set, to prove that a certain data block is part of the database. For example, if a user wants to verify that a transaction is included in a block of a blockchain, they only need to obtain the hash of the transaction, the hashes of its sibling nodes along the path to the root, and the root hash of the tree. Then they can compute and compare the hashes along the path and verify that they match with the root hash.

5. **Cryptographic Commitments**: How can Pedersen Commitments be used in a blockchain protocol to maintain transaction privacy?

Pedersen commitments are cryptographic algorithms that allow a prover to commit to a certain value without revealing it or being able to change it. They use a public group of large order and two random public generators to create a commitment as follows: $c = g^x * h^r\ mod\ p$, where $x$ is the secret value, $r$ is a random number, and $c$ is the commitment. Pedersen commitments can be used in a blockchain protocol to maintain transaction privacy by hiding the amounts of inputs and outputs in each transaction. The prover can later reveal $x$ and $r$ to prove that they know the value and that it matches with the commitment. Pedersen commitments also allow for homomorphic operations and zero-knowledge proofs on the committed values.

6. **Digital Signatures**: How can you verify the authenticity of a digitally signed document?

A digital signature is a cryptographic technique that allows a sender to sign a document with their private key and prove their identity and authenticity to a receiver who has their public key. To verify the authenticity of a digitally signed document, the receiver can perform the following steps: 

1. They can obtain the sender’s public key from a trusted source or authority
2. They can use the public key to decrypt the signature attached to the document 
3. They can use a hash function to compute the hash of the document 
4. They can compare the decrypted signature with the computed hash and check if they match. 

If they match, then it means that the document was signed by the sender and was not tampered with during transmission.

## Programming Challenges

In these challenges, you’ll implement cryptographic methods in a Node.js environment. You will need the following packages, which you can install using NPM:

```
npm install merkletreejs poseidon-encryption ffjavascript

```

### Challenge 1 Asymmetric Encryption and Digital Signature

In this challenge, you will use the `crypto` built-in library in Node.js to implement asymmetric encryption. Your task is to encrypt and decrypt some sample text, generate a digital signature for the encrypted message, and then verify it. This simulates a secure message exchange where you want to ensure the confidentiality and authenticity of the messages.

Tip: The crypto library has specific functions for encryption, decryption, signing, and verifying. Look up the library documentation for examples and usage [here](https://nodejs.org/api/crypto.html).


```javascript
const crypto = require('crypto');

// Asymmetric encryption
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

// Encrypt
const plaintext = 'This is a secret message.';
// INFO: Use the publicKey to encrypt the plaintext message. Remember that RSA encryption is public key encryption.
// https://nodejs.org/api/crypto.html#cryptopublicencryptkey-buffer
const encryptedText = crypto.publicEncrypt(publicKey, plaintext)
console.log(encryptedText)

// Decrypt
// INFO: Use the privateKey to decrypt the encrypted message. The result should be the original plaintext.
// https://nodejs.org/api/crypto.html#cryptopublicdecryptkey-buffer
const decryptedText = crypto.privateDecrypt(privateKey, encryptedText).toString('utf8')
console.log(decryptedText)

console.log(plaintext == decryptedText)

// Create a digital signature
const sign = crypto.createSign('SHA256');
sign.update(plaintext);
sign.end();
// INFO: Use the privateKey to sign the plaintext message. This will generate a digital signature.
// https://nodejs.org/api/crypto.html#signsignprivatekey-outputencoding
const signData = sign.sign(privateKey)

// Verify a digital signature
const verify = crypto.createVerify('SHA256');
verify.update(plaintext);
verify.end();
// INFO: Use the publicKey to verify the signature. It should return true if the signature is valid.
// https://nodejs.org/api/crypto.html#verifyverifyobject-signature-signatureencoding
const result = verify.verify(publicKey, signData)
console.log(result)

```

### Challenge 2 Hashing with SHA-256 and Poseidon

For this challenge, your task is to compute the SHA-256 and Poseidon hashes of some input data. You will then observe how the hash value changes drastically even with a small change in the input data. This is an important property of cryptographic hash functions called [“avalanche effect”](https://en.wikipedia.org/wiki/Avalanche_effect).


Tip: Use the `.digest('hex')` method of the `hash` object to print the hash in a human-readable format. As for the `poseidon-encryption` package, there lacks good documentation but have a look at the source code here for some hints (pay special attention to the tests for example usage).

```javascript
const crypto = require("crypto");
const poseidon = require("poseidon-encryption");

// SHA-256
const data = "This is some data X.";

// INFO: Compute the SHA-256 hash of the data and print it. Try changing the data slightly and observe the changes in the hash.
const hash = crypto.createHash('sha256').update(data).digest('hex')
console.log(hash)

const data1 = "This is some data X";
const hash1 = crypto.createHash('sha256').update(data1).digest('hex')
console.log(hash1)

const data2 = "ThiS is some data X";
const hash2 = crypto.createHash('sha256').update(data2).digest('hex')
console.log(hash2)


// Poseidon
const inputs = [1, 2, 3, 4];
// INFO: Compute the Poseidon hash of the inputs and print it. Remember that Poseidon accepts an array of integers as input
const res = poseidon.poseidon(inputs).toString(16)
console.log(res)
```

### Challenge 3 Using a Simple Merkle Tree

In this challenge, you will use the ‘merkletreejs’ library to construct a simple Merkle Tree from some input data. You will then generate a proof for a leaf node and verify it. This task is analogous to verifying a transaction in a block in a blockchain.


Tip: Refer to the `merkletreejs` library [documentation](https://github.com/merkletreejs/merkletreejs) for the functions needed to build the tree, generate the proof, and verify it.

```javascript
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

```

### Challenge 4 Implementing Pedersen Commitments

This challenge is a little more involved, but should be more rewarding. Here, you will be creating a Javascript object capable of Pedersen Commitments. This template should get you started:

If everything worked properly, the final output should read:

```
Verification:  true
```

```javascript
class PedersenCommitment {
    constructor() {
      // Set prime number (p) and generator (g)
      this.p = BigInt(23); // use a large prime in a real-world scenario
      this.g = BigInt(4); // use a large number in a real-world scenario
      this.h = null;
      this.r = null;
      this.s = null;
    }

    // Generate 'h' with a random number 'r' (h = g^r mod p)
    generateH() {
      // TODO: Generate a random number r (and save it to this.r)
      // https://asecuritysite.com/encryption/ped
      const q = BigInt(2) * this.p + BigInt(1)

      this.r = Math.floor(Math.random() * Number(q)-1 + 1)
      // TODO: Calculate h using g, r and p (and save it to this.h)
      this.h = BigInt(this.g) ** BigInt(this.r) % BigInt(this.p);
    }

    // Generate the commitment (g^s * h^r mod p)
    generateCommitment(s) {
      // TODO: Convert s to BigInt (and save it to this.s)
      this.s = BigInt(s)
      // TODO: Calculate and return the commitment using g, s, h, r and p
      return (BigInt(this.g) ** BigInt(this.s) * BigInt(this.h) ** BigInt(this.r)) % BigInt(this.p)
    }

    // Reveal the secret number and random number (s, r)
    reveal() {
      // TODO: Return the secret and random number
      return { s: this.s, r: this.r }
    }

    // Verify the commitment (g^s * h^r mod p)
    verify(s, r, C) {
      // TODO: Verify the commitment by recalculating it and comparing with C
      return C == BigInt(this.g) ** BigInt(s) * BigInt(this.h) ** BigInt(r) % BigInt(this.p)
    }
  }

  // Test the PedersenCommitment
  const pc = new PedersenCommitment();
  pc.generateH();

  // Party A: Generate a commitment
  let secretNumber = 7;
  let commitment = pc.generateCommitment(secretNumber);
  console.log("Commitment: ", commitment.toString());

  // Party A: Reveal the secret and random number
  let reveal = pc.reveal();
  console.log("Revealed S: ", reveal.s.toString());
  console.log("Revealed R: ", reveal.r.toString());

  // Party B: Verify the commitment
  let verification = pc.verify(reveal.s, reveal.r, commitment);
  console.log("Verification: ", verification);
  
```
