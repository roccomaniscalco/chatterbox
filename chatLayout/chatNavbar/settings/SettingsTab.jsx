import { Stack, Text } from "@mantine/core";
import DarkModeToggle from "./DarkModeToggle";
import PrimaryColorPicker from "./PrimaryColorPicker";
import TabHeader from "../TabHeader";

const SettingsTab = () => {
  return (
    <>
      <TabHeader title="Settings" />
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
