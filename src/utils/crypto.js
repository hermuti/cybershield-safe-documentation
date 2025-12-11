// Simple Web Crypto helpers: PBKDF2 -> AES-GCM
const enc = new TextEncoder()
const dec = new TextDecoder()

function toBase64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
}

function fromBase64(b64) {
  const str = atob(b64)
  const arr = new Uint8Array(str.length)
  for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i)
  return arr.buffer
}

export async function deriveKey(passphrase, saltBase64) {
  const salt = fromBase64(saltBase64)
  const passKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' },
    passKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
  return key
}

export async function generateSalt() {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  return toBase64(salt.buffer)
}

export async function encryptObject(obj, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const data = enc.encode(JSON.stringify(obj))
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)
  return {
    iv: toBase64(iv.buffer),
    ct: toBase64(ct)
  }
}

export async function decryptObject(payload, key) {
  const iv = fromBase64(payload.iv)
  const ct = fromBase64(payload.ct)
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, ct)
  return JSON.parse(dec.decode(plain))
}
