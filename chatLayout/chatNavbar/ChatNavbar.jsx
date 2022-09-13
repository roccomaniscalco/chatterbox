import {
  Box,
  createStyles,
  Navbar,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconMessage, IconSettings, IconUsers } from "@tabler/icons";
import { number } from "prop-types";
import { useState } from "react";
import UserProfile from "./UserProfile";
import FriendsTab from "./friends/FriendsTab";
import ChatTab from "./chat/ChatTab";
import SettingsTab from "./settings/SettingsTab";


const useStyles = createStyles((theme, { headerHeight, navbarAsideWidth }) => ({
  root: {
    height: "100vh",
    border: "none",
    position: "absolute",
    top: 0,
  },

  wrapper: {
    display: "flex",
  },

  aside: {
    display: "flex",
    flex: `0 0 ${navbarAsideWidth}px`,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],

    borderInline: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
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
    height: headerHeight,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
}));

const mainLinksData = [
  { Icon: IconMessage, label: "Chat", Component: ChatTab },
  { Icon: IconUsers, label: "Friends", Component: FriendsTab },
  { Icon: IconSettings, label: "Settings", Component: SettingsTab },
];

const ChatNavbar = ({ navbarWidth, navbarAsideWidth, headerHeight }) => {
  const { classes, cx } = useStyles({ headerHeight, navbarAsideWidth });
  const [active, setActive] = useState(mainLinksData[0]);

  const mainLinks = mainLinksData.map((link) => (
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
        <link.Icon  />
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <Navbar width={{ base: navbarWidth }} className={classes.root}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.header}></div>
          <Box pb="md" mt="xs">
            <UserProfile />
          </Box>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <div className={classes.header}></div>
          <active.Component />
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

ChatNavbar.propTypes = {
  navbarWidth: number.isRequired,
  headerHeight: number.isRequired,
};

export default ChatNavbar;
