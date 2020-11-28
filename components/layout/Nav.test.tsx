import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Nav from "./Nav";

describe("Nav bar", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Nav></Nav>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains menu", () => {
    const menu = wrapper.find("Menu");
    expect(menu.exists()).toBeTruthy();
  });
});
