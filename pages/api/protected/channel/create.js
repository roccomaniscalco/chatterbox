import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

const prisma = new PrismaClient();

const createChannel = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    // set each undefined value in body to null
    const { slug, name, description, image } = Object.fromEntries(
      Object.entries(req.body).map(([key, value]) => [key, value || null])
    );

    const channel = await prisma.channel.create({
      data: {
        slug,
        name,
        description,
        image,
        users: {
          connect: [{ id: session.user.id }],
        },
        admin: {
          connect: { id: session.user.id },
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
