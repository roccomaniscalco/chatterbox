import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getChannel(req, res) {
  const { slug } = req.query;
  const channel = await prisma.channel.findUnique({
    where: {
      slug: slug,
    },
    include: {
      users: true,
    },
  });
  res.json(channel);
}
