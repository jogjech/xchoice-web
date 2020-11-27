import React from "react";
import { FunctionComponent } from "react";
import { Button } from "antd";
import Layout from "../components/layout/Layout";
import styles from "./index.module.css";

interface Props {}

const Home: FunctionComponent<Props> = () => (
  <div>
    <Layout title="X Choice">
      <div className={styles.homeContainer}>
        <p className="title">A Survey Software built for you</p>
        <Button type="primary" shape="round" size="large">
          Create Survey Now
        </Button>
      </div>
    </Layout>
  </div>
);

export default Home;
