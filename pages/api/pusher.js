const Pusher = require('pusher');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ message: 'API active' });

  try {
    const pusher = new Pusher({
      appId: "1965684",
      key: "47a06f363c46114ec3eb",
      secret: "63b469550e58c8ec23eb",
      cluster: "ap2",
      useTLS: true,
    });

    await pusher.trigger('race-channel', 'player-joined', {
      name: req.body.name || "Unknown Driver"
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Crash Details:", error);
    res.status(500).json({ error: error.message });
  }
}
