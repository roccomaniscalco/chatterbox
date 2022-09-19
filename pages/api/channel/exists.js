import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const prisma = new PrismaClient();

const channelExists = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (session) {
      const { slug } = req.query;
      if (!slug) {
        res.status(400).json({ message: "Slug is required" });
      }

      const channelCount = await prisma.channel.count({
        where: {
          slug,
        },
      });

      const doesExist = channelCount > 0;
      res.json({ doesExist });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check if channel exists" });
  }
};

export default channelExists;
