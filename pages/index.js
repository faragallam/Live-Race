import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TeacherControl() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("Waiting for CSV...");

  // Reads the CSV and turns it into a list of questions
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      // Skip the header row and map the rest
      const parsedQuestions = lines.slice(1).map(line => {
        const [q, a, b, c, d, answer] = line.split(',');
        return { q, options: [a, b, c, d], answer: answer?.trim() };
      });

      setQuestions(parsedQuestions);
      setStatus(`✅ Loaded ${parsedQuestions.length} questions!`);
    };
    reader.readAsText(file);
  };

  const startGame = async () => {
    if (questions.length === 0) {
      alert("Please upload a CSV file first!");
      return;
    }

    setStatus("Starting game...");

    // Send the questions to the Pusher server to broadcast to students
    await fetch('/api/pusher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        event: 'game-started', 
        data: { questions } 
      })
    });

    // Move the teacher to the big screen dashboard
    router.push('/race');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e0f2f1', padding: '50px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '15px' }}>
        <h1 style={{ color: '#004d40' }}>Al-Farabi English Race</h1>
        
        <div style={{ border: '3px dashed #004d40', padding: '30px', margin: '20px 0', backgroundColor: '#f1f8e9' }}>
          <h2 style={{ color: '#33691e' }}>Upload CSV Questions</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>Format: Question, A, B, C, D, CorrectAnswer</p>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>

        <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#d84315' }}>{status}</p>

        <button 
          onClick={startGame} 
          style={{ width: '100%', padding: '15px', fontSize: '20px', backgroundColor: '#004d40', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}>
          LAUNCH GAME TO STUDENTS
        </button>
      </div>
    </div>
  );
}
