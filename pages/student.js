import React, { useState } from 'react';

export default function StudentPage() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const joinRace = async () => {
    if (!name) return;
    setStatus('Joining...');
    
    try {
      const res = await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (res.ok) {
        setStatus('✅ Joined successfully!');
      } else {
        setStatus('❌ Failed to join.');
      }
    } catch (err) {
      setStatus('❌ Network error.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Join Al Farabi Race</h1>
      <input 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Enter your name" 
        style={{ padding: '12px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} 
      />
      <br /><br />
      <button 
        onClick={joinRace} 
        style={{ padding: '12px 25px', fontSize: '16px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
        Join Now
      </button>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}
