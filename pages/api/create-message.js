import { getPusher } from "../../lib/pusher";

pusher = getPusher();

export default async function createMessageHandler(req, res) {
  const { content, sender, sentAt } = req.body;
  console.log("message received", { content, sender, sentAt });

  await pusher.trigger("chat", "chat-event", {
    content,
    sender,
    sentAt,
  });

  res.json({ message: "completed" });
}
