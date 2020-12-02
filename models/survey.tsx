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
  published?: boolean;
}

export interface SurveyResponse {
  surveyId: string;
  selections: number[];
}

export interface SurveyMetadata {
  surveyId: string;
  responses: number;
  published: boolean;
  title: string;
}

export interface SurveyReport {
  surveyId: string;
  responses: number;
  surveyTitle: string;
  questions: Question[];
  published?: boolean;
}
