export enum SurveyStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  UNPUBLISHED = "UNPUBLISHED",
  DELETED = "DELETED",
}

export interface Choice {
  text: string;
  selections?: number;
}

export interface Question {
  questionTitle: string;
  choices: Choice[];
}

export interface Survey {
  surveyTitle: string;
  questions: Question[];
  status?: SurveyStatus;
}

export interface SurveyResponse {
  surveyId: string;
  selections: number[];
}

export interface SurveyMetadata {
  surveyId: string;
  responses: number;
  title: string;
  status?: SurveyStatus;
}

export interface SurveyReport {
  surveyId: string;
  responses: number;
  surveyTitle: string;
  questions: Question[];
  published?: boolean;
  status?: SurveyStatus;
}
