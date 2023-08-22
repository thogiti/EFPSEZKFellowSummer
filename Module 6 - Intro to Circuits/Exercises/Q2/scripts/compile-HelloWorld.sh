#!/bin/bash


# This script is for creating a HelloWorld circuit using circom and snarkjs
# It requires circom, snarkjs, and wget to be installed
# It also requires the powersOfTau28_hez_final_10.ptau file to be downloaded from the hermez website
# It will generate a HelloWorld circuit, a verification key, and a solidity verifier contract
# To run this ZKSNARKS operations script, your working directory shoould be /week1/Q2/

cd contracts/circuits

# Create a new directory for the HelloWorld circuit
mkdir HelloWorld

# Check if the powersOfTau28_hez_final_10.ptau file exists
if [ -f ./powersOfTau28_hez_final_10.ptau ]; then
    # If it exists, skip the download step
    echo "powersOfTau28_hez_final_10.ptau already exists. Skipping."
else
    # If it does not exist, download it from the hermez website
    echo 'Downloading powersOfTau28_hez_final_10.ptau'
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau
fi

# Compile the HelloWorld.circom file using circom
echo "Compiling HelloWorld.circom..."

# The --r1cs flag generates a rank-1 constraint system file
# The --wasm flag generates a WebAssembly file
# The --sym flag generates a symbolic information file
# The -o flag specifies the output directory
circom HelloWorld.circom --r1cs --wasm --sym -o HelloWorld

# Display some information about the generated r1cs file using snarkjs
snarkjs r1cs info HelloWorld/HelloWorld.r1cs

# Start a new zkey file and make a contribution using snarkjs and the powersOfTau28_hez_final_10.ptau file
snarkjs groth16 setup HelloWorld/HelloWorld.r1cs powersOfTau28_hez_final_10.ptau HelloWorld/circuit_0000.zkey

# The --name flag specifies the name of the contributor
# The -v flag enables verbose mode
# The -e flag specifies the entropy source for the contribution
snarkjs zkey contribute HelloWorld/circuit_0000.zkey HelloWorld/circuit_final.zkey --name="1st Contributor Name" -v -e="random text"

# Export the verification key from the final zkey file as a JSON file using snarkjs
snarkjs zkey export verificationkey HelloWorld/circuit_final.zkey HelloWorld/verification_key.json

# Generate a solidity contract for verifying proofs using the final zkey file and snarkjs
snarkjs zkey export solidityverifier HelloWorld/circuit_final.zkey ../HelloWorldVerifier.sol

# Go back to the root directory
cd ../..


cd contracts/circuits/HelloWorld

# Create input file
echo "Create inputs for HelloWorld circuit in HelloWorld_input.json"
echo "{\"a\": \"3\", \"b\": \"11\"}" > ./HelloWorld_input.json

# Calculate witness 
echo "Generate witness from HelloWorld_input.json, using HelloWorld.wasm, saving to HelloWorld_witness.wtns"
gtime -f "[PROFILE] Witness generation time: %E" \
    node HelloWorld_js/generate_witness.js HelloWorld_js/HelloWorld.wasm ./HelloWorld_input.json \
        HelloWorld_js/HelloWorld_witness.wtns

# Create a proof for our witness
echo "Starting proving that we have a witness (our HelloWorld_input.json in form of HelloWorld_witness.wtns)"
echo "Proof and public signals are saved to HelloWorld_proof.json and HelloWorld_public.json"
gtime -f "[PROFILE] Prove time: %E" \
    snarkjs groth16 prove ./circuit_final.zkey HelloWorld_js/HelloWorld_witness.wtns \
        HelloWorld_js/HelloWorld_proof.json \
        HelloWorld_js/HelloWorld_public.json

# Verify our proof
echo "Checking proof of knowledge of private inputs for HelloWorld_public.json using HelloWorld_verification_key.json"
gtime -f "[PROFILE] Verify time: %E" \
    snarkjs groth16 verify ./verification_key.json \
        HelloWorld_js/HelloWorld_public.json \
        HelloWorld_js/HelloWorld_proof.json

# Check the sizes and performance of proof, verification and witness files
echo "Output sizes of client's side files":
echo "[PROFILE]" `du -kh "HelloWorld_js/HelloWorld.wasm"`
echo "[PROFILE]" `du -kh "HelloWorld_js/HelloWorld_witness.wtns"`

