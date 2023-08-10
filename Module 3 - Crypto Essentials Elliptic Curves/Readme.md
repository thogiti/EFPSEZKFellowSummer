# Module 3 - Crypto Essentials: Elliptic Curves and More

Welcome to Module 3. First, we will explore the key concepts behind elliptic curves and their importance in modern cryptography. Then we will take you deeper into more advanced topics like bilinear maps, pairing-based cryptography, and KZG polynomial commitments, multi-party computation.


# [Exercises](#exercises)

## [Intro to Elliptic Curves](#intro-to-elliptic-curves)

1. What is the general equation for an elliptic curve?

**Answer** An elliptic curve is defined by an equation of the form:

$$y^2 = x^3 + ax + b$$

where $a$ and $b$ are constants, and the curve must satisfy the condition $4a^3 + 27b^2 \neq 0$ to ensure that it has no singularities (i.e., no self-intersections or cusps). In the context of cryptography, we often work with elliptic curves over finite fields, which means that the coordinates $(x, y)$ and the constants $a$ and $b$ are elements of a finite field.

For example, in Bitcoin, the elliptic curve used is $y^2 = x^3 + 7$ where $a = 0$ and $b = 7$.


2. How do you find the sum of two points P and Q on an elliptic curve?

**Answer** Point addition is the primary operation in elliptic curve arithmetic. Given two points $P$ and $Q$ on an elliptic curve, their sum $R = P + Q$ is computed as follows:

1. Find the line $L$ that passes through $P$ and $Q$.
2. Find the third point of intersection $R'$ between $L$ and the elliptic curve.
3. Reflect $R'$ across the x-axis to obtain $R$.


