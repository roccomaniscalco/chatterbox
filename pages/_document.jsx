import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#010409" />
          <meta name="msapplication-TileColor" content="#603cba" />
          <meta name="theme-color" content="#010409" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="chatterbox | Chat your box away" />
          <meta
            property="og:description"
            content="Begin chatting with friends directly from your browser"
          />
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="image" property="og:image" content="https://chatterbox.lol/chatterbox-link-preview.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
