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
          label={copied ? "Copied" : "Copy"}
          withArrow
          position="right"
          sx={{ isolation: "isolate" }}
        >
          <UnstyledButton
            p="sm"
            radius="sm"
            onClick={copy}
            sx={(theme) => ({
              borderRadius: theme.radius.sm,
              border: `1px solid ${theme.colors.dark[6]}`,
              "&:hover": {
                backgroundColor: theme.colors.dark[8],
              },
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
