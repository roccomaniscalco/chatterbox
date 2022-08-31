import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { SessionProvider } from "next-auth/react";
import App from "next/app";
import Head from "next/head";
import ThemeProvider from "../styles/ThemeProvider";

const MyApp = ({
  Component,
  colorScheme,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout = Component.getLayout || ((page) => page);
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>chatterbox</title>
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider initialColorScheme={colorScheme}>
            <NotificationsProvider>
              {getLayout(<Component {...pageProps} />)}
            </NotificationsProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  return {
    ...appProps,
    colorScheme: getCookie("color-scheme", context.ctx) || "light",
  };
};
export default MyApp;
