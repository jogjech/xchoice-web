import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Question } from "../../../models/survey";
import QuestionReport from "./QuestionReport";

describe("Question report", () => {
  let wrapper: ShallowWrapper;
  const question: Question = {
    questionTitle: "Question title",
    choices: [
      {
        text: "Choice 1",
        selections: 10,
      },
      {
        text: "Choice 2",
        selections: 30,
      },
    ],
  };

  beforeEach(() => {
    wrapper = shallow(<QuestionReport question={question}></QuestionReport>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders question title", () => {
    const title = wrapper.find(".questionTitle");
    expect(title.text()).toBe(question.questionTitle);
  });

  it("renders choices with percentages", () => {
    const choices = wrapper.find(".choices").children();
    expect(choices.length).toBe(2);

    const choicesTexts = choices.map((choice) => choice.find("span"));
    expect(choicesTexts[0].text()).toBe(question.choices[0].text);
    expect(choicesTexts[1].text()).toBe(question.choices[1].text);

    const choicesPercentages = choices.map((choice) => choice.find("Progress"));
    expect(choicesPercentages[0].prop("percent")).toBe(25);
    expect(choicesPercentages[1].prop("percent")).toBe(75);
  });
});
