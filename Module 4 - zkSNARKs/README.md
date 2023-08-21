# Module 4 - zkSNARKs

In this module, you will learn how zkSNARKs work and how they are constructed. zkSNARKs are a type of zero-knowledge proofs that allow a prover to convince a verifier that a computation was done correctly, without revealing any details about the computation or the inputs. zkSNARKs are very efficient and compact, making them suitable for applications such as blockchain and privacy.

To understand how zkSNARKs are built, we will first introduce two key concepts: homomorphic hiding and blind evaluation. Homomorphic hiding is a property of some mathematical functions that allows us to perform operations on hidden values without revealing them. Blind evaluation is a technique that allows us to evaluate a function at a hidden point without revealing the point or the result.

Then we will go through the steps of transforming a computation into a zkSNARK, using some examples and exercises. We will start from arithmetic circuits, which are a way of representing computations using basic operations such as addition and multiplication. We will then convert arithmetic circuits into R1CS and QAP, which are two types of systems of equations that capture the structure and constraints of the computation. Finally, we will explore some common proof systems that use R1CS and QAP to generate and verify zkSNARKs, such as Groth16 and Plonk.

By completing this module, you will gain a deep understanding of the theory and practice of zkSNARKs. You will also be able to appreciate the elegance and power of these amazing cryptographic tools. We hope you enjoy this module and have fun learning! 😊


# Exercises


## Homomorphic Hiding

**Question:** Explain homomorphic hiding in your own words?

**Answer:** Homomorphic hiding is a way of hiding data using a special type of encryption that preserves some operations on the data. This means that you can do calculations on encrypted data, and when you decrypt the results, they will be the same as if you did the calculations on the original data. For example, suppose you have two numbers, 3 and 5, and you want to hide them using homomorphic hiding. You can encrypt them using a secret key and get two encrypted values, say E(3) and E(5). Then, you can add these encrypted values and get another encrypted value, say E(8). If you decrypt E(8) using the same secret key, you will get 8, which is the sum of 3 and 5. This way, you can perform addition on hidden data without revealing the data itself.

Homomorphic hiding is useful for protecting the privacy and security of data in various scenarios, such as cloud computing, voting, or blockchain. It allows you to perform computations on sensitive data without exposing it to anyone else. However, homomorphic hiding is also challenging and complex, as it requires sophisticated mathematical techniques and efficient algorithms. There are different types of homomorphic hiding schemes, depending on the operations they support and the security guarantees they provide.


---


## Arithmetic Circuits

**Question:** What is the primary purpose of converting a problem into an arithmetic circuit?

**Answer:** An arithmetic circuit is a way of expressing a computation using basic operations, such as addition and multiplication, on variables and constants. By converting a problem into an arithmetic circuit, we can simplify and standardize the representation of complex computations. This makes it easier to apply further transformations, such as R1CS, which are more suitable for creating zkSNARKs. zkSNARKs are a type of zero-knowledge proofs that allow us to verify computations without revealing any details about them.


**Question:** What are the main components of an arithmetic circuit?

**Answer:** An arithmetic circuit is a way of expressing a computation using basic operations, such as addition and multiplication, on variables and constants. The main components of an arithmetic circuit are:

- **Gates**: These are the nodes of the circuit that perform the operations on the values. There are different types of gates, such as addition gates, multiplication gates, constant gates, etc. Each gate has one or more input wires and one output wire.
- **Wires**: These are the edges of the circuit that carry the values between the gates. Each wire has a unique label and a value that depends on the gate it is connected to. The value of a wire can be either a variable or a constant.
- **Input/output ports**: These are the special wires that define the inputs to and outputs from the circuit. The input ports are the wires that have no incoming edges, and the output ports are the wires that have no outgoing edges. The input ports represent the variables of the computation, and the output ports represent the result of the computation.

An example of an arithmetic circuit is shown below:

This circuit computes the function $f(x,y) = (x + y)^2 + 3x - 2y$. It has two input ports, labeled $x$ and $y$, and one output port, labeled $f$. It has four gates: an addition gate, a multiplication gate, and two constant gates. The values of the wires are shown in parentheses.


---


## Rank-1 Constraint System (R1CS)

**Question:** Describe the Rank-1 Constraint System (R1CS) in your own words.

**Answer:** R1CS is a way of expressing computations using a set of equations that involve only linear combinations of variables and constants. It is based on the idea of arithmetic circuits, which are a way of representing computations using basic operations, such as addition and multiplication, on variables and constants. However, R1CS simplifies the arithmetic circuits into a format where each equation corresponds to a single operation, and each operation is represented by a rank-1 matrix, which is a matrix that has only one row or one column. For example, an addition operation can be represented by a rank-1 matrix with two non-zero entries in the same row or column, and a multiplication operation can be represented by a rank-1 matrix with four non-zero entries in different rows and columns. By using rank-1 matrices, we can ensure that each equation is linear and easy to manipulate.

**Question:** Why is R1CS essential in the zkSNARK construction pipeline?

**Answer:** R1CS is essential because it allows us to convert computations into a form that can be used to generate zkSNARKs, which are a type of zero-knowledge proofs that allow us to verify computations without revealing any details about them. To generate zkSNARKs, we need to transform the computations into polynomials, which are mathematical expressions that involve powers of variables and constants. However, polynomials are not easy to work with directly, so we need an intermediate step that can bridge the gap between computations and polynomials. R1CS provides this intermediate step by transforming the computations into a set of equations that can be easily converted into polynomials using another technique called QAP, which stands for Quadratic Arithmetic Program. QAP is a way of representing equations using quadratic polynomials, which are polynomials that involve squares of variables and constants. By using R1CS and QAP, we can create zkSNARKs for any computation that can be expressed as an arithmetic circuit.


