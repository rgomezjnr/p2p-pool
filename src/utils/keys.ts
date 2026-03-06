import * as bip39 from 'bip39'
import * as nostr from 'nostr-tools'

export function createSeed(){
  const mnemonic = bip39.generateMnemonic()
  return mnemonic
}

export function seedToKeypair(mnemonic:string){
  const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0,32)
  const sk = nostr.getPrivateKeyFromSeed ? (nostr as any).getPrivateKeyFromSeed(seed) : seed.toString('hex')
  // fallback: use nostr-tools to get key pair from seed phrase (simple approach)
  const priv = nostr.getPublicKey ? undefined : undefined
  try{
    const skHex = nostr.generatePrivateKey ? (nostr as any).generatePrivateKey(seed) : seed.toString('hex')
    const pk = nostr.getPublicKey(skHex)
    return {priv: skHex, pub: pk}
  }catch(e){
    // best-effort fallback
    const privHex = seed.toString('hex')
    const pub = nostr.getPublicKey(privHex)
    return {priv: privHex, pub}
  }
}
