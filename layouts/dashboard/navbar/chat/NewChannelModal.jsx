import {
  Button,
  Checkbox,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  IconLink,
  IconMessagePlus,
  IconPencil,
  IconPhoto,
  IconPlus,
  IconSignature,
} from "@tabler/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import AppModal from "../../../../components/AppModal";
import api from "../../../../lib/api";

const NewChannelModal = () => {
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
        title: "New Chatterbox Created",
        message: `Start chatting in "${channelForm.values.name}"`,
        color: "green",
      });
    },
  });

  const channelForm = useForm({
    initialValues: {
      slug: "",
      name: "",
      description: "",
      image: "",
      isPrivate: false,
    },
    validateInputOnChange: ["name", "slug"],
    validate: {
      slug: (value) => {
        // ensure slug is not empty
        if (!value) return "Slug is required";
        // only allow lowercase letters, numbers, and dashes
        if (!/^[a-z0-9-]*$/.test(value))
          return "Only lowercase letters, numbers, and dashes are allowed";
      },
      name: (value) => {
        if (!value) return "Name is required";
      },
    },
  });

  const handleSubmit = (formValues) => {
    // check if channel with slug already exists
    channelExists.mutate(formValues.slug, {
      onSuccess: (channelExists) => {
        // disallow slugs that are already taken
        if (channelExists) channelForm.setFieldError("slug", "Slug is taken");
        // create channel if slug is available
        else createChannel.mutate(formValues);
      },
    });
  };

  return (
    <AppModal Icon={IconMessagePlus} title="New Chatterbox">
      <form onSubmit={channelForm.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <TextInput
            label="Slug"
            description="Chatterbox slugs are unique and cannot be changed."
            icon={
              <>
                <IconLink />
                <Text size="sm">chatterbox.lol/chat/</Text>
              </>
            }
            iconWidth={165}
            styles={{
              icon: { justifyContent: "start", paddingLeft: 8, gap: 8 },
            }}
            withAsterisk
            autoComplete="off"
            data-autofocus
            maxLength={191}
            {...channelForm.getInputProps("slug")}
          />
          <TextInput
            label="Name"
            icon={<IconSignature />}
            withAsterisk
            autoComplete="off"
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
          <Checkbox
            mt="xs"
            label="This chatterbox is invite-only."
            {...channelForm.getInputProps("isPrivate")}
          />
          <Button
            mt="xs"
            leftIcon={<IconPlus size={16} />}
            type="submit"
            loading={createChannel.isLoading || channelExists.isLoading}
          >
            Create Chatterbox
          </Button>
        </Stack>
      </form>
    </AppModal>
  );
};

export default NewChannelModal;
