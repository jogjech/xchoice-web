import axios from "axios";
import { Survey, SurveyResponse } from "../models/survey";

// For get requests, we can use SWR https://swr.vercel.app/getting-started

interface PostSurveyResult {
  error?: {
    message: string;
  };
  isError: boolean;
  surveyId?: string;
}

interface PostSurveyResponseResult {
  error?: {
    message: string;
  };
  isError: boolean;
  slug?: string; // slug is the short string which can be used to view / edit this surey respnose
}

interface GetSurveyResult {
  error?: {
    message: string;
  };
  isError: boolean;
  survey?: Survey;
}

interface GetSurveyResponseResult {
  error?: {
    message: string;
  };
  isError: boolean;
  surveyResponse?: SurveyResponse;
}

const postSurvey = async (survey: Object): Promise<PostSurveyResult> => {
  console.log("Posting survey", survey);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    isError: false,
    surveyId: "1",
  };
  // return {
  //   isError: true,
  //   error: {
  //     message: "Unknown",
  //   },
  //   surveyId: "1",
  // };
};

const postSurveyResponse = async (
  surveyResponse: SurveyResponse
): Promise<PostSurveyResponseResult> => {
  console.log("Posting survey response", surveyResponse);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (surveyResponse.surveyId === "1") {
    return {
      isError: false,
      slug: "fasd07fhfak",
    };
  } else {
    return {
      isError: true,
      error: {
        message: "Unknown",
      },
    };
  }
};

const getSurveyResponse = async (
  slug: string
): Promise<GetSurveyResponseResult> => {
  console.log("Getting survey response", slug);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (slug === "fasd07fhfak") {
    return {
      isError: false,
      surveyResponse: {
        surveyId: "1",
        selections: [1, 3],
      },
    };
  } else {
    return {
      isError: true,
      error: {
        message: "Unknown",
      },
    };
  }
};

const getSurvey = async (surveyId: string): Promise<GetSurveyResult> => {
  console.log("Getting survey", surveyId);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (surveyId === "1") {
    return {
      isError: false,
      survey: {
        surveyTitle: "Personal survey",
        questions: [
          {
            questionTitle: "Your age",
            choices: [
              {
                text: "<18",
              },
              {
                text: "18-30",
              },
              {
                text: "31-60",
              },
              {
                text: ">60",
              },
            ],
          },
          {
            questionTitle: "Your job family",
            choices: [
              {
                text: "Engineering",
              },
              {
                text: "Finance",
              },
              {
                text: "Sales",
              },
              {
                text: "Others",
              },
            ],
          },
        ],
      },
    };
  } else {
    return {
      isError: true,
      error: {
        message: "Cannot find survey",
      },
    };
  }
};

const deleteSurvey = async (surveyId: string) => {};

const findSurveys = async (userId: string) => {};

export {
  postSurvey,
  getSurvey,
  deleteSurvey,
  findSurveys,
  postSurveyResponse,
  getSurveyResponse,
};
