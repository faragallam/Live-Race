import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useRouter } from 'next/router';

export default function RacePage() {
  const [players, setPlayers] = useState([]);
  const router = useRouter();
  
  // This grabs the theme and mode you selected on the Teacher page
  const { theme, mode } = router.query;

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap2';
    
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

  // Set up different looks based on the chosen theme
  let bgColor = '#222';
  let title = 'Live Race Dashboard';
  let icon = '🏎️';

  if (theme === 'alfarabi') {
    bgColor = '#004d40'; // Al Farabi Green
    title = 'Al Farabi Championship';
    icon = '🏫';
  } else if (theme === 'cars') {
    bgColor = '#b71c1c'; // Racing Red
    title = 'Classic Car Race';
    icon = '🏎️';
  } else if (theme === 'animals') {
    bgColor = '#f57f17'; // Animal Orange
    title = 'Cute Animal Dash';
    icon = '🦁';
  } else if (theme === 'space') {
    bgColor = '#0d47a1'; // Space Blue
    title = 'Space Race';
    icon = '🚀';
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px', background: bgColor, color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>{title}</h1>
      <p style={{ fontSize: '18px', opacity: 0.8 }}>
        Mode: {mode === 'time' ? 'Time-Attack' : 'Race to the Finish'}
      </p>
      
      <div style={{ marginTop: '40px' }}>
        {players.length === 0 && <p style={{ color: '#ddd' }}>Waiting for students...</p>}
        
        {players.map((p, i) => (
          <h2 key={i} style={{ background: '#fff', color: '#000', padding: '15px', borderRadius: '8px', display: 'inline-block', margin: '10px', minWidth: '200px' }}>
            {icon} {p}
          </h2>
        ))}
      </div>
    </div>
  );
}
