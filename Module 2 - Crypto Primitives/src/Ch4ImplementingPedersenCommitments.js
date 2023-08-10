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