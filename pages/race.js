import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function RacePage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe('race-channel');
    channel.bind('player-joined', (data) => {
      setPlayers((prev) => {
        if (prev.includes(data.name)) return prev;
        return [...prev, data.name];
      });
    });

    return () => {
      pusher.unsubscribe('race-channel');
      pusher.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#333' }}>Al Farabi English Race</h1>
      <div style={{ 
        height: '400px', 
        background: '#4CAF50', 
        borderRadius: '15px', 
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        border: '5px solid #2e7d32'
      }}>
        {players.map((name, index) => (
          <div key={index} style={{ 
            padding: '10px 20px', 
            background: 'white', 
            borderRadius: '25px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            🏎️ {name}
          </div>
        ))}
        {players.length === 0 && <p style={{ color: 'white', width: '100%' }}>Waiting for students...</p>}
      </div>
    </div>
  );
}
