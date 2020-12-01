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

const postSurvey = async (survey: Survey): Promise<PostSurveyResult> => {
  console.log("Posting survey");

  const request = {
    publisherId: 33,
    title: survey.surveyTitle,
    questions: survey.questions.map((question) => {
      return {
        title: question.questionTitle,
        choices: question.choices.map((choice) => {
          return {
            text: choice.text,
          };
        }),
      };
    }),
  };

  console.log(request);

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/surveys`,
      request
    );

    return {
      isError: false,
      surveyId: data.id,
    };
  } catch (error) {
    return {
      isError: true,
      error: {
        message: error.response.data.message,
      },
      surveyId: "1",
    };
  }
};

const postSurveyResponse = async (
  surveyResponse: SurveyResponse
): Promise<PostSurveyResponseResult> => {
  console.log("Posting survey response", surveyResponse);

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/surveys/${surveyResponse.surveyId}/responses`,
      surveyResponse.selections
    );

    console.log(data);

    return {
      isError: false,
      slug: data,
    };
  } catch (error) {
    return {
      isError: true,
      error: {
        message: error.response.data.message,
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

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/surveys/${surveyId}`
    );

    console.log(data);

    return {
      isError: false,
      survey: {
        published: true,
        surveyTitle: data.title,
        questions: data.questions.map((question) => {
          return {
            questionTitle: question.title,
            choices: question.choices.map((choice) => {
              return {
                text: choice.text,
              };
            }),
          };
        }),
      },
    };
  } catch (error) {
    return {
      isError: true,
      error: {
        message: error.response.data.message,
      },
    };
  }
};

const getSurveyReport = async (
  surveyId: string
): Promise<GetSurveyReportResult> => {
  console.log(`Getting survey report for survey ${surveyId}`);

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/surveys/${surveyId}`
    );

    console.log(data);

    return {
      isError: false,
      surveyReport: {
        published: true,
        surveyId: surveyId,
        responses: data.totalResponses,
        surveyTitle: data.title,
        questions: data.questions.map((question) => {
          return {
            questionTitle: question.title,
            choices: question.choices.map((choice) => {
              return {
                text: choice.text,
                selections: choice.responses.length,
              };
            }),
          };
        }),
      },
    };
  } catch (error) {
    return {
      isError: true,
      error: {
        message: error.response.data.message,
      },
    };
  }
};

const deleteSurvey = async (surveyId: string) => {};

const findSurveys = async (userId: string): Promise<FindSurveysResult> => {
  console.log(`Finding surveys for user ${userId}`);

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/surveys`,
      {
        params: { userId: userId },
      }
    );

    console.log(data);

    return {
      isError: false,
      surveyMetadataList: data.map((item) => {
        return {
          surveyId: item.surveyId,
          responses: item.responses,
          published: item.published,
          userId: userId,
          title: item.title,
        };
      }),
    };
  } catch (error) {
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
