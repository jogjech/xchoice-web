import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Layout from "./Layout";

describe("Page layout", () => {
  const title = "Title";
  const children = <div id="#layout-children"></div>;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Layout title={title}>{children}</Layout>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains head with title", () => {
    const head = wrapper.find("Head");
    expect(head.prop("title")).toEqual(title);
  });

  it("contains nav bar", () => {
    const nav = wrapper.find("Nav");
    expect(nav.exists()).toBeTruthy();
  });

  it("contains content", () => {
    const content = wrapper.find("Content");
    expect(content.exists()).toBeTruthy();
  });

  it("contains footer", () => {
    const footer = wrapper.find("Footer");
    expect(footer.exists()).toBeTruthy();
  });
});
