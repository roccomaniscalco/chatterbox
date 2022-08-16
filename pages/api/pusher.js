import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  secret: process.env.PUSHER_SECRET,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  const { content, sender, sentAt } = req.body;
  console.log("message received", { content, sender, sentAt });

  await pusher.trigger("chat", "chat-event", {
    content,
    sender,
    sentAt,
  });

  res.json({ message: "completed" });
}
