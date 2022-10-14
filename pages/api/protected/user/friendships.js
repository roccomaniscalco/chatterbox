import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

const prisma = new PrismaClient();

export default async function getFriendshipsHandler(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            senderId: session.user.id,
          },
          {
            receiverId: session.user.id,
          },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    res.json(friendships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get friendships" });
  }
}
