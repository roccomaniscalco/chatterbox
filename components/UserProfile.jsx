import {
  ActionIcon,
  Avatar,
  Group,
  Indicator,
  Popover,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Popover
      position="right-start"
      offset={10}
      withArrow
      arrowOffset={14}
      arrowSize={16}
      styles={(theme) => ({
        dropdown: {
          width: "min-content",
          boxShadow: theme.shadows.xl,
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
        arrow: {
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Popover.Target>
        <ActionIcon size="xl" radius="xl">
          <Indicator
            offset={4}
            size={16}
            color="green"
            styles={(theme) => ({
              indicator: {
                borderWidth: 3,
                borderStyle: "solid",
                borderColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[1],
              },
            })}
          >
            <Avatar src={session?.user.image} size="md" radius="xl" />
          </Indicator>
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Text weight="bold">{session?.user.name}</Text>
        <Text size="sm" color="dimmed">
          {session?.user.email}
        </Text>

        <UnstyledButton
          onClick={handleSignOut}
          mt="lg"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.indigo[3]
                : theme.colors.indigo[6],
            "&:hover": {
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.indigo[4]
                  : theme.colors.indigo[7],
            },
          })}
        >
          <Group spacing="xs">
            <IconLogout size={16} />
            <Text size="sm">Sign Out</Text>
          </Group>
        </UnstyledButton>
      </Popover.Dropdown>
    </Popover>
  );
};

export default UserProfile;
