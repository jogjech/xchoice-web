import { shallow } from "enzyme";
import React from "react";
import Home from "./index";

describe("Home page", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Home></Home>);

    expect(wrapper).toMatchSnapshot();
  });
});
