import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  const { eventName, data } = req.body;

  if (!process.env.PUSHER_APP_ID || !process.env.PUSHER_SECRET) {
    return res.status(500).json({ error: "Missing server keys" });
  }

  try {
    await pusher.trigger('race-channel', eventName, data);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
