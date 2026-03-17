import * as bip39 from 'bip39'
import * as nostr from 'nostr-tools'

export function createSeed(){
  return bip39.generateMnemonic()
}

export function seedToKeypair(mnemonic:string){
  const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0,32)
  const privHex = seed.toString('hex')
  // derive public key using nostr-tools
  const pub = nostr.getPublicKey(privHex)
  return { priv: privHex, pub }
}
