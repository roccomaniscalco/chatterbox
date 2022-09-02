import {
  Avatar,
  Button,
  Loader,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconPencil, IconPhoto, IconPlus, IconSignature } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
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
  const [channelError, setChannelError] = useState(INITIAL_CHANNEL);
  const [isValidImage, setIsValidImage] = useState(false);
  const previewImage = useMemo(() => new Image(), []);

  // validate image
  useEffect(() => {
    previewImage.src = channel.image;

    previewImage.onload = () => {
      setIsValidImage(true);
      setChannelError((prevError) => ({ ...prevError, image: "" }));
    };

    previewImage.onerror = () => {
      setIsValidImage(false);
      if (channel.image === "") {
        setChannelError((prevError) => ({ ...prevError, image: "" }));
        return;
      }
      setChannelError((prevError) => ({
        ...prevError,
        image: "Failed to load image",
      }));
    };
  }, [channel.image, previewImage]);

  const channelExistsMutation = useMutation(api.doesChannelExist, {
    onSuccess: (doesExist) => {
      if (doesExist) {
        setChannelError((prevError) => ({
          ...prevError,
          name: "Name already exists",
        }));
      }
    },
  });
  const createChannelMutation = useMutation(api.createChannel, {
    onSuccess: () => {
      setChannel(INITIAL_CHANNEL);
      setChannelError(INITIAL_CHANNEL);
      showNotification({
        title: "Channel Created",
        message: `Start chatting in ${channel.name}`,
        color: "teal",
      });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ensure channel name exists
    if (!channel.name) {
      setChannelError((prevError) => ({
        ...prevError,
        name: "Name is required",
      }));
      return;
    }

    try {
      // ensure channel name is unique
      const doesExist = await channelExistsMutation.mutateAsync(channel.name);
      if (!doesExist) {
        await createChannelMutation.mutateAsync({
          ...channel,
          userId: session?.user.id,
        });
      }
    } catch (error) {
      // dangerously log error to console
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setChannel({ ...channel, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <TextInput
          name="name"
          label="Name"
          description="Channel names are unique and cannot be changed."
          icon={<IconSignature />}
          withAsterisk
          autoComplete="off"
          data-autofocus
          value={channel.name}
          error={channelError.name}
          onChange={handleChange}
          maxLength={191}
        />
        <TextInput
          name="image"
          label="Image Url"
          icon={
            isValidImage ? (
              <Avatar src={channel.image} size="sm">
                <Loader />
              </Avatar>
            ) : (
              <IconPhoto />
            )
          }
          autoComplete="off"
          value={channel.image}
          error={channelError.image}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          label="Description"
          icon={<IconPencil />}
          styles={{ icon: { height: 36 } }}
          autoComplete="off"
          value={channel.description}
          error={channelError.description}
          onChange={handleChange}
          maxLength={191}
        />
        <Button
          mt="md"
          leftIcon={<IconPlus size={16} />}
          type="submit"
          disabled={!session}
          loading={
            channelExistsMutation.isLoading || createChannelMutation.isLoading
          }
        >
          Create Channel
        </Button>
      </Stack>
    </form>
  );
};

export default NewChannelModal;
