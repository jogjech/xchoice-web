import React, { FunctionComponent, useState } from "react";
import { Button } from "antd";
import Layout from "../components/layout/Layout";
import styles from "./index.module.css";
import { useRouter } from "next/router";

interface Props {}

const Home: FunctionComponent<Props> = () => {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  return (
    <div>
      <Layout title="X Choice">
        <div className={styles.homeContainer}>
          <p className="title">A Survey Software built for you</p>
          <Button
            type="primary"
            shape="round"
            size="large"
            loading={redirecting}
            onClick={() => {
              setRedirecting(true);
              router.push(`/survey/create`);
            }}
          >
            Create Survey Now
          </Button>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
