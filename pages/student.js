import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

export default function StudentPage() {
  const [name, setName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');

  // This listens for the exact moment the Teacher hits "LAUNCH"
  useEffect(() => {
    const pusher = new Pusher('47a06f363c46114ec3eb', { cluster: 'ap2' });
    const channel = pusher.subscribe('race-channel');

    channel.bind('game-started', (data) => {
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setGameStarted(true); // This instantly flips their phone to the quiz!
      }
    });

    return () => {
      pusher.unsubscribe('race-channel');
      pusher.disconnect();
    };
  }, []);

  const joinRace = async () => {
    if (!name) return;
    setStatus('Joining...');

    try {
      const res = await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event: 'player-joined', 
          data: { name: name } 
        })
      });

      if (res.ok) {
        setHasJoined(true);
      } else {
        setStatus('❌ Failed to join.');
      }
    } catch (err) {
      setStatus('❌ Network error.');
    }
  };

  const handleAnswer = async (selectedOption) => {
    // Check if what they clicked matches the correct answer in your CSV
    const isCorrect = selectedOption.trim().toLowerCase() === questions[currentQ].answer.trim().toLowerCase();

    if (isCorrect) {
      setScore(score + 1);
      // Tell the server they got it right, so the big screen can move their car!
      await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event: 'player-scored', 
          data: { name: name } 
        })
      });
    }

    // Move to the next question, or end the game if they finished
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setGameStarted("finished");
    }
  };

  // SCREEN 3: The End screen when they finish all questions
  if (gameStarted === "finished") {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '3rem' }}>🏁</h1>
        <h2 style={{ color: '#004d40' }}>Great job, {name}!</h2>
        <p style={{ fontSize: '1.2rem' }}>You got {score} out of {questions.length} correct.</p>
      </div>
    );
  }

  // SCREEN 2: The Live Quiz (appears when teacher hits Launch)
  if (gameStarted && questions.length > 0) {
    const q = questions[currentQ];
    return (
      <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
        <h3 style={{ color: '#004d40' }}>Question {currentQ + 1} / {questions.length}</h3>
        <h2 style={{ margin: '30px 0' }}>{q.q}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
          {q.options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer(opt)}
              style={{ padding: '15px', fontSize: '18px', backgroundColor: '#e0f2f1', border: '2px solid #004d40', borderRadius: '8px', cursor: 'pointer' }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // SCREEN 1: The Waiting Room (after they type their name)
  if (hasJoined) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
        <h2>You are in, {name}! 🏎️</h2>
        <p>Look at the big screen and wait for the teacher to start the race...</p>
      </div>
    );
  }

  // SCREEN 0: The Initial Login
  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#004d40' }}>Al-Farabi Race</h1>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Type your name" 
        style={{ padding: '15px', fontSize: '18px', borderRadius: '5px', border: '2px solid #ccc', width: '80%', maxWidth: '300px' }} 
      />
      <br /><br />
      <button 
        onClick={joinRace} 
        style={{ padding: '15px 30px', fontSize: '18px', background: '#004d40', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Join Now
      </button>
      <p style={{ marginTop: '20px', color: 'red', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}
