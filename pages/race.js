import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useRouter } from 'next/router';

export default function RacePage() {
  const [players, setPlayers] = useState([]);
  const router = useRouter();
  const { theme, mode } = router.query;

  useEffect(() => {
    // Using your exact public key and cluster
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

  let bgColor = '#111';
  let title = 'Live Race Dashboard';
  let icon = '🏎️';

  if (theme === 'alfarabi') { bgColor = '#004d40'; title = 'Al Farabi Championship'; icon = '🏫'; }
  if (theme === 'cars') { bgColor = '#b71c1c'; title = 'Classic Car Race'; icon = '🏎️'; }
  if (theme === 'animals') { bgColor = '#f57f17'; title = 'Cute Animal Dash'; icon = '🦁'; }
  if (theme === 'space') { bgColor = '#0d47a1'; title = 'Space Race'; icon = '🚀'; }

  return (
    <div style={{ textAlign: 'center', padding: '50px', background: bgColor, color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>{title}</h1>
      <p style={{ opacity: 0.8 }}>Mode: {mode === 'time' ? 'Time-Attack' : 'Race to the Finish'}</p>
      
      <div style={{ marginTop: '40px' }}>
        {players.length === 0 && <p>Waiting for students...</p>}
        {players.map((p, i) => (
          <h2 key={i} style={{ background: '#fff', color: '#000', padding: '15px', borderRadius: '8px', display: 'inline-block', margin: '10px' }}>
            {icon} {p}
          </h2>
        ))}
      </div>
    </div>
  );
}
