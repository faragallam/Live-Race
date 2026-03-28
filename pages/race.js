import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function RacePage() {
  const [players, setPlayers] = useState([]);
  const [connection, setConnection] = useState('Initializing...');

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

    if (!key) {
      setConnection('❌ Error: Pusher Key Missing');
      return;
    }

    const pusher = new Pusher(key, { cluster: cluster || 'ap2' });
    const channel = pusher.subscribe('race-channel');

    setConnection('Searching for signals...');

    channel.bind('player-joined', (data) => {
      setConnection('🏎️ Signal received!');
      setPlayers((prev) => [...new Set([...prev, data.name])]);
    });

    pusher.connection.bind('connected', () => setConnection('✅ Race Track Online'));

    return () => {
      pusher.unsubscribe('race-channel');
      pusher.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial', background: '#111', minHeight: '100vh', color: 'white' }}>
      <h1>Al Farabi Racing Dashboard</h1>
      <p style={{ color: '#aaa' }}>Status: {connection}</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
        {players.map((name, i) => (
          <div key={i} style={{ background: '#fff', color: '#333', padding: '20px', borderRadius: '10px', fontSize: '24px', fontWeight: 'bold' }}>
            🏎️ {name}
          </div>
        ))}
        {players.length === 0 && <p>Waiting for students to join...</p>}
      </div>
    </div>
  );
}
