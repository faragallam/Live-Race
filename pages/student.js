import React, { useState } from 'react';

export default function StudentPage() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const joinRace = async () => {
    if (!name) return;
    setStatus('Sending...');
    
    try {
      const res = await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      });

      if (res.ok) {
        setStatus('✅ Success!');
      } else {
        setStatus('❌ Error: ' + res.status);
      }
    } catch (err) {
      setStatus('❌ Network Error');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Join the Race</h2>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name"
        style={{ padding: '12px', fontSize: '16px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <br/>
      <button 
        onClick={joinRace} 
        style={{ padding: '12px 25px', fontSize: '16px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
        Join Now
      </button>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}
