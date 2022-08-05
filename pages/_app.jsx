import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import ThemeProvider from "../contexts/ThemeProvider";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>chatterbox</title>
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default App;
