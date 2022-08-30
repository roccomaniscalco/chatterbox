import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getChannel = async (req, res) => {
  const { name } = req.query;

  try {
    const channel = await prisma.channel.findUnique({
      where: { name },
    });
    res.json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve channel" });
  }
};

export default getChannel;
