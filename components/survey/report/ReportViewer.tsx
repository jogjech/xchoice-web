import React, { FunctionComponent, useState, useEffect } from "react";
import { getSurveyReport } from "../../../apis/survey";
import { SurveyReport } from "../../../models/survey";
import QuestionReport from "./QuestionReport";
import { Alert, Statistic } from "antd";

interface Props {
  surveyId: string;
}

const ReportViewer: FunctionComponent<Props> = ({ surveyId }) => {
  const [surveyReport, setSurveyReport] = useState<SurveyReport>(undefined);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>(undefined);

  useEffect(() => {
    const fetchReport = async () => {
      const result = await getSurveyReport(surveyId);

      if (result.isError) {
        setErrorMessage(result.error.message);
      } else {
        setSurveyReport(result.surveyReport);
      }
      setLoading(false);
    };
    fetchReport();
  }, []);

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : !!errorMessage ? (
        <Alert
          message="Failed to load response. Please refresh page to try again."
          type="error"
        ></Alert>
      ) : (
        <div>
          {surveyReport.published ? (
            <>
              <Statistic
                title="Responses captured"
                value={surveyReport.responses}
              ></Statistic>
              {surveyReport.responses === 0 ? (
                <div>No responses captured yet. Please check again later.</div>
              ) : (
                <div>
                  {surveyReport.questions.map((question, index) => (
                    <QuestionReport
                      question={question}
                      key={index}
                    ></QuestionReport>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Alert
              message="Survey hasn't been published yet. Please check the response after publishing the survey."
              type="info"
              showIcon
            ></Alert>
          )}
        </div>
      )}
    </>
  );
};

export default ReportViewer;
