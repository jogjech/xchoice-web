import React, { FunctionComponent, useState, useEffect } from "react";
import { Spin, Button, Result, Alert } from "antd";
import {
  getSurvey,
  postSurveyResponse,
  getSurveyResponse,
} from "../../apis/survey";
import { Survey } from "../../models/survey";
import QuestionViewer from "./question/QuestionViewer";
import { useRouter } from "next/router";
import styles from "./SurveyViewer.module.css";

interface Props {
  surveyId?: string;
  slug?: string;
}

const SurveyViewer: FunctionComponent<Props> = ({
  surveyId: inputSurveyId,
  slug: inputSlug,
}) => {
  // TODO: missing the handle of getSurvey and getSurveyResponse errors
  const [surveyId, setSurveyId] = useState<string>(undefined);
  const [survey, setSurvey] = useState<Survey>(undefined);
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [selections, setSelections] = useState<number[]>([]);
  const [responseSlug, setResponseSlug] = useState<string>(undefined);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(undefined);
  const [posted, setPosted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSurvey = async () => {
      let tempSurveyId: string, tempSelections: number[];

      if (!!inputSurveyId) {
        tempSurveyId = inputSurveyId;
      } else {
        const result = await getSurveyResponse(inputSlug);
        tempSurveyId = result.surveyResponse.surveyId;
        tempSelections = result.surveyResponse.selections;
      }

      setSurveyId(tempSurveyId);

      const result = await getSurvey(tempSurveyId as string);

      setSelections(
        !!tempSelections
          ? tempSelections
          : Array.apply(null, Array(result.survey.questions.length))
      );

      setSurvey(result.survey);
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
    console.log(router);
    if (toPath === router.asPath) {
      router.reload();
    } else {
      router.push(`/survey/response/${responseSlug}`);
    }
  };

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
          <p className={styles.surveyTitle}>{survey.surveyTitle}</p>
          {survey.questions.map((question, index) => (
            <QuestionViewer
              question={question}
              key={index}
              selection={selections[index]}
              handleSelectionChange={handleSelectionChange(index)}
              submitWithNoSelection={validated && selections[index] == null}
            ></QuestionViewer>
          ))}
          <Button
            className={styles.submitButton}
            type="primary"
            onClick={handleSubmit}
            loading={posting}
          >
            Submit
          </Button>
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
