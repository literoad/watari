import { Head, Html, Main, NextScript } from "next/document";

// noinspection JSUnusedGlobalSymbols
export default function Document() {
  // noinspection HtmlRequiredTitleElement
  return (
    <Html lang="ru">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&family=Righteous&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" sizes="32x32" href="/images/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
