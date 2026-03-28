const Pusher = require("pusher");

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Only POST allowed" });

  try {
    const pusher = new Pusher({
      appId: "1965684",
      key: "47a06f363c46114ec3eb",
      secret: "63b469550e58c8ec23eb", 
      cluster: "ap2",
      useTLS: true,
    });

    // Instead of just "player-joined", we now accept any event type you send
    const { event, data } = req.body;

    if (!event || !data) {
      return res.status(400).json({ error: "Missing event or data" });
    }

    // Broadcast the event to everyone listening on 'race-channel'
    await pusher.trigger("race-channel", event, data);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server crash" });
  }
}
