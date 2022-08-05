import {
  createStyles,
  Group,
  Switch,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    "& *": {
      cursor: "pointer",
    },
  },
  input: {
    border: "none",
  },
  icon: {
    pointerEvents: "none",
    position: "absolute",
    zIndex: 1,
    top: 3,
  },
  iconLight: {
    left: 4,
    color: theme.white,
  },
  iconDark: {
    right: 4,
    color: theme.colors.gray[6],
  },
}));

export default function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles();

  return (
    <Group position="center" my="md">
      <div className={classes.root}>
        <IconSun
          className={cx(classes.icon, classes.iconLight)}
          size={18}
          stroke={1.5}
        />
        <IconMoonStars
          className={cx(classes.icon, classes.iconDark)}
          size={18}
          stroke={1.5}
        />
        <Switch
          color="indigo"
          classNames={{input: classes.input}}
          checked={colorScheme === "light"}
          onChange={() => toggleColorScheme()}
          size="md"
        />
      </div>
    </Group>
  );
}
