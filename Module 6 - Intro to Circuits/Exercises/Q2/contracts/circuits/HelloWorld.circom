pragma circom 2.1.4;

// This circuit template checks that c is the product of a and b.
template Multiplier2 () {

   // Declaration of signals.
   signal input a; // The first input to the circuit.
   signal input b; // The second input to the circuit.
   signal output c; // The output of the circuit.

   // Constraints.
   c <== a * b; // The constraint that ensures that c is equal to a times b.
}

// The main component of the circuit, which uses the Multiplier2 template.
component main = Multiplier2();

