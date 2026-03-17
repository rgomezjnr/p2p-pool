import {useState} from 'react'
import { createSeed, seedToKeypair } from '../utils/keys'
import { saveProfile, Profile } from '../utils/storage'
import AvatarPicker from './AvatarPicker'

type Props = { onComplete: (p:Profile)=>void }

const USER_RE = /^[A-Za-z0-9]{3,12}$/

export default function Onboarding({onComplete}:Props){
  const [step, setStep] = useState(0)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState<string | undefined>(undefined)
  const [seed, setSeed] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  function next(){
    setError(null)
    if(step===0){ setStep(1); return }
    if(step===1){
      if(!USER_RE.test(username)){ setError('Username must be 3-12 alphanumeric characters'); return }
      setStep(2); return
    }
    if(step===2){
      // finalize: create seed and profile
      const m = createSeed()
      setSeed(m)
      const kp = seedToKeypair(m)
      const p:Profile = { username, pub: kp.pub, priv: kp.priv, name: name || undefined, avatarUrl: avatar }
      saveProfile(p)
      setStep(3)
      return
    }
    if(step===3){
      // finished
      const p = loadLocalProfile()
      if(p) onComplete(p)
    }
  }

  function loadLocalProfile(){
    try{ return JSON.parse(localStorage.getItem('p2p_pool_profile_v1') || 'null') as Profile | null }catch(e){return null}
  }

  function handleRestoreFromSeed(m:string){
    try{
      const kp = seedToKeypair(m)
      const p:Profile = { username: username || ('u_'+kp.pub.slice(0,6)), pub: kp.pub, priv: kp.priv, name }
      saveProfile(p)
      onComplete(p)
    }catch(e){ setError('Unable to restore from seed') }
  }

  return (
    <div className="card">
      {step===0 && (
        <div>
          <h2>Welcome to P2P Pool</h2>
          <p>Create a profile (no email) or restore from a seed phrase.</p>
          <div className="row">
            <button onClick={()=>setStep(1)}>Create Profile</button>
            <button onClick={()=>setStep(4)}>Restore Profile</button>
          </div>
        </div>
      )}

      {step===1 && (
        <div>
          <h3>Create Username</h3>
          <p>Rules: 3-12 characters, alphanumeric only.</p>
          <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
          <div style={{marginTop:8}} className="row">
            <button onClick={next} disabled={!USER_RE.test(username)}>Next</button>
            <button onClick={()=>setStep(0)}>Back</button>
          </div>
          {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
        </div>
      )}

      {step===2 && (
        <div>
          <h3>Profile Details (optional)</h3>
          <input placeholder="Public name" value={name} onChange={e=>setName(e.target.value)} />
          <div style={{marginTop:8}}>
            <AvatarPicker value={avatar} onChange={(d)=>setAvatar(d)} />
          </div>
          <div style={{marginTop:8}} className="row">
            <button onClick={()=>setStep(1)}>Back</button>
            <button onClick={next}>Finish</button>
          </div>
        </div>
      )}

      {step===3 && (
        <div>
          <h3>Seed Phrase (export and store safely)</h3>
          <textarea readOnly rows={4} style={{width:'100%'}} value={seed} />
          <div className="row" style={{marginTop:8}}>
            <button onClick={()=>{navigator.clipboard.writeText(seed)}}>Copy Seed</button>
            <button onClick={()=>{ const p = loadLocalProfile(); if(p) onComplete(p) }}>I've saved it, continue</button>
          </div>
        </div>
      )}

      {step===4 && (
        <div>
          <h3>Restore from Seed</h3>
          <textarea placeholder="paste seed phrase here" rows={3} style={{width:'100%'}} onBlur={(e)=>{}} id="restore-seed" />
          <div style={{marginTop:8}} className="row">
            <button onClick={()=>{ const v = (document.getElementById('restore-seed') as HTMLTextAreaElement).value; handleRestoreFromSeed(v) }}>Restore</button>
            <button onClick={()=>setStep(0)}>Cancel</button>
          </div>
          {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
        </div>
      )}
    </div>
  )
}
