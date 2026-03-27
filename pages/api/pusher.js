import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { eventName, data } = req.body;
    await pusher.trigger('race-channel', eventName, data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Pusher Server Error:", error);
    res.status(500).json({ error: error.message });
  }
}
