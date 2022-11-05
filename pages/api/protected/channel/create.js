import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

const prisma = new PrismaClient();

const createChannel = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    // set values in body with empty string to null
    const { slug, name, description, image, isPrivate } = Object.fromEntries(
      Object.entries(req.body).map(([key, value]) => [key, value === "" ? null : value])
    );

    const channel = await prisma.channel.create({
      data: {
        slug,
        name,
        description,
        image,
        isPrivate,
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
