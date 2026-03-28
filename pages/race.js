import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function RacePage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // This check prevents errors if the keys are missing
    if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY) {
      console.error("Pusher key is missing!");
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
    });

    const channel = pusher.subscribe('race-channel');
    channel.bind('player-joined', (data) => {
      setPlayers((prev) => [...new Set([...prev, data.name])]);
    });

    return () => {
      pusher.unsubscribe('race-channel');
      pusher.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#eee', minHeight: '100vh' }}>
      <h1>Al Farabi Race</h1>
      <div style={{ background: '#222', color: '#fff', padding: '20px', borderRadius: '10px' }}>
        {players.length > 0 ? (
          players.map((p, i) => <div key={i}>🏎️ {p}</div>)
        ) : (
          <p>Waiting for the race to start...</p>
        )}
      </div>
    </div>
  );
}
