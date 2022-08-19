import { unstable_getServerSession } from "next-auth";
import { getAuthOptions } from "../../../lib/auth";
import { getPusher } from "../../../lib/pusher";

const authOptions = getAuthOptions();
const pusher = getPusher();

export default async function pusherAuthHandler(req, res) {
  const socketId = req.body.socket_id;
  const session = await unstable_getServerSession(req, res, authOptions);

  const user = {
    id: session.user.id,
    user_info: {
      name: session.user.name,
    },
  };

  const authResponse = pusher.authenticateUser(socketId, user);
  res.send(authResponse);
}
