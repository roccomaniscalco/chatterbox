import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const prisma = new PrismaClient();

export default async function upsertFriendship(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const { receiverId, status } = req.body;

    const friendship = await prisma.friendship.upsert({
      where: {
        senderId_receiverId: {
          senderId: session.user.id,
          receiverId,
        },
      },
      create: {
        senderId: session.user.id,
        receiverId,
        status,
      },
      update: {
        status,
      },
    });

    res.json(friendship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create friend request" });
  }
}
