import React, {useState, useEffect} from 'react'
import { loadProfile, Profile } from '../utils/storage'
import Onboarding from '../components/Onboarding'

export default function Profile(){
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(()=>{
    const p = loadProfile()
    if(p) setProfile(p)
  },[])

  if(!profile){
    return (
      <div>
        <Onboarding onComplete={(p)=>{ setProfile(p) }} />
      </div>
    )
  }

  return (
    <div>
      <div className="card">
        <h2>Profile</h2>
        <div>Username: <b>{profile.username}</b></div>
        <div>Pubkey: <code style={{fontSize:12}}>{profile.pub}</code></div>
        <div style={{marginTop:8}}><button onClick={()=>{navigator.clipboard.writeText(profile.pub)}}>Copy Pubkey</button></div>
      </div>
      <div className="card">
        <h3>Notes</h3>
        <ul>
          <li>Profiles are created from a seed phrase (no email).</li>
          <li>Seed/private key is stored locally in this prototype — export your seed to recover on other devices.</li>
        </ul>
      </div>
    </div>
  )
}
