import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const prisma = new PrismaClient();

export default async function getUserFriendRequestsHandler(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Unauthenticated" });
    }
    
    const friendRequests = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        friendRequestsReceived: true,
        friendRequestsSent: true,
      },
    });

    res.json({
      received: friendRequests.friendRequestsReceived,
      sent: friendRequests.friendRequestsSent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get friend requests" });
  }
}
