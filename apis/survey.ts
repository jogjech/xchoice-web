import axios from "axios";
import {
  Survey,
  SurveyResponse,
  SurveyMetadata,
  SurveyReport,
} from "../models/survey";

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

interface GetSurveyReportResult {
  error?: {
    message: string;
  };
  isError: boolean;
  surveyReport?: SurveyReport;
}

interface GetSurveyResponseResult {
  error?: {
    message: string;
  };
  isError: boolean;
  surveyResponse?: SurveyResponse;
}

interface FindSurveysResult {
  error?: {
    message: string;
  };
  isError: boolean;
  surveyMetadataList?: SurveyMetadata[];
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
        published: true,
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

const getSurveyReport = async (
  surveyId: string
): Promise<GetSurveyReportResult> => {
  console.log(`Getting survey report for survey ${surveyId}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (surveyId === "1") {
    return {
      isError: false,
      surveyReport: {
        published: true,
        surveyId: surveyId,
        responses: 11,
        surveyTitle: "Personal survey",
        questions: [
          {
            questionTitle: "Your age",
            choices: [
              {
                text: "<18",
                selections: 3,
              },
              {
                text: "18-30",
                selections: 3,
              },
              {
                text: "31-60",
                selections: 4,
              },
              {
                text: ">60",
                selections: 1,
              },
            ],
          },
          {
            questionTitle: "Your job family",
            choices: [
              {
                text: "Engineering",
                selections: 5,
              },
              {
                text: "Finance",
                selections: 4,
              },
              {
                text: "Sales",
                selections: 1,
              },
              {
                text: "Others",
                selections: 1,
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
        message: "Cannot load report for this survey",
      },
    };
  }
};

const deleteSurvey = async (surveyId: string) => {};

const findSurveys = async (userId: string): Promise<FindSurveysResult> => {
  console.log(`Finding surveys for user ${userId}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (userId === "1") {
    return {
      isError: false,
      surveyMetadataList: [
        {
          surveyId: "1",
          responses: 0,
          published: false,
          userId: userId,
          title: "Personal survey",
        },
        {
          surveyId: "14",
          responses: 15052,
          published: true,
          userId: userId,
          title: "Work experience survey",
        },
        {
          surveyId: "12",
          responses: 0,
          published: false,
          userId: userId,
          title: "Personal survey",
        },
        {
          surveyId: "15",
          responses: 15052,
          published: true,
          userId: userId,
          title: "Work experience survey",
        },
        {
          surveyId: "17",
          responses: 0,
          published: false,
          userId: userId,
          title: "Personal survey",
        },
      ],
    };
  } else {
    return {
      isError: true,
      error: {
        message: "Cannot find surveys for this user",
      },
    };
  }
};

export {
  postSurvey,
  getSurvey,
  getSurveyReport,
  deleteSurvey,
  findSurveys,
  postSurveyResponse,
  getSurveyResponse,
};
