import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const prisma = new PrismaClient();

export default async function createFriendRequestHandler(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const { friendId } = req.body;

    const friendRequest = await prisma.friendRequest.create({
        data: {
            senderId: session.user.id,
            receiverId: friendId,
        },
    });
    
    res.json(friendRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create friend request" });
  }
}
