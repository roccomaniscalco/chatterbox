import { getPusher } from "../../../lib/pusher";

const pusher = getPusher();

export default async function pusherAuthHandler(req, res) {
  const { socket_id, channel_name } = req.body;

  const authResponse = pusher.authorizeChannel(socket_id, channel_name);
  res.send(authResponse);
}
