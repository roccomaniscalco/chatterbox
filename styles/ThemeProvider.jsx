import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { setCookie } from "cookies-next";
import { node } from "prop-types";
import { useState } from "react";
import colors from "./colors";

const ThemeProvider = ({ children, initialColorScheme }) => {
  const [colorScheme, setColorScheme] = useState(initialColorScheme);

  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookie("color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme,
          primaryColor: "indigo",
          colors: colors,
          black: "#010409",
          white: "#ffffff",
          shadows: {
            xl: "0px 5px 20px rgba(0, 0, 0, .6)",
          },
        }}
      >
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.white,
            },
          })}
        />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: node,
};

export default ThemeProvider;
