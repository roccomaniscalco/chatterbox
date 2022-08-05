import {
  ActionIcon,
  Anchor,
  AppShell,
  Avatar,
  Center,
  Group,
  Indicator,
  Navbar,
  Popover,
  Text,
  UnstyledButton
} from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { unstable_getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { signOut, useSession } from "next-auth/react";
import DarkModeToggle from "../components/DarkModeToggle";

const UserProfileAvatar = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Popover
      position="right-start"
      offset={10}
      withArrow
      arrowOffset={20}
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
        <ActionIcon size={64} radius="xl">
          <Indicator
            offset={8}
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
            <Avatar src={session.user.image} size="lg" radius="xl" />
          </Indicator>
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Text weight="bold">{session.user.name}</Text>
        <Text size="sm" color="dimmed">
          {session.user.email}
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

const AppNavbar = () => {
  return (
    <Navbar
      p="md"
      width={{ base: 80 }}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        borderColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
      })}
    >
      <Center>
        <UserProfileAvatar />
      </Center>

      <Navbar.Section grow></Navbar.Section>

      <DarkModeToggle />
      <Anchor size="xs" color="dimmed" align="center" href="">
        v0.0.1
      </Anchor>
    </Navbar>
  );
};

const Chat = () => {
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AppNavbar />}
    ></AppShell>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
  });

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return { props: { session } };
}

export default Chat;
