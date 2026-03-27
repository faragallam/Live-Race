import { useState } from 'react';

export default function StudentView() {
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState(null); 
  const [isSending, setIsSending] = useState(false); // Prevents double-clicking

  // A classic Key A2 practice question!
  const currentQuestion = {
    question: "I always _____ my homework before dinner.",
    options: { A: "make", B: "do", C: "have", D: "work" },
    answer: "B"
  };

  // This is the walkie-talkie broadcaster!
  const sendSignal = async (eventName, data) => {
    await fetch('/api/pusher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, data })
    });
  };

  const handleJoin = async () => {
    if (name.trim()) {
      setJoined(true);
      // Tell the smartboard a new student arrived!
      await sendSignal('student-joined', { name, avatar: "🏎️" }); 
    }
  };

  const submitAnswer = async (selectedOption) => {
    if (isSending) return; // Stop them from spamming the button
    setIsSending(true);

    if (selectedOption === currentQuestion.answer) {
      setFeedback('correct');
      // Tell the smartboard to move their car!
      await sendSignal('correct-answer', { name });
    } else {
      setFeedback('wrong');
    }
    
    // "Show and Go" logic: wait 2 seconds, then clear feedback
    setTimeout(() => {
      setFeedback(null);
      setIsSending(false);
    }, 2000);
  };

  if (!joined) {
    return (
      <div className="min-h-screen bg-purple-500 flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-black text-white mb-8 drop-shadow-md text-center">Join the Race!</h1>
        <input 
          type="text" 
          placeholder="Enter your name..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-2xl p-4 rounded-xl mb-6 w-full max-w-md text-center border-4 border-purple-300 shadow-xl focus:outline-none focus:border-yellow-400"
        />
        <button onClick={handleJoin} className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-black text-3xl py-4 px-12 rounded-xl shadow-xl transform transition active:scale-95 w-full max-w-md">
          GO!
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 p-6 flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border-4 border-blue-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{currentQuestion.question}</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(currentQuestion.options).map(([key, value]) => {
            let btnClass = "bg-blue-400 hover:bg-blue-500 text-white";
            if (feedback) {
              if (key === currentQuestion.answer) btnClass = "bg-green-500 text-white border-4 border-green-700"; 
              else if (feedback === 'wrong') btnClass = "bg-red-500 text-white opacity-50"; 
            }

            return (
              <button 
                key={key} 
                disabled={feedback !== null || isSending}
                onClick={() => submitAnswer(key)}
                className={`text-2xl font-bold py-6 rounded-2xl shadow-md transform transition active:scale-95 ${btnClass}`}
              >
                {value}
              </button>
            );
          });}
        </div>
        
        {/* Feedback Banner */}
        <div className="h-12 mt-6">
          {feedback === 'correct' && <h3 className="text-3xl font-black text-green-500 animate-bounce">Great Job!</h3>}
          {feedback === 'wrong' && <h3 className="text-3xl font-black text-red-500 animate-pulse">Let's learn it!</h3>}
        </div>
      </div>
    </div>
  )
}
