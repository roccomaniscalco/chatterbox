import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const channelExists = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check if channel exists" });
  }
};

export default channelExists;
