# Module 5 - PSE Protocols

Module 5 is focused on the practical application and coding of protocols developed within the Privacy and Scaling Explorations (PSE) team.

The module introduces several protocols such as Semaphore, UniRep, and Rate-Limiting Nullifier (RLN), providing a brief overview of each one along with links to relevant documentation and resources. The aim of the module is to equip learners with the necessary context to independently study and navigate through the provided documentation.

In addition to these, the module also includes information about newer projects including Bandada, CryptKeeper, and TLSNotary. These projects are highlighted as exciting developments that the PSE team is looking forward to bringing more attention to.

---

## Semaphore

Semaphore is a protocol that allows users to prove their membership in a group and transmit anonymous data, such as votes or feedback, without revealing their identities. Many projects are built on top of the Semaphore protocol due to its general applicability.

For example, in a voting system built on Semaphore, voters can prove they are eligible to vote without revealing their identities. This can prevent voter coercion and ensure privacy github.com.

A potential hurdle for Semaphore could be the need for users to understand the concept of zero-knowledge proofs. Also, the requirement of a trusted setup might pose adoption challenges.

Github: https://github.com/semaphore-protocol 
Website: https://semaphore.appliedzkp.org/

---

## UniRep

UniRep extends Semaphore's concept by allowing small amounts of data to be associated with anonymous users. This enables users to prove something about themselves while remaining anonymous.

For instance, Twitter can attest to a user's number of followers. The user can then prove to others that they have a certain number of followers while remaining anonymous.

A potential barrier for UniRep could be the need for third-party attestations, which might not be readily available or reliable.

Github: https://github.com/Unirep 
Website: https://developer.unirep.io/


## Rate-Limiting Nullifier (RLN)

RLN is designed to tackle the problem of spam in an anonymous environment. It uses a cryptographic approach where those who exceed the rate limit can be penalized.

RLN could be used in an anonymous forum where users are rate-limited to prevent spam. Violators who exceed the rate limit could be penalized by revealing their identity.

A potential hurdle for RLN could be the computational cost of generating and verifying proofs, which might impact the scalability of the system.

Github: https://github.com/Rate-Limiting-Nullifier 
Website: https://rate-limiting-nullifier.github.io/rln-docs/

