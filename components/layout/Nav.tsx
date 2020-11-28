import React, { FunctionComponent } from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import styles from "./Nav.module.css";

const { Header } = Layout;

interface Props {}

const Nav: FunctionComponent<Props> = () => {
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
      </Menu>
    </Header>
  );
};

export default Nav;
