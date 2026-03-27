import Pusher from 'pusher';

// This safely loads your secret keys from Vercel
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { eventName, data } = req.body;

    try {
      // This broadcasts the message to the whole classroom on the "race-channel"
      await pusher.trigger('race-channel', eventName, data);
      res.status(200).json({ message: 'Signal sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send signal.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
