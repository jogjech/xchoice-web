import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import SurveyCreator from "./SurveyCreator";

describe("Survey creator", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SurveyCreator></SurveyCreator>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains form", () => {
    const form = wrapper.find("ForwardRef(InternalForm)");
    expect(form.exists()).toBeTruthy();

    const initialValues = form.prop("initialValues");
    expect(initialValues).toEqual({
      questions: [
        {
          choices: [
            {
              text: "",
            },
          ],
        },
      ],
    });

    expect(form.find(".sub-title").text()).toBe("Basic Info");

    expect(form.find("QuestionCreator").exists()).toBeTruthy();

    expect(form.find("Button").text()).toBe("Submit");
  });
});
