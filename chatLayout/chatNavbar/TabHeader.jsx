import { Box, Group, Title } from "@mantine/core";
import { node, string } from "prop-types";
import React from "react";

const TabHeader = ({ title, actionItem }) => {
  return (
    <Box
      pt="xs"
      px="md"
      pb="xs"
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: 99,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
      })}
    > 
      <Group
        position="apart"
        sx={{
          height: 44,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title order={4}>{title}</Title>
        {actionItem}
      </Group>
    </Box>
  );
};

TabHeader.propTypes = {
  title: string.isRequired,
  // action item should contain primary actions for the tab
  // ex. Messages tab containing a "create channel" icon button
  actionItem: node,
};

export default TabHeader;
