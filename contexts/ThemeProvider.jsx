import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { node } from "prop-types";

const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "dark",
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
        theme={{ colorScheme }}
      >
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.colors.gray[0],
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
