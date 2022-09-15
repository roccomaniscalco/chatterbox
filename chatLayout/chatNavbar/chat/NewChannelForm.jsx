import { Button, Loader, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconPencil, IconPhoto, IconPlus, IconSignature } from "@tabler/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useDebouncedMutation from "../../../hooks/debouncedMutation";
import api from "../../../lib/api";

const NewChannelForm = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const channelExists = useDebouncedMutation(api.doesChannelExist);
  const createChannel = useMutation(api.createChannel, {
    onSuccess: () => {
      // invalidate channels query
      queryClient.invalidateQueries(["channels"]);
      // redirect to new channel
      router.push(`/chat/${channelForm.values.name}`);
      // reset form
      channelForm.reset();
      // show success notification
      showNotification({
        title: "Channel Created",
        message: `Start chatting in "${channelForm.values.name}"`,
        color: "teal",
      });
    },
  });

  const channelForm = useForm({
    initialValues: {
      name: "",
      description: "",
      image: "",
      userId: "",
    },
    validateInputOnChange: ["name"],
    validate: {
      name: (value) => {
        channelExists.debouncedMutate(value, {
          debounceMs: 500,
          onSuccess: (channelExists) => {
            if (channelExists)
              channelForm.setFieldError("name", "Channel name is taken");
            else channelForm.setFieldError("name", null);
          },
        });
      },
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (channelForm.values.name === "") {
      channelForm.setFieldError("name", "Channel name is required");
    } else if (channelExists.data === false) {
      createChannel.mutate({
        ...channelForm.values,
        userId: session.user.id,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <TextInput
          label="Name"
          description="Channel names are unique and cannot be changed."
          icon={<IconSignature />}
          rightSection={
            (channelExists.isDebouncing ||
              channelExists.isLoading) && <Loader size="xs" />
          }
          withAsterisk
          autoComplete="off"
          data-autofocus
          maxLength={191}
          {...channelForm.getInputProps("name")}
        />
        <TextInput
          label="Image Url"
          icon={<IconPhoto />}
          autoComplete="off"
          {...channelForm.getInputProps("image")}
        />
        <Textarea
          label="Description"
          icon={<IconPencil />}
          styles={{ icon: { height: 36 } }}
          autoComplete="off"
          maxLength={191}
          {...channelForm.getInputProps("description")}
        />
        <Button
          mt="xl"
          leftIcon={<IconPlus size={16} />}
          type="submit"
          loading={createChannel.isLoading}
        >
          Create Channel
        </Button>
      </Stack>
    </form>
  );
};

export default NewChannelForm;
