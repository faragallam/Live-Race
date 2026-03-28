import { useRouter } from 'next/router';

export default function TeacherControl() {
  const router = useRouter();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // The moment you upload the questions, it immediately goes to the big screen
      router.push('/race');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e0f2f1', padding: '50px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ color: '#004d40', fontSize: '2.5rem', marginBottom: '10px' }}>
          Al-Farabi English Race
        </h1>
        <p style={{ color: '#555', fontSize: '1.2rem', marginBottom: '30px' }}>
          Upload your questions to start the live game.
        </p>
        
        <div style={{ border: '3px dashed #004d40', padding: '30px', borderRadius: '10px', backgroundColor: '#f1f8e9' }}>
          <h2 style={{ color: '#33691e', marginBottom: '20px' }}>Upload CSV Questions</h2>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload} 
            style={{ fontSize: '18px', cursor: 'pointer' }}
          />
        </div>

      </div>
    </div>
  );
}
