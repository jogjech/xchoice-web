import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import CreatePage from "../../../pages/survey/create";

describe("Survey page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<CreatePage></CreatePage>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains layout", () => {
    const layout = wrapper.find("Layout");
    expect(layout.exists()).toBeTruthy();
    expect(layout.prop("title")).toBe("Create Survey");
  });

  it("contains survey creator", () => {
    const surveyCreator = wrapper.find("SurveyCreator");
    expect(surveyCreator.exists()).toBeTruthy();
  });
});
