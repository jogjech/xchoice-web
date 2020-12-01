import React from "react";
import { FunctionComponent } from "react";
import { Layout } from "antd";
import styles from "./Content.module.css";

interface Props {}

const Content: FunctionComponent<Props> = ({ children }) => {
  return (
    <Layout.Content id={styles.siteContent}>
      <div id={styles.innerContent}>{children}</div>
    </Layout.Content>
  );
};

export default Content;
