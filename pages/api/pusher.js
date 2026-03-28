import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'ap2', // Hard-coded to match your Vercel setting
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { eventName, data } = req.body;
    
    // We check if the data is arriving from the student page
    if (!eventName || !data) {
      return res.status(400).json({ error: "No data received" });
    }

    await pusher.trigger('race-channel', eventName, data);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Pusher Error:", error.message);
    return res.status(400).json({ error: "Check Pusher Credentials in Vercel" });
  }
}
