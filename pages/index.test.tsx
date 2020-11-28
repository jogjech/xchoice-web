import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Home from "./index";

describe("Home page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Home></Home>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains title", () => {
    const title = wrapper.find(".title");
    expect(title.text()).toContain("A Survey Software built for you");
  });

  it("contains button to create survey", () => {
    const button = wrapper.find("Button");
    expect(button.text()).toContain("Create Survey Now");
  });
});
