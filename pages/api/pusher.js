import Pusher from 'pusher';

const pusher = new Pusher({
  appId: "1965684",
  key: "47a06f363c46114ec3eb",
  secret: "63b469550e58c8ec23eb",
  cluster: "ap2",
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  try {
    const { eventName, data } = req.body;
    await pusher.trigger('race-channel', eventName, data);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
