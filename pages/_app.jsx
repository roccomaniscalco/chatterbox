import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import ThemeProvider from "../styles/ThemeProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>chatterbox</title>
      </Head>
      <ThemeProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
