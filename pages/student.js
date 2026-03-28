import React, { useState } from 'react';

export default function StudentPage() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const join = async () => {
    if (!name) return;
    setMsg('Joining...');
    const res = await fetch('/api/pusher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName: 'player-joined', data: { name } }),
    });
    if (res.ok) setMsg('✅ Success!');
    else setMsg('❌ Failed: ' + res.status);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Al Farabi Race</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{ padding: '10px' }} />
      <button onClick={join} style={{ padding: '10px', marginLeft: '5px' }}>Join</button>
      <p>{msg}</p>
    </div>
  );
}
