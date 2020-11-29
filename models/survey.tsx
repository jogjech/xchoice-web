export interface Choice {
  text: string;
}

export interface Question {
  questionTitle: string;
  choices: Choice[];
}

export interface Survey {
  surveyTitle: string;
  questions: Question[];
}

export interface SurveyResponse {
  surveyId: string;
  selections: number[];
}

export interface SurveyMetadata {
  surveyId: string;
  responses: number;
  published: boolean;
  userId: string;
  title: string;
}
