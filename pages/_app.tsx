import React from "react";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import Router from "next/router";

import "../styles/ant.css";
import "../styles/globals.css";

const onRedirectCallback = (appState) => {
  // Use Next.js's Router.replace method to replace the url
  Router.replace(appState?.returnTo || "/");
};

const App = ({ Component, pageProps }: AppProps) => (
  <Auth0Provider
    domain="dev-26etjqcm.us.auth0.com"
    clientId="wpWqk205G7MPEyjlMGr0LC2NZH5WHaHt"
    redirectUri={typeof window !== "undefined" && window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience="https://x-choice-server.com"
  >
    <Component {...pageProps} />
  </Auth0Provider>
);

export default App;
