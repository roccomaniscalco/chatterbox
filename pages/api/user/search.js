import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function userSearch(req, res) {
  const { searchTerm } = req.query;
  console.log("searchTerm", searchTerm);

  const users = await prisma.user.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
    },
    where: {
      OR: [
        { email: { contains: searchTerm } },
        { name: { contains: searchTerm } },
      ],
    },
    orderBy: {
      id: "asc",
    },
  });

  console.log(users);
  res.json(users);
}
