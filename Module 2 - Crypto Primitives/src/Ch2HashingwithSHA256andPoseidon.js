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