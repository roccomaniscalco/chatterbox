import { getPrisma } from "../../lib/prisma";

const prisma = getPrisma();

const createChannel = async (req, res) => {
  const { name, description, image, userId } = req.body;

  try {
    const channel = await prisma.channel.create({
      data: {
        name,
        description,
        image,
        users: {
          connect: [{ id: userId }],
        },
      },
      include: {
        users: true,
      },
    });
    res.json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create channel" });
  }
};

export default createChannel;
