import {
  CheckIcon,
  ColorSwatch,
  Paper,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";

const PrimaryColorPicker = () => {
  const theme = useMantineTheme();

  return (
    <Paper
      p="sm"
      sx={{
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[2],
      }}
    >
      <Text size="sm" pb="xs" transform="capitalize">
        {theme.primaryColor}
      </Text>
      <SimpleGrid cols={5}>
        {Object.keys(theme.colors).map((color) => (
          <ColorSwatch
            key={color}
            component="button"
            color={theme.colors[color][theme.fn.primaryShade()]}
            onClick={() => {
              theme.other.setPrimaryColor(color);
            }}
            sx={{
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {color === theme.primaryColor && <CheckIcon width={10} />}
          </ColorSwatch>
        ))}
      </SimpleGrid>
    </Paper>
  );
};

export default PrimaryColorPicker;
