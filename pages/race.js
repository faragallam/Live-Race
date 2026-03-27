import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function RacePage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // 1. Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    // 2. Subscribe to the channel
    const channel = pusher.subscribe('race-channel');

    // 3. Listen for new players
    channel.bind('player-joined', (data) => {
      setPlayers((prev) => [...prev, data.name]);
    });

    return () => {
      pusher.unsubscribe('race-channel');
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Al Farabi English Race</h1>
      <div style={{ 
        height: '400px', 
        background: '#4CAF50', 
        position: 'relative', 
        borderRadius: '10px',
        border: '4px solid #fff'
      }}>
        {players.map((name, index) => (
          <div key={index} style={{ 
            padding: '10px', 
            background: 'white', 
            margin: '10px', 
            borderRadius: '5px',
            display: 'inline-block'
          }}>
            🏎️ {name}
          </div>
        ))}
        {players.length === 0 && <p style={{ color: 'white' }}>Waiting for students to join...</p>}
      </div>
    </div>
  );
}
