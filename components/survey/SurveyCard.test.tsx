import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { SurveyMetadata } from "../../models/survey";
import SurveyCard from "./SurveyCard";

describe("Survey card", () => {
  let wrapperWithNoMetadata: ShallowWrapper;
  let wrapperWithPublishedMetadata: ShallowWrapper;
  let wrapperWithUnpublishedMetadata: ShallowWrapper;

  const publishedMetadata: SurveyMetadata = {
    surveyId: "surveyId1",
    responses: 13,
    published: true,
    title: "Survey Title 1",
  };

  const unpublishedMetadata: SurveyMetadata = {
    surveyId: "surveyId2",
    responses: 15,
    published: false,
    title: "Survey Title 2",
  };

  beforeEach(() => {
    wrapperWithNoMetadata = shallow(
      <SurveyCard surveyMetadata={null}></SurveyCard>
    );
    wrapperWithPublishedMetadata = shallow(
      <SurveyCard surveyMetadata={publishedMetadata}></SurveyCard>
    );
    wrapperWithUnpublishedMetadata = shallow(
      <SurveyCard surveyMetadata={unpublishedMetadata}></SurveyCard>
    );
  });

  it("with no survey metatdata renders correctly", () => {
    expect(wrapperWithNoMetadata).toMatchSnapshot();
  });

  it("with no survey metatdata renders loading card", () => {
    const card = wrapperWithNoMetadata.find("Card");
    expect(card.prop("loading")).toBeTruthy();
  });

  it("with published survey metatdata renders correctly", () => {
    expect(wrapperWithPublishedMetadata).toMatchSnapshot();
  });

  it("with published survey metatdata renders surey metadata", () => {
    const card = wrapperWithPublishedMetadata.find("Card");
    expect(card.prop("title")).toBe(publishedMetadata.title);

    const statistic = wrapperWithPublishedMetadata.find(
      "withConfigConsumer(Statistic)"
    );
    expect(statistic.prop("title")).toBe("Responses");
    expect(statistic.prop("value")).toBe(publishedMetadata.responses);

    const tag = wrapperWithPublishedMetadata.find("Tag");
    expect(tag.prop("color")).toBe("green");
    expect(tag.text()).toBe("published");
  });

  it("with unpublished survey metatdata renders correctly", () => {
    expect(wrapperWithUnpublishedMetadata).toMatchSnapshot();
  });

  it("with unpublished survey metatdata renders surey metadata", () => {
    const card = wrapperWithUnpublishedMetadata.find("Card");
    expect(card.prop("title")).toBe(unpublishedMetadata.title);

    const statistic = wrapperWithUnpublishedMetadata.find(
      "withConfigConsumer(Statistic)"
    );
    expect(statistic.prop("title")).toBe("Responses");
    expect(statistic.prop("value")).toBe(unpublishedMetadata.responses);

    const tag = wrapperWithUnpublishedMetadata.find("Tag");
    expect(tag.prop("color")).toBe("orange");
    expect(tag.text()).toBe("unpublished");
  });
});
