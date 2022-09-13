import {
  Box,
  Center,
  createStyles,
  Navbar,
  ScrollArea,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconMessage, IconSettings, IconUsers } from "@tabler/icons";
import { number } from "prop-types";
import { memo, useState } from "react";
import IconChatterbox from "../../components/IconChatterbox";
import ChatTab from "./chat/ChatTab";
import FriendsTab from "./friends/FriendsTab";
import SettingsTab from "./settings/SettingsTab";
import UserProfile from "./UserProfile";

const useStyles = createStyles(
  (theme, { headerHeight, navbarWidth, navbarAsideWidth }) => ({
    root: {
      width: navbarWidth,
      height: "100vh",
      border: "none",
      top: 0,
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gridTemplateRows: `${headerHeight}px 1fr`,
      gridTemplateAreas: `
        "aside head head head head"
        "aside main main main main"
        `,
    },

    aside: {
      gridArea: "aside",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[1],
    },

    main: {
      gridArea: "main",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],

      borderInline: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2]
      }`,
    },

    mainContent: {
      width: navbarWidth - navbarAsideWidth - 2, // 1px border on each side
    },

    iconLink: {
      width: 44,
      height: 44,
      borderRadius: theme.radius.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[3],
      },
    },

    iconLinkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
        color: theme.white,
      },
    },

    header: {
      gridArea: "head",
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2]
      }`,
      borderTop: "none",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },

    iconChatterbox: {
      stroke:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[6],
    },
  })
);

const asideData = [
  { Icon: IconMessage, label: "Chat", Component: ChatTab },
  { Icon: IconUsers, label: "Friends", Component: FriendsTab },
  { Icon: IconSettings, label: "Settings", Component: SettingsTab },
];

const ChatNavbar = memo(function ChatNavbar({
  navbarWidth,
  navbarAsideWidth,
  headerHeight,
}) {
  const { classes, cx } = useStyles({
    headerHeight,
    navbarWidth,
    navbarAsideWidth,
  });
  const [active, setActive] = useState(asideData[0]);

  const asideIcons = asideData.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionDuration={0}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link)}
        className={cx(classes.iconLink, {
          [classes.iconLinkActive]: link.label === active.label,
        })}
      >
        <link.Icon />
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <Navbar width={{ base: navbarWidth }} className={classes.root}>
      <Navbar.Section className={classes.aside}>
        <Center sx={{ height: headerHeight }}>
          <IconChatterbox
            size={40}
            stroke={3.5}
            className={classes.iconChatterbox}
          />
        </Center>
        <Box pb="xl" mt="xs">
          <UserProfile />
        </Box>
        {asideIcons}
      </Navbar.Section>

      <Navbar.Section className={classes.header}></Navbar.Section>

      <Navbar.Section component={ScrollArea} className={classes.main}>
        <div className={classes.mainContent}>
          <active.Component />
        </div>
      </Navbar.Section>
    </Navbar>
  );
});

ChatNavbar.propTypes = {
  navbarWidth: number.isRequired,
  headerHeight: number.isRequired,
};

export default ChatNavbar;
