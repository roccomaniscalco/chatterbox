import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { node } from "prop-types"

const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "light",
  })

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark")

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme }}
        styles={{
          Card: (theme) => ({
            root: {
              backgroundColor:
                theme.colorScheme === "light"
                  ? theme.white
                  : theme.colors.dark[7],
              boxShadow: theme.shadows.lg,
            },
          }),
          Title: (theme) => ({
            root: {
              color: theme.colorScheme === "light" ? theme.black : theme.white,
            },
          }),
        }}
      >
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white,
            },
          })}
        />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

ThemeProvider.propTypes = {
  children: node,
}

export default ThemeProvider
