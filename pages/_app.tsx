import React from "react";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";

import "../styles/ant.css";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Auth0Provider
    domain="dev-26etjqcm.us.auth0.com"
    clientId="wpWqk205G7MPEyjlMGr0LC2NZH5WHaHt"
    redirectUri="http://localhost:3000"
  >
    <Component {...pageProps} />
  </Auth0Provider>
);

export default App;
