import React, { FunctionComponent, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Router, { useRouter } from "next/router";
import { Spin } from "antd";
import { putUser } from "../apis/user";
import styles from "./auth.module.css";

interface Props {}

const Auth: FunctionComponent<Props> = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    const ensureUser = async () => {
      if (isLoading) {
        return;
      }
      if (user) {
        const accessToken = await getAccessTokenSilently();

        await putUser(accessToken);
      }
      Router.replace((router.query.returnTo as string) || "/");
    };
    ensureUser();
  }, [user, isLoading, isAuthenticated]);

  return (
    <div className={styles.spinContainer}>
      <Spin tip="Redirecting..."></Spin>
    </div>
  );
};

export default Auth;
