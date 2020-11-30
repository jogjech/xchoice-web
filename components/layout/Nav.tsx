import React, { FunctionComponent } from "react";
import { Layout, Menu, Button } from "antd";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Nav.module.css";

const { Header } = Layout;

interface Props {}

const Nav: FunctionComponent<Props> = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  return (
    <Header>
      <Link href="/">
        <div className={styles.logo}>
          <a>X Choice</a>
        </div>
      </Link>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item>
          <Link href="/survey/create">
            <a>Create Survey</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard">
            <a>My Surveys</a>
          </Link>
        </Menu.Item>
        {!isLoading && (
          <Menu.Item style={{ float: "right" }}>
            {isAuthenticated ? (
              <Button
                className={styles.loginButton}
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </Button>
            ) : (
              <Button
                className={styles.loginButton}
                onClick={() => loginWithRedirect()}
              >
                Login / Sign-up
              </Button>
            )}
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Nav;
