import React, {useState} from 'react'

type GameType = '8ball'|'9ball'|'10ball'

export default function Match(){
  const [game, setGame] = useState<GameType>('8ball')
  const [playerA, setPlayerA] = useState('Player A')
  const [playerB, setPlayerB] = useState('Player B')
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)

  function reset(){ setScoreA(0); setScoreB(0) }

  return (
    <div>
      <div className="card">
        <h2>New Match</h2>
        <div className="row">
          <label>Game:</label>
          <select value={game} onChange={e=>setGame(e.target.value as GameType)}>
            <option value="8ball">8 Ball</option>
            <option value="9ball">9 Ball</option>
            <option value="10ball">10 Ball</option>
          </select>
        </div>
        <div className="row" style={{marginTop:8}}>
          <input value={playerA} onChange={e=>setPlayerA(e.target.value)} />
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:18}}>{scoreA} - {scoreB}</div>
            <div className="row" style={{marginTop:8}}>
              <button onClick={()=>setScoreA(s=>s+1)}>+1 {playerA}</button>
              <button onClick={()=>setScoreB(s=>s+1)}>+1 {playerB}</button>
            </div>
            <div className="row" style={{marginTop:8}}>
              <button onClick={reset}>Reset</button>
            </div>
          </div>
          <input value={playerB} onChange={e=>setPlayerB(e.target.value)} />
        </div>
      </div>
      <div className="card">
        <h3>Scoreboard</h3>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div>
            <b>{playerA}</b>
            <div>Score: {scoreA}</div>
          </div>
          <div>
            <b>{playerB}</b>
            <div>Score: {scoreB}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
