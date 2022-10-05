import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const prisma = new PrismaClient();

export default async function userSearch(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const { searchTerm } = req.query;

    const users = await prisma.user.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        friendshipsReceived: {
          where: {
            senderId: session.user.id,
          },
        },
        friendshipsSent: {
          where: {
            receiverId: session.user.id,
          },
        },
      },
      where: {
        OR: [
          { email: { contains: searchTerm } },
          { name: { contains: searchTerm } },
        ],
        id: { not: session.user.id },
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json(
      users.map((user) => ({
        id: user.id,
        name: user.name,
        image: user.image,
        email: user.email,
        friendship: user.friendshipsReceived[0] || user.friendshipsSent[0],
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to search users" });
  }
}
