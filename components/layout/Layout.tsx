import React, { FunctionComponent } from "react";
import { Layout as AntLayout } from "antd";
import Head from "../util/Head";
import Nav from "./Nav";
import Content from "./Content";
import Footer from "./Footer";
import styles from "./Layout.module.css";

interface Props {
  title: string;
  requiredAuth?: boolean;
}

const Layout: FunctionComponent<Props> = ({
  title,
  requiredAuth,
  children,
}) => (
  <AntLayout id={styles.siteLayout}>
    <Head title={title}></Head>
    <Nav></Nav>
    <Content requiredAuth={requiredAuth || false}>{children}</Content>
    <Footer></Footer>
  </AntLayout>
);

export default Layout;
