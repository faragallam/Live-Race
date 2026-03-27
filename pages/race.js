import { useState } from 'react';

export default function RacePlayground() {
  // We are using mock data here for now. 
  // Once Pusher is connected, these scores will update instantly!
  const [students, setStudents] = useState([
    { id: 1, name: "Ahmed", score: 80, avatar: "🏎️" },
    { id: 2, name: "Sara", score: 60, avatar: "🚀" },
    { id: 3, name: "Ali", score: 30, avatar: "🐯" },
  ]);

  return (
    <div className="min-h-screen bg-green-400 overflow-hidden relative font-sans">
      {/* Finish Line with Al Farabi */}
      <div className="absolute top-0 bottom-0 right-10 w-12 bg-white border-l-4 border-r-4 border-black flex flex-col justify-between py-10 opacity-80 z-0">
        <div className="w-full h-8 bg-black"></div>
        <div className="w-full h-8 bg-black"></div>
        <div className="w-full h-8 bg-black"></div>
        <div className="w-full h-8 bg-black"></div>
        <div className="w-full h-8 bg-black"></div>
      </div>
      
      {/* Al Farabi Character Placeholder at Finish Line */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-7xl z-10 animate-bounce drop-shadow-2xl">
        🧙‍♂️ {/* Replace this emoji later with your actual Al Farabi cartoon image! */}
      </div>

      <div className="p-8 relative z-20">
        <h1 className="text-6xl font-black text-white text-center mb-12 drop-shadow-xl tracking-widest uppercase border-b-4 border-white pb-4 inline-block mx-auto w-full">
          English Super Race!
        </h1>

        <div className="flex flex-col gap-8 mt-10">
          {students.map((student) => (
            <div key={student.id} className="relative w-full h-24 bg-green-500 rounded-full border-4 border-green-700 shadow-inner flex items-center px-4">
              
              {/* The Track Line */}
              <div className="absolute left-4 right-24 h-2 bg-white opacity-40 border-dashed border-b-4 rounded-full"></div>
              
              {/* The Student Avatar moving across the screen */}
              <div 
                className="absolute transition-all duration-1000 ease-out flex flex-col items-center"
                style={{ left: `${student.score}%`, transform: 'translateX(-50%)' }}
              >
                <span className="text-6xl filter drop-shadow-lg">{student.avatar}</span>
                <span className="text-white font-black bg-black bg-opacity-60 px-4 py-1 rounded-full text-lg mt-2 border-2 border-gray-400">
                  {student.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
