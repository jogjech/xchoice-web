import React from "react";
import NextHead from "next/head";
import GoogleFonts from "next-google-fonts";
import { FunctionComponent } from "react";

interface Props {
  title: string;
}

const Head: FunctionComponent<Props> = ({ title, children }) => (
  <>
    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Merriweather:wght@300;400&display=swap" />
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      <title>{title}</title>

      {children}
    </NextHead>
  </>
);
export default Head;
