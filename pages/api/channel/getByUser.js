import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const prisma = new PrismaClient();

const getChannelsByUser = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (session) {
      const channels = await prisma.channel.findMany({
        // select only the fields we need
        select: {
          id: true,
          adminId: true,
          name: true,
          image: true,
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
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get channels by user" });
  }
};

export default getChannelsByUser;
