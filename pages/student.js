import React, { useState } from 'react';

export default function StudentPage() {
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);

  const joinRace = async () => {
    if (!name) return alert("Please enter your name");
    
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
        setJoined(true);
      }
    } catch (error) {
      console.error("Error joining:", error);
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      {!joined ? (
        <div>
          <h1>Join the Al Farabi Race</h1>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
          />
          <br /><br />
          <button 
            onClick={joinRace}
            style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Join Race!
          </button>
        </div>
      ) : (
        <h1>✅ You are in the race, {name}! Look at the big screen.</h1>
      )}
    </div>
  );
}
