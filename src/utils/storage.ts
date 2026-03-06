const PROFILE_KEY = 'p2p_pool_profile_v1'

export type Profile = {
  username: string
  pub: string
  priv?: string
  name?: string
  avatarUrl?: string
}

export function saveProfile(p:Profile){
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p))
}

export function loadProfile():Profile | null{
  const raw = localStorage.getItem(PROFILE_KEY)
  if(!raw) return null
  try{ return JSON.parse(raw) }catch(e){ return null }
}
