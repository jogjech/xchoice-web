import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { Layout } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Content.module.css";

interface Props {
  requiredAuth: boolean;
}

const Content: FunctionComponent<Props> = ({ requiredAuth, children }) => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading || isAuthenticated || !requiredAuth) {
      return;
    }
    (async (): Promise<void> => {
      await loginWithRedirect();
    })();
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  return (
    <Layout.Content id={styles.siteContent}>
      <div id={styles.innerContent}>{children}</div>
    </Layout.Content>
  );
};

export default Content;
