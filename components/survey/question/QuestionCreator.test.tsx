import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import QuestionCreator from "./QuestionCreator";

describe("Question creator", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<QuestionCreator></QuestionCreator>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains form list", () => {
    const formList = wrapper.find("FormList");
    expect(formList.prop("name")).toEqual("questions");
  });
});
