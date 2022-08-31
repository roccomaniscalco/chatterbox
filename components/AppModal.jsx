import { ActionIcon, Modal, Text } from "@mantine/core";
import { bool, elementType, node, string } from "prop-types";
import { useState } from "react";

const AppModal = ({ children, Icon, title, openInitially }) => {
  const [isOpened, setIsOpened] = useState(Boolean(openInitially));

  const handleClose = () => {
    setIsOpened(false);
  };
  const handleOpen = () => {
    setIsOpened(true);
  };

  return (
    <>
      <Modal
        opened={isOpened}
        onClose={handleClose}
        title={
          <Text color="dimmed" size="xs" transform="uppercase" weight="bold">
            {title}
          </Text>
        }
      >
        {children}
      </Modal>

      <ActionIcon
        variant="default"
        size="lg"
        radius="md"
        onClick={handleOpen}
        aria-label={title}
      >
        <Icon />
      </ActionIcon>
    </>
  );
};

AppModal.propTypes = {
  children: node.isRequired,
  Icon: elementType.isRequired,
  title: string.isRequired,
  openInitially: bool,
};

export default AppModal;
