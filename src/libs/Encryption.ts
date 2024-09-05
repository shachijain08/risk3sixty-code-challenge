import crypto from 'crypto'

export default function Encryption(secret: string) {
  const alg = 'aes-256-ctr'

  return {
    _algorithm: alg,
    _secret: secret,

    encrypt(input: Buffer | string) {
      const secret = getFilledSecret(this._secret)
      const { iv, key } = getKeyAndIV(secret)
      const cipher = crypto.createCipheriv(this._algorithm, key, iv)

      const inputStr =
        input instanceof Buffer ? input.toString('base64') : input
      let cipherText = cipher.update(inputStr, 'utf8', 'base64')
      cipherText += cipher.final('base64')
      return `${cipherText}:${iv.toString('base64')}`
    },

    decrypt(ciphertext: string) {
      // REDACTED, YOU SHOULD WRITE THE CODE TO DECRYPT THE CIPHERTEXT PROVIDED HERE
      const [encryptedData, ivBase64] = ciphertext.split(':') //splitting between initialization vector and encrypted data
      const iv = Buffer.from(ivBase64, 'base64') //convert to a buffer object
      const secret = getFilledSecret(this._secret) //function to derive a SHA-256 hash of the secret
      const { key } = getKeyAndIV(secret, iv) //use this to get the key 
    
      //Use the function with the algorithm, derived key, and IV to create a decipher object
      const decipher = crypto.createDecipheriv(this._algorithm, key, iv)

      //decrypt to get plain text 
      let decrypted = decipher.update(encryptedData, 'base64', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    },
  }
}

// Private methods
function getFilledSecret(secret: string): string {
  const sha256Sum = crypto.createHash('sha256')
  sha256Sum.update(secret)
  return sha256Sum.digest('base64')
}

function getKeyAndIV(key: string, iv?: Buffer) {
  const ivBuffer = iv || crypto.randomBytes(16)
  const derivedKey = crypto.pbkdf2Sync(key, ivBuffer, 1e5, 32, 'sha256')
  return {
    iv: ivBuffer,
    key: derivedKey,
  }
}
