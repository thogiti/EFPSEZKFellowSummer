// This script is used to modify the verifier contracts generated by snarkjs
// It replaces the solidity version and the contract name to match the desired ones

// Import the file system module
const fs = require("fs");

// Define the regular expressions to match the solidity version and the contract name
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/
const groth16VerifierRegex = /contract Groth16Verifier/
const plonkVerifierRegex = /contract PlonkVerifier/

// Read the content of HelloWorldVerifier.sol file
let content = fs.readFileSync("./contracts/HelloWorldVerifier.sol", { encoding: 'utf-8' });

// Replace the solidity version with ^0.8.0
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.0');

// Replace the contract name with HelloWorldVerifier
bumped = bumped.replace(groth16VerifierRegex, 'contract HelloWorldVerifier');

// Write the modified content back to HelloWorldVerifier.sol file
fs.writeFileSync("./contracts/HelloWorldVerifier.sol", bumped);


// Read the content of Multiplier3Verifier.sol file
let content2 = fs.readFileSync("./contracts/Multiplier3Verifier.sol", { encoding: 'utf-8' });

// Replace the solidity version with ^0.8.0
let bumped2 = content2.replace(solidityRegex, 'pragma solidity ^0.8.0');

// Replace the contract name with Multiplier3Verifier
bumped2 = bumped2.replace(groth16VerifierRegex, 'contract Multiplier3Verifier');

// Write the modified content back to Multiplier3Verifier.sol file
fs.writeFileSync("./contracts/Multiplier3Verifier.sol", bumped2);

// Read the content of Multiplier3Verifier_plonk.sol file
let content3 = fs.readFileSync("./contracts/Multiplier3Verifier_plonk.sol", { encoding: 'utf-8' });

// Replace the solidity version with ^0.8.0
let bumped3 = content3.replace(solidityRegex, 'pragma solidity ^0.8.0');

// Replace the contract name with Multiplier3Verifier_plonk
bumped3 = bumped3.replace(plonkVerifierRegex, 'contract Multiplier3Verifier_plonk');

// Write the modified content back to Multiplier3Verifier_plonk.sol file
fs.writeFileSync("./contracts/Multiplier3Verifier_plonk.sol", bumped3);