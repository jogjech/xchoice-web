import React, { FunctionComponent, useState, useEffect } from "react";
import { Spin, Button, Result, Alert } from "antd";
import {
  getSurvey,
  postSurveyResponse,
  getSurveyResponse,
} from "../../apis/survey";
import { useAuth0 } from "@auth0/auth0-react";
import { Survey } from "../../models/survey";
import QuestionViewer from "./question/QuestionViewer";
import { useRouter } from "next/router";
import styles from "./SurveyViewer.module.css";

interface Props {
  surveyId?: string;
  slug?: string;
  preview?: boolean;
}

const SurveyViewer: FunctionComponent<Props> = ({
  surveyId: inputSurveyId,
  slug: inputSlug,
  preview,
}) => {
  const { getAccessTokenSilently } = useAuth0();

  const [surveyId, setSurveyId] = useState<string>(undefined);
  const [survey, setSurvey] = useState<Survey>(undefined);
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [selections, setSelections] = useState<number[]>([]);
  const [responseSlug, setResponseSlug] = useState<string>(undefined);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(undefined);
  const [posted, setPosted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [loadError, setLoadError] = useState<string>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchSurvey = async () => {
      let tempSurveyId: string, tempSelections: number[];

      if (!!inputSurveyId) {
        tempSurveyId = inputSurveyId;
      } else {
        const result = await getSurveyResponse(inputSlug);
        if (result.isError) {
          setLoadError(result.error.message);
          setLoading(false);
          return;
        }
        tempSurveyId = result.surveyResponse.surveyId;
        tempSelections = result.surveyResponse.selections;
      }

      setSurveyId(tempSurveyId);

      let result;
      if (preview) {
        const accessToken = await getAccessTokenSilently();
        result = await getSurvey(tempSurveyId as string, accessToken);
      } else {
        result = await getSurvey(tempSurveyId as string);
      }

      if (result.isError) {
        setLoadError(result.error.message);
      } else {
        setSelections(
          !!tempSelections
            ? tempSelections
            : Array.apply(null, Array(result.survey.questions.length))
        );

        setSurvey(result.survey);
      }

      setLoading(false);
    };
    fetchSurvey();
  }, []);

  const handleSelectionChange = (questionIndex: number) => (
    newValue: number
  ) => {
    console.log(`Question ${questionIndex} received new value ${newValue}`);
    setValidated(false);
    setSelections((prevSelections) => {
      const newSelections = [...prevSelections];
      newSelections[questionIndex] = newValue;
      return newSelections;
    });
  };

  const handleSubmit = async () => {
    console.log("Submitting", selections);
    setPosting(true);
    setPostError(undefined);

    const validationPassed = validateSelections();
    if (validationPassed) {
      console.log("Validation passed");
      const result = await postSurveyResponse({
        surveyId: surveyId,
        selections: selections,
      });
      if (result.isError) {
        setPostError(result.error);
      } else {
        setResponseSlug(result.slug);
      }
      setPosted(!result.isError);
    } else {
      console.log("Validation failed");
    }
    setPosting(false);
  };

  const validateSelections: () => boolean = () => {
    setValidated(true);
    return selections.every((i) => i != null);
  };

  const handleViewResponseButtonClick = () => {
    const toPath = `/survey/response/${responseSlug}`;

    if (toPath === router.asPath) {
      setRedirecting(true);
      router.reload();
    } else {
      setRedirecting(true);
      router.push(`/survey/response/${responseSlug}`);
    }
  };

  if (!!loadError) {
    return (
      <Alert
        message="Failed to load survey. Please refresh to try again."
        type="error"
      ></Alert>
    );
  }

  return (
    <>
      {posted ? (
        <Result
          status="success"
          title={`Your response is recorded! Response id: ${responseSlug}`}
          subTitle={`Please use the response id or click the button below to view / edit your response.`}
          extra={[
            <Button
              type="primary"
              key="console"
              loading={redirecting}
              onClick={handleViewResponseButtonClick}
            >
              View my response
            </Button>,
          ]}
        />
      ) : loading ? (
        <div className={styles.spinContainer}>
          <Spin tip="Loading survey..."></Spin>
        </div>
      ) : (
        <div>
          {!preview && (
            <p className={styles.surveyTitle}>{survey.surveyTitle}</p>
          )}
          {survey.questions.map((question, index) => (
            <QuestionViewer
              question={question}
              key={index}
              selection={selections[index]}
              handleSelectionChange={handleSelectionChange(index)}
              submitWithNoSelection={validated && selections[index] == null}
            ></QuestionViewer>
          ))}
          {!preview && (
            <Button
              className={styles.submitButton}
              type="primary"
              onClick={handleSubmit}
              loading={posting}
            >
              Submit
            </Button>
          )}
          {postError && (
            <Alert
              message="Failed to post response. Please try again."
              type="error"
            ></Alert>
          )}
        </div>
      )}
    </>
  );
};

export default SurveyViewer;
