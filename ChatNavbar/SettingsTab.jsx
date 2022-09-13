import { Stack, Text, Title } from "@mantine/core";
import DarkModeToggle from "./DarkModeToggle";
import PrimaryColorPicker from "./PrimaryColorPicker";
import TabTitle from "./TabTitle";

const SettingsTab = () => {
  return (
    <>
      <TabTitle>Settings</TabTitle>
      <Stack spacing="lg" px="md">
        <div>
          <Text size="sm" color="dimmed" pb={6}>
            Theme
          </Text>
          <DarkModeToggle />
        </div>
        <div>
          <Text size="sm" color="dimmed" pb={6}>
            PrimaryColor
          </Text>
          <PrimaryColorPicker />
        </div>
      </Stack>
    </>
  );
};

export default SettingsTab;
