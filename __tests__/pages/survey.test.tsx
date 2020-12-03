import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ViewSurveyPage from "../../pages/survey";

const surveyId = "surveyId";

jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      route: "/",
      pathname: "",
      query: { id: surveyId },
    };
  },
}));

describe("View survey page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ViewSurveyPage></ViewSurveyPage>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains layout", () => {
    const layout = wrapper.find("Layout");
    expect(layout.exists()).toBeTruthy();
    expect(layout.prop("title")).toBe("View Survey");
  });

  it("contains survey viewer", () => {
    const surveyViewer = wrapper.find("SurveyViewer");
    expect(surveyViewer.exists()).toBeTruthy();
    expect(surveyViewer.prop("surveyId")).toBe(surveyId);
  });
});
