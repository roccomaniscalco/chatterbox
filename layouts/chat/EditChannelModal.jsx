import {
  Button,
  Checkbox,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconEdit,
  IconLink,
  IconPencil,
  IconPhoto,
  IconSignature,
} from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { string } from "prop-types";
import AppModal from "../../components/AppModal";
import api from "../../lib/api";

const EditChannelModal = ({ channelSlug }) => {
  const { isLoading: isLoadingChannel } = useQuery(
    ["channel", channelSlug],
    () => api.getChannel(channelSlug),
    {
      onSuccess: (channel) => {
        channelForm.setValues({
          slug: channel.slug,
          name: channel.name,
          description: channel.description ?? "",
          image: channel.image ?? "",
          isPrivate: channel.isPrivate,
        });
      },
    }
  );

  const channelForm = useForm({
    initialValues: {
      slug: "",
      name: "",
      description: "",
      image: "",
      isPrivate: false,
    },
    validate: {
      name: (value) => {
        if (!value) return "Name is required";
      },
    },
  });

  return (
    <AppModal Icon={IconEdit} title="Edit Chatterbox">
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
          maxLength={191}
          disabled
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
          disabled={isLoadingChannel}
          {...channelForm.getInputProps("isPrivate", { type: "checkbox" })}
        />
        <Button
          mt="xs"
          leftIcon={<IconPencil size={16} />}
          type="submit"
          loading={isLoadingChannel}
        >
          Update Chatterbox
        </Button>
      </Stack>
    </AppModal>
  );
};

EditChannelModal.propTypes = {
  channelSlug: string.isRequired,
};

export default EditChannelModal;
