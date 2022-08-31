import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getChannelHandler = async (req, res) => {
  const { name } = req.query;
  console.log("name", name);

  try {
    const channel = await prisma.channel.findUniqueOrThrow({
      where: { name },
    });
    res.json(channel);
    console.log("channel", channel);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Channel not found" });
  }
};

export default getChannelHandler;
