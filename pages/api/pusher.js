import Pusher from 'pusher';

const pusher = new Pusher({
  appId: "1965684",
  key: "47a06f363c46114ec3eb",
  secret: "63b469550e58c8ec23eb",
  cluster: "ap2",
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { eventName, data } = req.body;
    
    // Triggering the event to Pusher
    await pusher.trigger('race-channel', eventName, data);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    // This will tell us exactly what Pusher doesn't like
    console.error("Pusher Error:", error);
    return res.status(400).json({ error: error.message });
  }
}
