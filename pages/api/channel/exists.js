import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const channelExistsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const channelCount = await prisma.channel.count({
      where: {
        name,
      },
    });

    const doesExist = channelCount > 0;
    res.json({ doesExist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check if channel exists" });
  }
};

export default channelExistsHandler;
