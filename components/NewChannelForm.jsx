import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconPencil, IconPhoto, IconPlus, IconSignature } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import api from "../lib/api";

const INITIAL_CHANNEL = {
  name: "",
  description: "",
  image: "",
  userId: "",
};

const NewChannelModal = () => {
  const { data: session } = useSession();
  const [channel, setChannel] = useState(INITIAL_CHANNEL);
  const [clientChannelError, setClientChannelError] = useState(INITIAL_CHANNEL);

  const getChannelMutation = useMutation(api.getChannel, {
    onSuccess: () => {
      setClientChannelError((prevError) => ({
        ...prevError,
        name: "Name already exists",
      }));
    },
  });
  const createChannelMutation = useMutation(api.createChannel, {
    onSuccess: () => {
      setChannel(INITIAL_CHANNEL);
      setClientChannelError(INITIAL_CHANNEL);
      showNotification({
        title: "Channel Created",
        message: `Start chatting in ${channel.name}`,
        color: "teal",
      });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // validate that channel name is unique
      await getChannelMutation.mutateAsync(channel.name);
    } catch (error) {
      // if caught, channel.name is unique
      await createChannelMutation.mutateAsync({
        ...channel,
        userId: session?.user.id,
      });
    }
  };

  const handleChange = (event) => {
    setChannel({ ...channel, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="sm">  
        <TextInput
          name="name"
          label="Name"
          description="Channel names are unique and cannot be changed."
          icon={<IconSignature />}
          withAsterisk
          autoComplete="off"
          data-autofocus
          value={channel.name}
          error={clientChannelError.name}
          onChange={handleChange}
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
          error={clientChannelError.description}
          onChange={handleChange}
        />
        <Button
          mt="sm"
          leftIcon={<IconPlus size={16} />}
          type="submit"
          disabled={!session}
          loading={
            getChannelMutation.isLoading || createChannelMutation.isLoading
          }
        >
          Create Channel
        </Button>
      </Stack>
    </form>
  );
};

export default NewChannelModal;
