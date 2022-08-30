import {
  ActionIcon,
  Button,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconPencil, IconPhoto, IconPlus, IconSignature } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import api from "../lib/api";

const validateChannel = async ({ name, description }) => {
  const error = {
    name: "",
    description: "",
  };

  if (!name) error.name = "Name is required";
  else if (name.length > 191)
    error.name = "Name must be less than 191 characters";
  else {
    try {
      const channel = await api.getChannel(name);
      if (channel) error.name = "Name already exists";
    } catch (e) {
      /* do nothing */
    }
  }

  if (description.length > 191)
    error.description = "Description must be less than 191 characters";
  return error;
};

const NewChannelModal = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channel, setChannel] = useState({
    name: "",
    description: "",
    image: "",
    userId: "",
  });
  const [clientChannelError, setClientChannelError] = useState({
    name: "",
    description: "",
  });
  const mutation = useMutation(api.createChannel, {
    onSuccess: () => {
      setClientChannelError({
        name: "",
        description: "",
      });
      setChannel({
        name: "",
        description: "",
        image: "",
        userId: "",
      });
    }
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setChannel({ ...channel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = await validateChannel(channel);
    if (Object.values(err).some((e) => e !== "")) {
      setClientChannelError(err);
    } else {
      mutation.mutate({ ...channel, userId: session?.user.id });
    }
  };

  useEffect(() => {
    console.log(clientChannelError);
  }, [clientChannelError]);

  return (
    <>
      <ActionIcon
        size="lg"
        variant="filled"
        color="primary"
        onClick={handleOpenModal}
      >
        <IconPlus size={24} />
      </ActionIcon>

      <Modal
        opened={isModalOpen}
        onClose={handleCloseModal}
        title="New Channel"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing="xs">
            <TextInput
              name="name"
              label="Name"
              icon={<IconSignature />}
              withAsterisk
              autoComplete="off"
              data-autofocus
              value={channel.name}
              onChange={handleChange}
              error={clientChannelError.name}
            />
            <TextInput
              name="image"
              label="Image Url"
              icon={<IconPhoto />}
              autoComplete="off"
              value={channel.image}
              onChange={handleChange}
            />
            <Textarea
              name="description"
              label="Description"
              icon={<IconPencil />}
              styles={{ icon: { height: 36 } }}
              autoComplete="off"
              value={channel.description}
              onChange={handleChange}
              error={clientChannelError.description}
            />
            <Button
              mt="xl"
              leftIcon={<IconPlus size={16} />}
              type="submit"
              disabled={!session}
            >
              Create Channel
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default NewChannelModal;
