import { Button, Loader, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconPencil, IconPhoto, IconPlus, IconSignature } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useDebouncedMutation from "../../../hooks/debouncedMutation";
import api from "../../../lib/api";

const NewChannelForm = () => {
  const { data: session } = useSession();

  const channelExistsMutation = useDebouncedMutation(api.doesChannelExist);
  const createChannelMutation = useMutation(api.createChannel, {
    onSuccess: () => {
      channelForm.reset();
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
        channelExistsMutation.debouncedMutate(value, {
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
    } else if (channelExistsMutation.data === false) {
      createChannelMutation.mutate({
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
            (channelExistsMutation.isDebouncing ||
              channelExistsMutation.isLoading) && <Loader size="xs" />
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
          loading={createChannelMutation.isLoading}
        >
          Create Channel
        </Button>
      </Stack>
    </form>
  );
};

export default NewChannelForm;
