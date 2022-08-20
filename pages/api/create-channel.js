const createChannel = async (req, res) => {
  const { name, description, image, userId } = req.body;

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
};

export default createChannel;
