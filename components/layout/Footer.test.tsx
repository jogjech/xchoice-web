import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Footer from "./Footer";

describe("Page footer", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer></Footer>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
