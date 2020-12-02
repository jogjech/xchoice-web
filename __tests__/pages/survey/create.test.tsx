import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import CreatePage from "../../../pages/survey/create";

describe("Create survey page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<CreatePage></CreatePage>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // This element is wrapped by HOC, need to figure out the right way to test it.
  // it("contains layout", () => {
  //   const layout = wrapper.find("Layout");
  //   expect(layout.exists()).toBeTruthy();
  //   expect(layout.prop("title")).toBe("Create Survey");
  // });

  // it("contains survey creator", () => {
  //   const surveyCreator = wrapper.find("SurveyCreator");
  //   expect(surveyCreator.exists()).toBeTruthy();
  // });
});
