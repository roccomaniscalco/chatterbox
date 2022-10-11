import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { setCookie } from "cookies-next";
import { node } from "prop-types";
import { useCallback, useState } from "react";
import colors from "./colors";

const ThemeProvider = ({
  children,
  initialColorScheme,
  initialPrimaryColor,
}) => {
  const [colorScheme, setColorScheme] = useState(initialColorScheme);
  const [themePrimaryColor, setThemePrimaryColor] =
    useState(initialPrimaryColor);

  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  const setPrimaryColor = useCallback((color) => {
    setThemePrimaryColor(color);
    setCookie("primary-color", color, {
      maxAge: 60 * 60 * 24 * 30,
    });
  }, []);

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
          primaryColor: themePrimaryColor,
          colors: colors,
          black: "#010409",
          white: "#ffffff",
          shadows: {
            xl: "0px 5px 20px rgba(0, 0, 0, .6)",
          },
          other: {
            setPrimaryColor,
          },
          components: {
            Skeleton: {
              styles: (theme) => ({
                root: {
                  "&::before": {
                    background: `${
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[7]
                        : theme.colors.gray[2]
                    } !important`,
                  },
                  "&::after": {
                    background: `${
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[3]
                    } !important`,
                  },
                },
              }),
            },
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
