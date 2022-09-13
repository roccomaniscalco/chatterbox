import { Group, Title } from "@mantine/core";
import { node, string } from "prop-types";
import React from "react";

const TabHeader = ({ title, actionItem }) => {
  return (
    <Group
      mt="xs"
      mx="md"
      mb="sm"
      position="apart"
      sx={{ height: 44, display: "flex", alignItems: "center" }}
    >
      <Title order={4}>{title}</Title>
      {actionItem}
    </Group>
  );
};

TabHeader.propTypes = {
  title: string.isRequired,
  // action item should contain primary actions for the tab
  // ex. Messages tab containing a "create channel" icon button
  actionItem: node,
};

export default TabHeader;
