import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Content from "./Content";

describe("Page content", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Content></Content>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains innerContent div", () => {
    const innerContent = wrapper.find("div#innerContent");
    expect(innerContent.exists()).toBeTruthy();
  });
});
