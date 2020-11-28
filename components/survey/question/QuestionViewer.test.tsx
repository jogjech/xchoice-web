import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import QuestionViewer from "./QuestionViewer";

describe("Question viewer", () => {
  let wrapper: ShallowWrapper;
  const question = {
    questionTitle: "Question title",
    choices: [
      {
        text: "Choice A",
      },
      {
        text: "Choice B",
      },
    ],
  };
  const selection = 1;
  const mockHandleSelectionChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <QuestionViewer
        question={question}
        selection={selection}
        handleSelectionChange={mockHandleSelectionChange}
        submitWithNoSelection={false}
      ></QuestionViewer>
    );
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains question title and choices", () => {
    const title = wrapper.find(".questionTitle");
    expect(title.text()).toEqual(question.questionTitle);

    const choices = wrapper.find("Radio");
    expect(choices.length).toBe(question.choices.length);
    choices.forEach((choice, index) => {
      expect(choice.text()).toBe(question.choices[index].text);
    });
  });
});
