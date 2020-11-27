import { FunctionComponent } from "react";
import { Layout as AntLayout } from "antd";
import Head from "../util/Head";
import Content from "./Content";
import styles from "./layout.module.css";

interface Props {
  title: string;
}

const Layout: FunctionComponent<Props> = ({ title, children }) => (
  <AntLayout id={styles.siteLayout}>
    <Head title={title}></Head>
    <Content>{children}</Content>
  </AntLayout>
);

export default Layout;
