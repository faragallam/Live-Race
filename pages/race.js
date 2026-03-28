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
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#004d40', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Al-Farabi Championship</h1>
      <p style={{ fontSize: '1.5rem', opacity: 0.8, marginBottom: '40px' }}>Waiting for students to join...</p>
      
      <div>
        {players.map((p, i) => (
          <h2 key={i} style={{ background: '#fff', color: '#000', padding: '15px 30px', borderRadius: '8px', display: 'inline-block', margin: '10px' }}>
            🏫 {p}
          </h2>
        ))}
      </div>
    </div>
  );
}
