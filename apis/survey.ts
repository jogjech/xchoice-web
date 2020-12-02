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

const postSurvey = async (
  survey: Survey,
  accessToken: string
): Promise<PostSurveyResult> => {
  console.log("Posting survey");

  const request = {
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
      request,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
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
  try {
    const {
      data,
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/surveys/responses`,
      { params: { slug: slug } }
    );

    console.log(data);

    return {
      isError: false,
      surveyResponse: {
        surveyId: data.surveyId,
        selections: data.selections,
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

const getSurvey = async (
  surveyId: string,
  accessToken?: string
): Promise<GetSurveyResult> => {
  console.log("Getting survey", surveyId);

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/surveys/${surveyId}`,
      {
        ...(!!accessToken && {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }
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
  surveyId: string,
  accessToken: string
): Promise<GetSurveyReportResult> => {
  console.log(`Getting survey report for survey ${surveyId}`);

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/surveys/${surveyId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
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

const findSurveys = async (accessToken: string): Promise<FindSurveysResult> => {
  console.log(`Finding surveys`);

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_X_CHOICE_API}/surveys`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
          title: item.title,
        };
      }),
    };
  } catch (error) {
    console.log(error);
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
