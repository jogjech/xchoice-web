import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Head from "./Head";

describe("Head util", () => {
  const title = "Title";
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Head title={title}></Head>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains title tag", () => {
    const titleTag = wrapper.find("title");
    expect(titleTag.text()).toEqual(title);
  });
});
