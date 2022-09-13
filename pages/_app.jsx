import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { SessionProvider } from "next-auth/react";
import App from "next/app";
import Head from "next/head";
import ThemeProvider from "../styles/ThemeProvider";

const queryClient = new QueryClient();

const MyApp = ({
  Component,
  colorScheme,
  primaryColor,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>chatterbox</title>
      </Head>
      <ThemeProvider initialColorScheme={colorScheme} initialPrimaryColor={primaryColor}>
        <NotificationsProvider>
          <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
              {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
          </QueryClientProvider>
        </NotificationsProvider>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  return {
    ...appProps,
    colorScheme: getCookie("color-scheme", context.ctx) || "light",
    primaryColor: getCookie("primary-color", context.ctx) || "blue"
  };
};
export default MyApp;
