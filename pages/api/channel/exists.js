import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const channelExists = async (req, res) => {
  console.log(req.query)
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }

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

export default channelExists;
