import {
  CopyButton,
  Group,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons";

const InviteLinkCopyButton = () => {
  return (
    <CopyButton value="https://chatterbox.lol" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          openDelay={0}
          closeDelay={500}
          label={copied ? "Copied" : "Copy"}
          withArrow
          position="right"
        >
          <UnstyledButton
            p="sm"
            radius="sm"
            onClick={copy}
            sx={(theme) => ({
              borderRadius: theme.radius.sm,
              border: `1px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[1]
              }`,
            })}
          >
            <Group noWrap position="apart" spacing="xs">  
              <div>
                <Text size="xs" color="dimmed">
                  Share profile link
                </Text>
                <Text lineClamp={1} size="sm">
                  https://chatterbox.lol
                </Text>
              </div>
              {copied ? <IconCheck /> : <IconCopy />}
            </Group>
          </UnstyledButton>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default InviteLinkCopyButton;
