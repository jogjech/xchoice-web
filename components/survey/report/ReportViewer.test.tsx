import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ReportViewer from "./ReportViewer";

describe("Report viewer", () => {
  let wrapper: ShallowWrapper;
  const surveyId = "surveyId";

  beforeEach(() => {
    wrapper = shallow(<ReportViewer surveyId={surveyId}></ReportViewer>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders loading status", () => {
    expect(wrapper.find("div").text()).toBe("loading...");
  });
});
