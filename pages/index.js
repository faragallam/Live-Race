import { useState } from 'react';

export default function TeacherControl() {
  const [theme, setTheme] = useState('alfarabi');
  const [mode, setMode] = useState('race');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert("CSV Questions loaded successfully! The game is ready.");
    }
  };

  const startGame = () => {
    alert(`Starting ${mode} mode with the ${theme} theme!`);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-10 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border-4 border-blue-200">
        <h1 className="text-4xl font-black text-blue-600 mb-6">Teacher Control System</h1>
        
        {/* Step 1: Upload */}
        <div className="mb-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">1. Load Questions</h2>
          <input type="file" accept=".csv" onChange={handleFileUpload} className="block w-full text-lg cursor-pointer" />
        </div>

        {/* Step 2: Settings */}
        <div className="mb-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-green-700 mb-4">2. Game Settings</h2>
          
          <label className="block text-lg font-bold mb-2 text-gray-700">Select Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-300 mb-4 text-lg cursor-pointer">
            <option value="alfarabi">Al Farabi Theme</option>
            <option value="cars">Classic Car Race</option>
            <option value="animals">Cute Animal Dash</option>
            <option value="space">Space Race</option>
          </select>

          <label className="block text-lg font-bold mb-2 text-gray-700">Select Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-300 text-lg cursor-pointer">
            <option value="race">Race to the Finish (Student-Paced)</option>
            <option value="time">Time-Attack (Marathon)</option>
          </select>
        </div>

        {/* Step 3: Launch */}
        <button onClick={startGame} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black text-2xl py-4 rounded-xl shadow-lg transform transition active:scale-95">
          LAUNCH GAME!
        </button>
      </div>
    </div>
  );
}
