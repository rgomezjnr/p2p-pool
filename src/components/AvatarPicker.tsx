import React, {useRef, useState} from 'react'

type Props = { value?: string, onChange: (dataUrl?:string)=>void }

function initialsFromName(name:string, fallback:string){
  const parts = name.trim().split(/\s+/)
  if(parts.length===0) return fallback.slice(0,2).toUpperCase()
  if(parts.length===1) return parts[0].slice(0,2).toUpperCase()
  return (parts[0][0]+parts[1][0]).toUpperCase()
}

export default function AvatarPicker({value, onChange}:Props){
  const fileRef = useRef<HTMLInputElement|null>(null)
  const [preview, setPreview] = useState<string|undefined>(value)

  function handleFile(e:React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0]
    if(!f) return
    const r = new FileReader()
    r.onload = ()=>{
      const data = r.result as string
      setPreview(data)
      onChange(data)
    }
    r.readAsDataURL(f)
  }

  function generateIdenticon(seed:string){
    const canvas = document.createElement('canvas')
    canvas.width = 128; canvas.height = 128
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#ddd'
    ctx.fillRect(0,0,128,128)
    ctx.fillStyle = '#444'
    ctx.font = '48px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(initialsFromName(seed, 'U'), 64, 64)
    const data = canvas.toDataURL()
    setPreview(data)
    onChange(data)
  }

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:64,height:64,borderRadius:8,overflow:'hidden',background:'#eee',display:'flex',alignItems:'center',justifyContent:'center'}}>
          {preview ? <img src={preview} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <div style={{fontSize:24,color:'#888'}}>?</div>}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <input type="file" accept="image/*" ref={fileRef} onChange={handleFile} />
          <div className="row">
            <button onClick={()=>generateIdenticon('')}>Generate</button>
            <button onClick={()=>{ setPreview(undefined); onChange(undefined) }}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  )
}
