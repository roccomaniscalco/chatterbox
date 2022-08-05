import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import ThemeProvider from "../styles/ThemeProvider";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>chatterbox</title>
      </Head>
      <ThemeProvider>
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
