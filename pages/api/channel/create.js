import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createChannel = async (req, res) => {
  try {
    const { slug, name, description, image, userId } = req.body;
    const channel = await prisma.channel.create({
      data: {
        slug,
        name,
        description,
        image,
        users: {
          connect: [{ id: userId }],
        },
        admin: {
          connect: { id: userId },
        },
      },
    });
    res.json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create channel" });
  }
};

export default createChannel;
