import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function RacePage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap2';
    
    // Safety check so it doesn't break if Vercel is slow to load keys
    if (!key) return;

    const pusher = new Pusher(key, { cluster: cluster });
    const channel = pusher.subscribe('race-channel');
    
    channel.bind('player-joined', (data) => {
      setPlayers(prev => [...prev, data.name]);
    });

    return () => {
      pusher.unsubscribe('race-channel');
      pusher.disconnect();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px', background: '#222', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Al Farabi Live Race Dashboard</h1>
      <div style={{ marginTop: '30px' }}>
        {players.length === 0 && <p style={{ color: '#aaa' }}>Waiting for students...</p>}
        {players.map((p, i) => (
          <h2 key={i} style={{ background: '#fff', color: '#000', padding: '15px', borderRadius: '8px', display: 'inline-block', margin: '10px', minWidth: '200px' }}>
            🏎️ {p}
          </h2>
        ))}
      </div>
    </div>
  );
}