![Point addition on Elliptic Curve ](https://raw.githubusercontent.com/thogiti/thogiti.github.io/master/content/images/20230509/point-addition-in-ECC.png)

*A geometrical visualization of a point addition on elliptic curve.*

In SageMath, point addition can be performed using the `+` operator:

```python
p = 2^256 - 2^32 - 977
F = IntegerModRing(p)
E = EllipticCurve(F, [0, 7])
P = E.random_element()
Q = E.random_element()
R = P + Q
print (" P+Q = ", R)
```

3. What is the special point on the elliptic curve that serves as the identity element for addition?

**Answer** In addition to the points that lie on the curve, there is an additional "point at infinity" denoted by $\mathcal{O}$, which serves as the identity element for the elliptic curve group. We can define **identity** element as below:
There exists an identity element $\mathcal{O}$ such that for any point $P$ on the curve, $P + \mathcal{O} = P$.


## [Elliptic Curve Cryptography](#elliptic-curve-cryptography)

1. What is the primary advantage of ECC over traditional methods like RSA?

**Answer** The primary advantage of Elliptic Curve Cryptography (ECC) over traditional methods like RSA is that ECC offers the same level of security with smaller keys. This results in less storage and transmission requirements. You can read more about the advantages at [ECC benefits](https://thogiti.github.io/mastering-elliptic-curve-arithmetic-a-comprehensive-guide-with-sagemath-examples/#the-power-of-elliptic-curve-cryptography-ecc). For instance, a 256-bit ECC key offers comparable security to a 3072-bit RSA key. For example, see below NIST table showing the security bit level for RSA VS ECC.

![NIST Security bit level RSA VS ECC](https://github.com/thogiti/EFPSEZKFellowSummer/blob/main/Module%203%20-%20Crypto%20Essentials%20Elliptic%20Curves/images/NIST-Security-bit-level-RSA-VS-ECC.png)


1. How is the public key in ECC derived from the private key?

**Answer** The public key in ECC is derived from the private key by scalar multiplication of the private key with the generator point on the elliptic curve. The generator point is a predefined point on the curve used in the elliptic curve group. The result of this operation is another point on the curve, which is the public key.


Elliptic curve arithmetic is widely used in Ethereum blockchain applications, such as smart contracts and zero-knowledge proofs. Ethereum uses the secp256k1 elliptic curve for its cryptographic operations, including generating addresses and signing transactions.

```python
from hashlib import sha256

# Define the secp256k1 elliptic curve
p = 2^256 - 2^32 - 977
E = EllipticCurve(GF(p), [0, 7])
G = E.lift_x(55066263022277343669578718895168534326250603453777594175500187360389116729240)

# Generate a private-public key pair for an Ethereum user
private_key = randint(1, E.order() - 1)
public_key = private_key * G

# Ethereum address generation (simplified)
address = sha256(str(public_key).encode()).hexdigest()[-40:]
print("Ethereum address:", "0x"+address)

```


3. What is the Elliptic Curve Discrete Logarithm Problem (ECDLP)?

**Answer** The Elliptic Curve Discrete Logarithm Problem (ECDLP) is the mathematical problem upon which the security of ECC is based. It is the challenge of finding the discrete logarithm of a random elliptic curve element with respect to a publicly known base point. In simpler terms, given a point `P` and a point `Q` on the elliptic curve, the ECDLP is the problem of finding an integer `n` such that `P = nQ` when the elliptic curve group operation is used.


## [Schnorr Signatures and EdDSA](#schnorr-signatures-and-eddsa)

1. What are the primary advantages of Schnorr Signatures?

**Answer** The primary advantages of Schnorr Signatures are their simplicity, efficiency, and the fact they offer strong security proofs. They also support multisignatures - signatures that are a combination of multiple individual signatures, which is beneficial for complex transactions.


2. What differentiates EdDSA from traditional Schnorr signatures?

**Answer** EdDSA (Edwards-curve Digital Signature Algorithm) is a variant of Schnorr signatures that uses twisted Edwards curves. The main difference is that EdDSA has built-in resistance to side-channel attacks and it operates over fixed, public elliptic curves, while traditional Schnorr signatures do not specify any particular curve.


## [Pairing Based Cryptography](#pairing-based-cryptography)

1. What is a pairing in the context of elliptic curve cryptography?

**Answer** In the context of elliptic curve cryptography, a pairing is a mapping of pairs of points on an elliptic curve into a finite field. Pairings are useful in cryptography because, when constructed properly, they can produce finite fields that are large enough to make the discrete logarithm problem hard to compute, but small enough to make computations efficient.

2. What are the three main properties of a bilinear map?

**Answer** A bilinear map, which is a type of pairing in cryptography, has three main properties:

- Bilinearity: For all points $P$, $Q$, $R$ and $S$ in the elliptic curve, and all scalars $a$ and $b$, the bilinear map $e$ satisfies $e(aP + bQ, R) = e(P, R)^a * e(Q, R)^b$ and $e(P, aR + bS) = e(P, R)^a * e(P, S)^b$.

- Non-degeneracy: There exists a point $P$ in the elliptic curve such that for any other point $Q$ in the curve, $e(P, Q)$ is not equal to the identity element in the target group.

- Computability: There exists an efficient algorithm to compute $e(P, Q)$ for any points $P$ and $Q$ in the elliptic curve.

3. Name one cryptographic application that is enabled by pairings.

**Answer** One cryptographic application that is enabled by pairings is Identity-Based Encryption (IBE). IBE allows a sender to encrypt a message without needing a receiver’s public key to have been certified and distributed in advance. It uses some form of a person (or entity’s) identification to generate a public key, such as an email address. 


## [KZG Polynomial Commitments](#kzg-polynomial-commitments)

1. What is the primary purpose of a polynomial commitment scheme?

**Answer** The primary purpose of a polynomial commitment scheme, like the KZG scheme, is to allow a prover to commit to a polynomial in such a way that they can later reveal arbitrary positions in the polynomial, and a verifier can check the correctness of these revealed positions against the commitment, without knowing the entire polynomial .

2. How is the commitment in the KZG scheme computed for a given polynomial and secret value?

**Answer** The commitment in the KZG scheme is computed for a given polynomial $f$ and secret value $s$ by evaluating the polynomial at the point $s$, i.e., $f(s)$. This result is then used to create a commitment $c = g^f(s)$, where $g$ is a generator of the group. This commitment $c$ can be used to verify evaluations of the polynomial at any point.

3. Why are KZG polynomial commitments considered efficient and succinct?

**Answer** KZG polynomial commitments are considered efficient and succinct because the size of the commitment and the proof is constant, i.e., does not grow with the degree of the polynomial or the number of evaluations. This makes the scheme highly scalable. Verifying an evaluation of the polynomial against the commitment is also an efficient operation. 


## [Trusted Setup](#trusted-setup)

1. Why is the trusted setup phase crucial for the security of certain cryptographic protocols?

**Answer** The trusted setup phase is crucial for the security of certain cryptographic protocols because it generates the parameters that these protocols use for their cryptographic operations. If the trusted setup is compromised, for example, if the secret values used in the setup phase are not properly discarded, it could lead to vulnerabilities in the protocol, such as the ability to forge proofs. 

2. How is the trusted setup related to zk-SNARKs?

**Answer** The trusted setup is related to zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) because zk-SNARKs require a trusted setup phase to generate their parameters. The parameters are used to construct and verify the zero-knowledge proofs that zk-SNARKs produce. If the trusted setup in zk-SNARKs is compromised, it could allow an attacker to create fake proofs.

3. What are some of the challenges associated with trusted setups?

**Answer** Some of the challenges associated with trusted setups include ensuring the secrecy and proper disposal of the secret values used in the setup phase. If these values are leaked or not properly discarded, it could compromise the security of the cryptographic protocol. Another challenge is ensuring the trustworthiness of the party performing the setup, as any dishonesty or compromise on their part could also lead to vulnerabilities in the protocol.
