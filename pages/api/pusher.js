const Pusher = require("pusher");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const pusher = new Pusher({
      appId: "1965684",
      key: "47a06f363c46114ec3eb",
      secret: "63b469550e58c8ec23eb", 
      cluster: "ap2",
      useTLS: true,
    });

    const playerName = req.body.name || "Unknown Student";

    await pusher.trigger("race-channel", "player-joined", {
      name: playerName
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server crash" });
  }
}
