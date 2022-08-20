import {
  ActionIcon,
  Avatar,
  Button,
  Loader,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconPencil, IconPhoto, IconPlus, IconSignature } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useState } from "react";

const MAX_STR_LENGTH = 191;

const NewChannelModal = () => {
  const { data: session } = useSession();

  const [opened, setOpened] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlError, setImgUrlError] = useState("");
  const [isValidImg, setIsValidImg] = useState(false);

  const handleNameChange = (e) => {
    if (e.target.value.length > MAX_STR_LENGTH) {
      setNameError("Name exceeds max length");
    } else {
      setNameError("");
    }

    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length > MAX_STR_LENGTH) {
      setDescriptionError("Description exceeds max length");
    } else {
      setDescriptionError("");
    }

    setDescription(e.target.value);
  };

  const handleImgChange = (e) => {
    const validateImgUrl = async (url) => {
      const imgExists = async (url) => {
        try {
          const res = await fetch(url);
          const buff = await res.blob();
          return buff.type.startsWith("image/");
        } catch (err) {
          setIsValidImg(false);
          setImgUrlError("Could not fetch url");
        }
      };

      const isImg = await imgExists(url);
      if (!isImg && url.length > 0) {
        setImgUrlError("Url is not an image");
        setIsValidImg(false);
      } else if (isImg) {
        setImgUrlError("");
        setIsValidImg(true);
      } else {
        setImgUrlError("");
        setIsValidImg(false);
      }
    };

    setImgUrl(e.target.value);
    validateImgUrl(e.target.value);
  };

  const handleSubmit = () => {
    fetch("/api/create-channel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        imgUrl,
        userId: session.user.id,
      }),
    });
  };

  const handleOpen = () => {
    setOpened(true);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="New Chatterbox"
      >
        <Stack spacing="sm">
          <TextInput
            label="Name"
            value={name}
            error={nameError}
            onChange={handleNameChange}
            icon={<IconSignature />}
            required
            autoComplete="off"
            data-autofocus
          />
          <TextInput
            label="Image Url"
            value={imgUrl}
            error={imgUrlError}
            onChange={handleImgChange}
            icon={
              isValidImg ? (
                <Avatar size="sm" src={imgUrl}>
                  <Loader />
                </Avatar>
              ) : (
                <IconPhoto />
              )
            }
            autoComplete="off"
            type="url"
          />
          <Textarea
            label="Description"
            value={description}
            error={descriptionError}
            onChange={handleDescriptionChange}
            icon={<IconPencil />}
            styles={{ icon: { height: 36 } }}
            autoComplete="off"
          />
          <Button
            mt="sm"
            leftIcon={<IconPlus size={16} />}
            onClick={handleSubmit}
          >
            Create Chatterbox
          </Button>
        </Stack>
      </Modal>
      <ActionIcon
        size="lg"
        variant="filled"
        color="primary"
        onClick={handleOpen}
      >
        <IconPlus size={24} />
      </ActionIcon>
    </>
  );
};

export default NewChannelModal;
