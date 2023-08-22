#!/bin/bash

# This script is for creating a Multiplier3 circuit using circom and snarkjs using PLONK protocol
# It requires circom, snarkjs, and wget to be installed
# It also requires the powersOfTau28_hez_final_10.ptau file to be downloaded from the hermez website
# It will generate a Multiplier3 circuit, a verification key, and a solidity verifier contract
# To run this ZKSNARKS operations script, your working directory shoould be /week1/Q2/

cd contracts/circuits

# Create a new directory for the Multiplier3 circuit
mkdir Multiplier3_plonk

# Check if the powersOfTau28_hez_final_10.ptau file exists
if [ -f ./powersOfTau28_hez_final_10.ptau ]; then
    # If it exists, skip the download step
    echo "powersOfTau28_hez_final_10.ptau already exists. Skipping."
else
    # If it does not exist, download it from the hermez website
    echo 'Downloading powersOfTau28_hez_final_10.ptau'
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau
fi

# Compile the Multiplier3.circom file using circom
echo "Compiling Multiplier3.circom..."

# The --r1cs flag generates a rank-1 constraint system file
# The --wasm flag generates a WebAssembly file
# The --sym flag generates a symbolic information file
# The -o flag specifies the output directory
circom Multiplier3.circom --r1cs --wasm --sym -o Multiplier3_plonk

# Display some information about the generated r1cs file using snarkjs
snarkjs r1cs info Multiplier3_plonk/Multiplier3.r1cs

# Start a new zkey file and make a contribution using snarkjs and the powersOfTau28_hez_final_10.ptau file
snarkjs plonk setup Multiplier3_plonk/Multiplier3.r1cs powersOfTau28_hez_final_10.ptau Multiplier3_plonk/circuit_final.zkey

# The --name flag specifies the name of the contributor
# The -v flag enables verbose mode
# The -e flag specifies the entropy source for the contribution
# snarkjs zkey contribute Multiplier3_plonk/circuit_0000.zkey Multiplier3_plonk/circuit_final.zkey --name="1st Contributor Name" -v -e="random text"

# Export the verification key from the final zkey file as a JSON file using snarkjs
snarkjs zkey export verificationkey Multiplier3_plonk/circuit_final.zkey Multiplier3_plonk/verification_key.json

# Generate a solidity contract for verifying proofs using the final zkey file and snarkjs
snarkjs zkey export solidityverifier Multiplier3_plonk/circuit_final.zkey ../Multiplier3Verifier_plonk.sol

# Go back to the root directory
cd ../..

cd contracts/circuits/Multiplier3_plonk

# Create input file
echo "Create inputs for Multiplier3 circuit in Multiplier3_input.json"
echo "{\"a\": \"3\", \"b\": \"4\", \"c\": \"5\"}" > ./Multiplier3_input.json

# Calculate witness 
echo "Generate witness from Multiplier3_input.json, using Multiplier3.wasm, saving to Multiplier3_witness.wtns"
gtime -f "[PROFILE] Witness generation time: %E" \
    node Multiplier3_js/generate_witness.js Multiplier3_js/Multiplier3.wasm ./Multiplier3_input.json \
        Multiplier3_js/Multiplier3_witness.wtns

# Create a proof for our witness
echo "Starting proving that we have a witness (our Multiplier3_input.json in form of Multiplier3_witness.wtns)"
echo "Proof and public signals are saved to Multiplier3_proof.json and Multiplier3_public.json"
gtime -f "[PROFILE] Prove time: %E" \
    snarkjs plonk prove ./circuit_final.zkey Multiplier3_js/Multiplier3_witness.wtns \
        Multiplier3_js/Multiplier3_proof.json \
        Multiplier3_js/Multiplier3_public.json

# Verify our proof
echo "Checking proof of knowledge of private inputs for Multiplier3_public.json using Multiplier3_verification_key.json"
gtime -f "[PROFILE] Verify time: %E" \
    snarkjs plonk verify ./verification_key.json \
        Multiplier3_js/Multiplier3_public.json \
        Multiplier3_js/Multiplier3_proof.json

# Check the sizes and performance of proof, verification and witness files
echo "Output sizes of client's side files":
echo "[PROFILE]" `du -kh "Multiplier3_js/Multiplier3.wasm"`
echo "[PROFILE]" `du -kh "Multiplier3_js/Multiplier3_witness.wtns"`
