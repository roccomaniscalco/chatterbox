import { unstable_getServerSession } from "next-auth";
import { getAuthOptions } from "../../../lib/auth";
import { getPrisma } from "../../../lib/prisma";
import { getPusher } from "../../../lib/pusher";

const authOptions = getAuthOptions();
const pusher = getPusher();
const prisma = getPrisma();

export default async function pusherAuthHandler(req, res) {
  const { socket_id, channel_name } = req.body;

  const authResponse = pusher.authorizeChannel(socket_id, channel_name);
  res.send(authResponse);
}
