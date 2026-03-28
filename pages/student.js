import React, { useState } from 'react';

export default function StudentPage() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const join = async () => {
    if (!name) return;
    setMsg('Connecting...');
    
    try {
      const res = await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName: 'player-joined', data: { name } }),
      });

      if (res.ok) {
        setMsg('✅ Success! Joined the race.');
      } else {
        const errorData = await res.json();
        setMsg(`❌ Failed: ${res.status} - ${errorData.error || 'Check Keys'}`);
      }
    } catch (err) {
      setMsg('❌ Network Error');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial' }}>
      <h1>Al Farabi English Race</h1>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Type your name" 
        style={{ padding: '15px', fontSize: '18px' }} 
      />
      <button onClick={join} style={{ padding: '15px', marginLeft: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
        Join Race
      </button>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{msg}</p>
    </div>
  );
}
