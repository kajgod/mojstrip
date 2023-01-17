import "../styles/globals.scss";
import type { AppProps } from "next/app";

const env = process.env.NODE_ENV;

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} env={env} />;
}
