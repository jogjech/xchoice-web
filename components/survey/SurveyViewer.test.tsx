import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import SurveyViewer from "./SurveyViewer";

describe("Survey viewer", () => {
  let wrapperWithSurveyId: ShallowWrapper;
  let wrapperWithSlug: ShallowWrapper;
  const surveyId = "1";
  const slug = "fakljjfqklj";

  beforeEach(() => {
    wrapperWithSurveyId = shallow(
      <SurveyViewer surveyId={surveyId}></SurveyViewer>
    );
    wrapperWithSlug = shallow(<SurveyViewer slug={slug}></SurveyViewer>);
  });

  it("with survey id renders correctly", () => {
    expect(wrapperWithSurveyId).toMatchSnapshot();
  });

  it("with survey id renders spinner when loading data", () => {
    const spinner = wrapperWithSurveyId.find("Spin");
    expect(spinner.exists()).toBeTruthy();
    expect(spinner.prop("tip")).toBe("Loading survey...");
  });

  it("with slug renders correctly", () => {
    expect(wrapperWithSlug).toMatchSnapshot();
  });

  it("with slug renders spinner when loading data", () => {
    const spinner = wrapperWithSlug.find("Spin");
    expect(spinner.exists()).toBeTruthy();
    expect(spinner.prop("tip")).toBe("Loading survey...");
  });
});
