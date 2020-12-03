import React, { FunctionComponent, useState } from "react";
import { Layout, Menu, Button, Grid, Drawer, Divider } from "antd";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./Nav.module.css";

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface Props {}

const Nav: FunctionComponent<Props> = () => {
  const screens = useBreakpoint();
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const isMobile = !(screens.md || screens.lg || screens.xl || screens.xxl);
  const [expandPopoverMenu, setExpandPopoverMenu] = useState(false);

  const renderRightMenu = () => {
    if (isLoading) return;
    if (isMobile) {
      return (
        <div
          style={{ float: "right" }}
          onClick={() => setExpandPopoverMenu(true)}
        >
          <MenuOutlined style={{ color: "white" }}></MenuOutlined>
        </div>
      );
    }
    if (isAuthenticated) {
      return (
        <div style={{ float: "right" }}>
          <Button
            className={styles.loginButton}
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </Button>
        </div>
      );
    }
    return (
      <div style={{ float: "right" }}>
        <Button
          className={styles.loginButton}
          onClick={() => loginWithRedirect()}
        >
          Login / Sign-up
        </Button>
      </div>
    );
  };

  const renderAuthButtonInDrawer = () => {
    if (isAuthenticated) {
      return (
        <div className={styles.drawerItem}>
          <a
            href=""
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </a>
        </div>
      );
    } else {
      return (
        <div className={styles.drawerItem}>
          <a href="" onClick={() => loginWithRedirect()}>
            Login / Sign-up
          </a>
        </div>
      );
    }
  };

  return (
    <>
      <Header>
        <Link href="/">
          <div className={styles.logo}>
            <>
              <Image
                src="/logo.png"
                className={styles.logoImg}
                alt="X Choice"
                width="50"
                height="50"
              ></Image>
              <span className={styles.logoText}>Choice</span>
            </>
          </div>
        </Link>
        <Menu theme="dark" mode="horizontal">
          {!isMobile && (
            <>
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
            </>
          )}

          {renderRightMenu()}
        </Menu>
      </Header>
      <Drawer
        title=""
        placement="right"
        closable={false}
        onClose={() => {
          setExpandPopoverMenu(!expandPopoverMenu);
        }}
        visible={expandPopoverMenu}
      >
        <div className={styles.drawerItem}>
          <Link href="/survey/create">Create Survey</Link>
        </div>
        <div className={styles.drawerItem}>
          <Link href="/dashboard">My Surveys</Link>
        </div>
        <Divider dashed></Divider>
        {renderAuthButtonInDrawer()}
      </Drawer>
    </>
  );
};

export default Nav;
