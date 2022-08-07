import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { node } from "prop-types";
import colors from "./colors";

const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          black: "#010409",
          white: "#ffffff",
          shadows: {
            xl: "0px 5px 20px rgba(0, 0, 0, .6)",
          },
          colorScheme,
          colors: {
            ...colors,
          },
          primaryShade: {
            light: 4,
            dark: 4,
          }
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
