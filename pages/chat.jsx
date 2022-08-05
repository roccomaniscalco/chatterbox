import {
  ActionIcon,
  AppShell,
  Avatar,
  Center,
  Group,
  Navbar,
  Popover,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { unstable_getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextAuth]";

const UserProfileAvatar = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Popover position="right-start" offset={12}>
      <Popover.Target>
        <Avatar
          src={session.user.image}
          size="lg"
          radius="xl"
          component={ActionIcon}
        />
      </Popover.Target>
      <Popover.Dropdown sx={{ width: "min-content" }}>
        <Text weight="bold">{session.user.name}</Text>
        <Text size="sm" color="dimmed">
          {session.user.email}
        </Text>

        <UnstyledButton
          onClick={handleSignOut}
          pt="lg"
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
      sx={(theme) => ({
        width: 96,
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[1],
      })}
    >
      <Center>
        <UserProfileAvatar />
      </Center>
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
  const session = await unstable_getServerSession(req, res, authOptions);

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
