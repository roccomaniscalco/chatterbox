import { Button, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  IconLink,
  IconPencil,
  IconPhoto,
  IconPlus,
  IconSignature,
} from "@tabler/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import api from "../../../lib/api";

const NewChannelForm = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const channelExists = useMutation(api.doesChannelExist);
  const createChannel = useMutation(api.createChannel, {
    onSuccess: () => {
      // invalidate channels query
      queryClient.invalidateQueries(["channels"]);
      // redirect to new channel
      router.push(channelForm.values.slug);
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
      slug: "",
      description: "",
      image: "",
      userId: "",
    },
    validateInputOnChange: ["name", "slug"],
    validate: {
      name: (value) => {
        if (!value) return "Channel name is required";
      },
      slug: (value) => {
        // ensure slug is not empty
        if (!value) return "Channel slug is required";
        // only allow lowercase letters, numbers, and dashes
        if (!/^[a-z0-9-]*$/.test(value))
          return "Only lowercase letters, numbers, and dashes are allowed";
      },
    },
  });

  const handleSubmit = (formValues) => {
    // check if channel with slug already exists
    channelExists.mutate(formValues.slug, {
      onSuccess: (channelExists) => {
        // disallow slugs that are already taken
        if (channelExists)
          channelForm.setFieldError("slug", "Channel slug is taken");
        // create channel if slug is available
        else {
          createChannel.mutate({
            ...formValues,
            userId: session.user.id,
          });
        }
      },
    });
  };

  return (
    <form onSubmit={channelForm.onSubmit(handleSubmit)}>
      <Stack spacing="md">
        <TextInput
          label="Name"
          icon={<IconSignature />}
          withAsterisk
          autoComplete="off"
          maxLength={191}
          {...channelForm.getInputProps("name")}
        />
        <TextInput
          label="Slug"
          description="Channel slugs are unique and cannot be changed."
          icon={
            <>
              <IconLink />
              <Text size="sm">chatterbox.lol/</Text>
            </>
          }
          iconWidth={133}
          styles={{ icon: { justifyContent: "start", paddingLeft: 8, gap: 8 } }}
          withAsterisk
          autoComplete="off"
          data-autofocus
          maxLength={191}
          {...channelForm.getInputProps("slug")}
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
          loading={createChannel.isLoading || channelExists.isLoading}
        >
          Create Channel
        </Button>
      </Stack>
    </form>
  );
};

export default NewChannelForm;
