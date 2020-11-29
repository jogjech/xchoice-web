import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Dashboard from "./dashboard";

describe("Dashboard page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Dashboard></Dashboard>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains layout", () => {
    const layout = wrapper.find("Layout");
    expect(layout.exists()).toBeTruthy();
    expect(layout.prop("title")).toBe("My Surveys");
  });

  it("contains loading survey card", () => {
    const surveyCard = wrapper.find("SurveyCard");
    expect(surveyCard.exists()).toBeTruthy();
    expect(surveyCard.prop("surveyMetadata")).toBe(null);
  });
});
