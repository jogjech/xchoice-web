import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ManageSurveyPage from "../../../../pages/dashboard/survey/[id]";

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

describe("Manage survey page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ManageSurveyPage></ManageSurveyPage>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // This element is wrapped by HOC, need to figure out the right way to test it.
  // it("contains layout", () => {
  //   const layout = wrapper.find("Layout");
  //   expect(layout.exists()).toBeTruthy();
  //   expect(layout.prop("title")).toBe("Manage Survey");
  // });
});
