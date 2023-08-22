pragma circom 2.1.4;

// Modified circuit to perform a multiplication of three signals
template Multiplier3 () {  

   // Declaration of signals.  
   // The input signals are a, b, and c, which are numbers
   // The output signal is d, which is also a number
   signal input a;  
   signal input b;
   signal input c;
   signal output d;  

   signal u;

   // These constraints ensure that the output signal d is equal to the product of the three input signals a, b, and c
   u <== a * b;
   d <== u * c;
}


// The main component instantiates the circuit template and assigns values to the signals
component main = Multiplier3();
