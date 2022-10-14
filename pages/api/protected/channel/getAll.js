import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

const prisma = new PrismaClient();

export default async function getAllChannels(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const channels = await prisma.channel.findMany({
      // select only the fields we need
      select: {
        id: true,
        adminId: true,
        slug: true,
        name: true,
        image: true,
        createdAt: true,
        _count: {
          select: { users: true },
        },
      },
      where: {
        users: {
          some: {
            id: session.user.id,
          },
        },
      },
    });
    res.json(channels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get channels by user" });
  }
}
