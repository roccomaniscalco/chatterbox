import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>chatterbox</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
