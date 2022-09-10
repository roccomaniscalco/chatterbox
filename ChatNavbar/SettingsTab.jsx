import { Divider, Group, Stack, Text, Title } from "@mantine/core";
import DarkModeToggle from "../components/DarkModeToggle";

const SettingsTab = () => {
  return (
    <>
      <Title order={4} p="md">
        Settings
      </Title>
      <Stack px="md" spacing="xs">
        <Text size="sm" color="dimmed">
          Theme
        </Text>
        <DarkModeToggle />
      </Stack>
    </>
  );
};

export default SettingsTab;
