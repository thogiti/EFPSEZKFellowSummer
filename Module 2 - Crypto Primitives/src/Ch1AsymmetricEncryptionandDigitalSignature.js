const crypto = require('crypto');

// Asymmetric encryption
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

// Encrypt
const plaintext = 'This is a secret message.';
// INFO: Use the publicKey to encrypt the plaintext message. Remember that RSA encryption is public key encryption.
// https://nodejs.org/api/crypto.html#cryptopublicencryptkey-buffer
const encryptedText = crypto.publicEncrypt(publicKey, plaintext)
console.log(encryptedText)

// Decrypt
// INFO: Use the privateKey to decrypt the encrypted message. The result should be the original plaintext.
// https://nodejs.org/api/crypto.html#cryptopublicdecryptkey-buffer
const decryptedText = crypto.privateDecrypt(privateKey, encryptedText).toString('utf8')
console.log(decryptedText)

console.log(plaintext == decryptedText)

// Create a digital signature
const sign = crypto.createSign('SHA256');
sign.update(plaintext);
sign.end();
// INFO: Use the privateKey to sign the plaintext message. This will generate a digital signature.
// https://nodejs.org/api/crypto.html#signsignprivatekey-outputencoding
const signData = sign.sign(privateKey)

// Verify a digital signature
const verify = crypto.createVerify('SHA256');
verify.update(plaintext);
verify.end();
// INFO: Use the publicKey to verify the signature. It should return true if the signature is valid.
// https://nodejs.org/api/crypto.html#verifyverifyobject-signature-signatureencoding
const result = verify.verify(publicKey, signData)
console.log(result)