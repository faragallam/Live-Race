import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function RacePage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const pusher = new Pusher('47a06f363c46114ec3eb', { cluster: 'ap2' });
    const channel = pusher.subscribe('race-channel');
    
    channel.bind('player-joined', (data) => {
      setPlayers((prev) => [...prev, data.name]);
    });

    return () => {
      pusher.unsubscribe('race-channel');
      pusher.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif', background: '#111', color: 'white', minHeight: '100vh' }}>
      <h1>Live Race Dashboard</h1>
      <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        {players.length === 0 ? <p style={{ color: '#888' }}>Waiting for students...</p> : null}
        
        {players.map((name, i) => (
          <div key={i} style={{ fontSize: '24px', padding: '15px 30px', background: '#fff', color: '#000', borderRadius: '8px', width: '80%', maxWidth: '400px' }}>
            🏎️ {name}
          </div>
        ))}
      </div>
    </div>
  );
}
