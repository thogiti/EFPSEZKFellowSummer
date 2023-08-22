// Import required modules from respective packages
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { groth16, plonk } = require("snarkjs");

// Load Wasm Tester from Circom 
const wasm_tester = require("circom_tester").wasm;
// Load Field and Scalar from ffjavascript library
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;

// Define p (a very large prime number) that acts as a Scalar
exports.p = Scalar.fromString(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);

// Create Finite Field 1 (F1Field) using p
const Fr = new F1Field(exports.p);

// Test Suite for HelloWorld Verifier 
describe("HelloWorld", function () {
  // Set timeout for each async calls
  this.timeout(100000000);
  
  // Define Verifier and verifier
  let Verifier;
  let verifier;

  // Before each test, Setup HelloWorldVerifier contract
  beforeEach(async function () {
    Verifier = await ethers.getContractFactory("HelloWorldVerifier");
    verifier = await Verifier.deploy();
    await verifier.deployed();
  });

  // Test whether Circuit multiplies two numbers correctly
  it("Circuit should multiply two numbers correctly", async function () {
    // Load the respective circuit 
    const circuit = await wasm_tester("contracts/circuits/HelloWorld.circom");

    // Define input
    const INPUT = {
      a: 2,
      b: 3,
    };

    // Calculate witness from the circuit and defined inputs
    const witness = await circuit.calculateWitness(INPUT, true);

    // Compare outputs (witness) with expected results with assert function using Fr
    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(6)));
  });

  // Test whether the verifier returns true for correct proof
  it("Should return true for correct proof", async function () {
    // Create a proof and public signals from the circuit and some input
    const { proof, publicSignals } = await groth16.fullProve(
      { a: "2", b: "3" },
      "contracts/circuits/HelloWorld/HelloWorld_js/HelloWorld.wasm",
      "contracts/circuits/HelloWorld/circuit_final.zkey"
    );

    // Output the product of the private inputs
    console.log("2x3 =", publicSignals[0]);

    // Create a string of the calldata for the verifier contract
    const calldata = await groth16.exportSolidityCallData(proof, publicSignals);

    // Convert the calldata string into an array of BigInts
    const argv = calldata
      .replace(/["[\]\s]/g, "")
      .split(",")
      .map((x) => BigInt(x).toString());

    // Define a, b, c and Input from the argv array
    const a = [argv[0], argv[1]];
    const b = [
      [argv[2], argv[3]],
      [argv[4], argv[5]],
    ];
    const c = [argv[6], argv[7]];
    const Input = argv.slice(8);

    // Expect the verifier to return true for the correct proof
    expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;
  });

  // Test whether the verifier returns false for invalid proof
  it("Should return false for invalid proof", async function () {
    // Define invalid a, b, c and d
    let a = [0, 0];
    let b = [
      [0, 0],
      [0, 0],
    ];
    let c = [0, 0];
    let d = [0];

    // Expect the verifier to return false for the invalid proof
    expect(await verifier.verifyProof(a, b, c, d)).to.be.false;
  });
});

// Test Suite for Multiplier3 with Groth16
describe("Multiplier3 with Groth16", function () {
  // Before each test, Setup Multiplier3Verifier contract
  beforeEach(async function () {
    Verifier = await ethers.getContractFactory("Multiplier3Verifier");
    verifier = await Verifier.deploy();
    await verifier.deployed();
  });

  // Test whether Circuit multiplies three numbers correctly
  it("Circuit should multiply three numbers correctly", async function () {
    // Load the respective circuit 
    const circuit = await wasm_tester("contracts/circuits/Multiplier3.circom");

    // Define input
    const INPUT = {
      a: 2,
      b: 3,
      c: 4,
    };

    // Calculate witness from the circuit and defined inputs
    const witness = await circuit.calculateWitness(INPUT, true);

    // Compare outputs (witness) with expected results with assert function using Fr
    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(24)));
  });

  // Test whether the verifier returns true for correct proof
  it("Should return true for correct proof", async function () {
    // Create a proof and public signals from the circuit and some input
    const { proof, publicSignals } = await groth16.fullProve(
      { a: "2", b: "3", c: "4" },
      "contracts/circuits/Multiplier3/Multiplier3_js/Multiplier3.wasm",
      "contracts/circuits/Multiplier3/circuit_final.zkey"
    );

    // Output the product of the private inputs
    console.log("2x3x4 =", publicSignals[0]);

    // Create a string of the calldata for the verifier contract
    const calldata = await groth16.exportSolidityCallData(proof, publicSignals);

    // Convert the calldata string into an array of BigInts
    const argv = calldata
      .replace(/["[\]\s]/g, "")
      .split(",")
      .map((x) => BigInt(x).toString());

    // Define a, b, c and Input from the argv array
    const a = [argv[0], argv[1]];
    const b = [
      [argv[2], argv[3]],
      [argv[4], argv[5]],
    ];
    const c = [argv[6], argv[7]];
    const Input = argv.slice(8);

    // Expect the verifier to return true for the correct proof
    expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;
  });

  // Test whether the verifier returns false for invalid proof
  it("Should return false for invalid proof", async function () {
    // Define invalid a, b, c and d
    let a = [0, 0];
    let b = [
      [0, 0],
      [0, 0],
    ];
    let c = [0, 0];
    let d = [0];

    // Expect the verifier to return false for the invalid proof
    expect(await verifier.verifyProof(a, b, c, d)).to.be.false;
  });
});

// Test Suite for Multiplier3 with PLONK
describe("Multiplier3 with PLONK", function () {
  // Before each test, Setup Multiplier3Verifier_plonk contract
  beforeEach(async function () {
    Verifier = await ethers.getContractFactory("Multiplier3Verifier_plonk");
    verifier = await Verifier.deploy();
    await verifier.deployed();
  });

  // Test whether the verifier returns true for correct proof
  it("Should return true for correct proof", async function () {
    // Create a proof and public signals from the circuit and some input
    const { proof, publicSignals } = await plonk.fullProve(
      { a: "2", b: "3", c: "4" },
      "contracts/circuits/Multiplier3_plonk/Multiplier3_js/Multiplier3.wasm",
      "contracts/circuits/Multiplier3_plonk/circuit_final.zkey"
    );

    // Output the product of the private inputs
    console.log("2x3x4 =", publicSignals[0]);

    // Create a string of the calldata for the verifier contract
    let rawCalldata = await plonk.exportSolidityCallData(proof, publicSignals);

    // Fix string by replacing "][" with ", "
    const fixedStr = rawCalldata.replace(/\]\[/g, ", ");

    // Convert the calldata string into an array of BigInts
    const fixedArray = fixedStr
      .replace(/["[\]\s]/g, "")
      .split(",")
      .map((x) => BigInt(x).toString());

    // Drop the last element of the array (the inputs)
    const calldata = [...fixedArray.slice(0, -1)];

    // Expect the verifier to return true for the correct proof
    expect(await verifier.verifyProof(calldata, publicSignals)).to.be.true;
  });

  // Test whether the verifier returns false for invalid proof
  it("Should return false for invalid proof", async function () {
    // Define invalid calldata and publicSignals
    let calldata = new Array(24).fill(0);
    let publicSignals = [0];

    // Expect the verifier to return false for the invalid proof
    expect(await verifier.verifyProof(calldata, publicSignals)).to.be.false;
  });
});