---


## Quadratic Arithmetic Program (QAP)

**Question:** What is the primary goal of converting R1CS into a QAP?

**Answer:** The primary goal is to change the representation of the computation from a set of equations to a set of polynomials. Polynomials are mathematical expressions that involve powers of variables and constants, such as $x^2 + 3x - 5$. Polynomials are useful for generating and verifying zkSNARK proofs, which are a type of zero-knowledge proofs that allow us to verify computations without revealing any details about them.

**Question:** How does QAP aid in the zkSNARK proof generation process?

**Answer:** QAP helps us to create a polynomial representation of the computation that has a special structure and property. The structure is that the polynomials are divided into three groups: one group for the left-hand side of the equations, one group for the right-hand side of the equations, and one group for the outputs of the equations. The property is that the polynomials in each group are linearly independent, meaning that they cannot be expressed as a combination of other polynomials in the same group. This polynomial representation allows us to prove that we know a solution to the computation by proving that we know certain values of the polynomials at a secret point.

**Question:** Why are polynomials central to the QAP representation?

**Answer:** Polynomials are central because they offer advantages that make the zkSNARK construction efficient and secure. For example, polynomials can be evaluated and interpolated using fast and simple algorithms, which are used to generate and verify proofs. Polynomials also have a succinct and zero-knowledge property, which means that we can create proofs that are small in size and do not reveal any information about the computation or the solution. These features are essential for zkSNARKs, which aim to provide efficient and private verification of computations.


---


## The Pinocchio Protocol


**Question:** Why is the Pinocchio Protocol considered a significant step towards practical zkSNARK construction?

**Answer:** The Pinocchio Protocol was a breakthrough in the development of zkSNARKs, which are a type of zero-knowledge proofs that allow us to verify computations without revealing any details about them. The protocol showed how to take a computation, represented as a QAP, and create a proof that is both short and easy to verify. The protocol also made the proof generation and verification non-interactive, meaning that they do not require any communication between the prover and the verifier.

**Question:** How does the Pinocchio Protocol utilize QAP representations?

**Answer:** The Pinocchio Protocol uses the QAP representation to create a polynomial representation of the computation that has a special property. The property is that the polynomials in each group of the QAP are linearly independent, meaning that they cannot be expressed as a combination of other polynomials in the same group. This property allows the protocol to use cryptographic techniques like pairings on elliptic curves to generate and verify proofs that are both zero-knowledge and succinct.

**Question:** What role do elliptic curve pairings play in the Pinocchio Protocol?

**Answer:** Elliptic curve pairings are the key cryptographic tool that enables the Pinocchio Protocol to produce efficient and secure proofs. Pairings are a type of mathematical operation that can combine two points on an elliptic curve into a single value. Pairings have some special properties that allow us to perform certain checks and computations on the polynomials of the QAP representation. Pairings also allow us to create proofs that are both zero-knowledge, meaning that they do not reveal any information about the computation or the inputs, and succinct, meaning that they are small in size and fast to verify.


---


## Groth16


**Question:** What makes Groth16 a popular choice for zkSNARK constructions in blockchain technologies?

**Answer:** Groth16 is popular because it is very efficient. It creates proofs that are shorter and faster than previous zkSNARK constructions. It also requires less computation power for creating and verifying proofs. This efficiency is important for blockchain technologies, where resources are limited and performance is crucial.

**Question:** Describe the main advantage and disadvantage of the Groth16 proof system.

**Answer:**

- **Advantage**: Groth16 is highly efficient, producing succinct proofs and allowing for fast verification. This makes it ideal for systems where performance is critical.
- **Disadvantage**: Groth16 requires a circuit-specific trusted setup, which can be a significant downside for some use-cases due to the potential security risks associated with the setup phase.

**Question:** How does Groth16 differ from the original Pinocchio Protocol?

**Answer:** Groth16 improves upon the Pinocchio Protocol by producing shorter proofs and allowing for faster verification. Additionally, while both require a trusted setup, Groth16's setup is circuit-specific, whereas the Pinocchio Protocol's setup is more general. This means that Groth16's setup needs to be repeated for each different computation, whereas the Pinocchio Protocol's setup can be reused for any computation.


---


## PLONK


**Question:** What are the advantages of PLONK over Groth16?

**Answer:** PLONK is a newer and more advanced zkSNARK construction that offers some benefits over Groth16. One of the main benefits is that PLONK has a "universal and updateable" trusted setup, which means that you only need to do the setup phase once and you can use it for any circuit of a given size or smaller. This makes PLONK more versatile and convenient, as you don't have to repeat the setup for every new circuit. It also reduces the security concerns associated with multiple setup phases, as you don't have to trust multiple parties or store multiple secrets. Another benefit of PLONK is that it is more modular and flexible, allowing for easier integration with various cryptographic primitives, such as hash functions, signatures, encryption schemes, etc. This makes PLONK more suitable for complex and diverse applications.

**Question:** How does PLONK eliminate the need for a new trusted setup for every circuit?

**Answer:** PLONK eliminates the need for a new trusted setup for every circuit by using a universal trusted setup, which is a technique that allows you to generate a single set of parameters that can be used for any circuit of a given size or smaller. This contrasts with circuit-specific setups, where you have to generate a new set of parameters for each new circuit. The universal trusted setup works by creating a generic polynomial representation of any circuit, using a technique called permutation arguments. This polynomial representation can then be used to generate and verify zkSNARK proofs for any circuit that fits within the size limit. The universal trusted setup reduces the overhead and potential security risks associated with multiple setups.

