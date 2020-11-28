import React, { FunctionComponent } from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

interface Props {}

const Nav: FunctionComponent<Props> = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Nav;
