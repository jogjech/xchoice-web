import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ViewResponsePage from "../../../pages/survey/response";

const slug = "responseSlug";

jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      route: "/",
      pathname: "",
      query: { slug: slug },
    };
  },
}));

describe("View response page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ViewResponsePage></ViewResponsePage>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains layout", () => {
    const layout = wrapper.find("Layout");
    expect(layout.exists()).toBeTruthy();
    expect(layout.prop("title")).toBe("View Response");
  });

  it("contains survey viewer", () => {
    const surveyViewer = wrapper.find("SurveyViewer");
    expect(surveyViewer.exists()).toBeTruthy();
    expect(surveyViewer.prop("slug")).toBe(slug);
  });
});
