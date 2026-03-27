import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function RacePage() {
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    // Safety check to ensure code only runs in the browser
    if (typeof window !== "undefined") {
      const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
      const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

      if (!pusherKey || !pusherCluster) {
        setStatus("Error: Missing Pusher Keys in Vercel Settings");
        return;
      }

      const pusher = new Pusher(pusherKey, {
        cluster: pusherCluster,
      });

      const channel = pusher.subscribe('race-channel');
      
      setStatus("Connected! Waiting for students...");

      channel.bind('player-joined', (data) => {
        setPlayers((prev) => {
          // Prevent duplicate names
          if (prev.includes(data.name)) return prev;
          return [...prev, data.name];
        });
      });

      return () => {
        pusher.unsubscribe('race-channel');
        pusher.disconnect();
      };
    }
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50', fontSize: '2.5rem' }}>🏆 Al Farabi English Race 🏆</h1>
      <p style={{ fontWeight: 'bold', color: players.length > 0 ? '#27ae60' : '#e67e22' }}>{status}</p>
      
      <div style={{ 
        height: '500px', 
        background: 'linear-gradient(to bottom, #2ecc71 0%, #27ae60 100%)', 
        position: 'relative', 
        borderRadius: '20px',
        border: '8px solid #34495e',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        overflowY: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        padding: '20px'
      }}>
        {players.map((name, index) => (
          <div key={index} style={{ 
            padding: '15px 25px', 
            background: 'white', 
            margin: '10px', 
            borderRadius: '50px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderLeft: '5px solid #e74c3c',
            animation: 'slideIn 0.5s ease-out'
          }}>
            🏎️ {name}
          </div>
        ))}
        {players.length === 0 && (
          <div style={{ width: '100%', marginTop: '100px', color: 'white', opacity: 0.8 }}>
            <h2>No students have joined yet.</h2>
            <p>Share your student link to start the race!</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
