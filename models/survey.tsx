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
