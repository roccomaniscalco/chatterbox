import { ActionIcon, Modal, Text, Tooltip } from "@mantine/core";
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
        centered
        padding="xl"
        title={
          <Text color="dimmed" size="xs" transform="uppercase" weight="bold">
            {title}
          </Text>
        }
      >
        {children}
      </Modal>

      <Tooltip
        openDelay={500}
        label={title}
        position="top"
        withArrow
        withinPortal
      >
        <ActionIcon
          size="md"
          onClick={handleOpen}
          aria-label={title}
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
            "&:hover": {
              backgroundColor: "transparent",
            },
          })}
        >
          <Icon />
        </ActionIcon>
      </Tooltip>
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
