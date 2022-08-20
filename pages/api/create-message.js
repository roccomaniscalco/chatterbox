import { getPusher } from "../../lib/pusher";

pusher = getPusher();

export default async function createMessageHandler(req, res) {
  const { content, sender, sentAt } = req.body;
  console.log("message received", { content, sender, sentAt });

  const session = await unstable_getServerSession(req, res, authOptions);
  const channelUsers = await prisma.Channel.findUnique({
    where: {
      name: channel_name,
    },
  });
  console.log("channelUsers", channelUsers);

  await pusher.trigger("private-chat", "chat-event", {
    content,
    sender,
    sentAt,
  });

  res.json({ message: "completed" });
}
