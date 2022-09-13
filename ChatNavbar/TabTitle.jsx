import { Title } from "@mantine/core";
import { node } from "prop-types";
import React from "react";

const TabTitle = ({ children }) => {
  return (
    <Title
      order={4}
      mt="xs"
      mx="md"
      mb="md"
      sx={{ height: 44, display: "flex", alignItems: "center" }}
    >
      {children}
    </Title>
  );
};

TabTitle.propTypes = {
  children: node.isRequired,
};

export default TabTitle;
