import React, { FunctionComponent } from "react";
import { Layout } from "antd";
import styles from "./footer.module.css";

interface Props {}

const Footer: FunctionComponent<Props> = () => {
  return <Layout.Footer id={styles.siteFooter}>Kevin Wang ©2020</Layout.Footer>;
};

export default Footer;
