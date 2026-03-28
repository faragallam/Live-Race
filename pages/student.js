import React, { useState } from 'react';

export default function StudentPage() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const joinRace = async () => {
    if (!name) return alert("Please enter your name");
    setStatus('Sending...');
    
    try {
      const response = await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'player-joined',
          data: { name: name }
        }),
      });

      if (response.ok) {
        setStatus('✅ Joined! Check the big screen.');
      } else {
        const err = await response.json();
        setStatus('❌ Error: ' + err.error);
      }
    } catch (error) {
      setStatus('❌ Connection failed.');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Join the Race</h1>
      <input 
        type="text" 
        placeholder="Your Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '15px', fontSize: '18px', width: '80%', maxWidth: '300px' }}
      />
      <br /><br />
      <button 
        onClick={joinRace}
        style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Join Now
      </button>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}
