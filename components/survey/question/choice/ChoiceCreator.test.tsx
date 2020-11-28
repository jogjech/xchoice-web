import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { FormListFieldData } from "antd/lib/form/FormList";
import ChoiceCreator from "./ChoiceCreator";

describe("Choice creator", () => {
  let wrapper: ShallowWrapper;
  const questionField: FormListFieldData = {
    name: 2,
    key: 3,
    fieldKey: 7,
  };

  beforeEach(() => {
    wrapper = shallow(
      <ChoiceCreator questionField={questionField}></ChoiceCreator>
    );
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains form list", () => {
    const formList = wrapper.find("FormList");
    expect(formList.prop("name")).toEqual([questionField.name, "choices"]);
  });
});
