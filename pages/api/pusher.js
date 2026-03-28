import Pusher from 'pusher';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Next.js requires the server Pusher instance to be configured exactly like this
  const pusher = new Pusher({
    appId: "1965684",
    key: "47a06f363c46114ec3eb",
    secret: process.env.PUSHER_SECRET, 
    cluster: "ap2",
    useTLS: true,
  });

  try {
    const playerName = req.body.name;
    
    if (!playerName) {
      return res.status(400).json({ error: "Name is required" });
    }

    await pusher.trigger('race-channel', 'player-joined', {
      name: playerName
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
