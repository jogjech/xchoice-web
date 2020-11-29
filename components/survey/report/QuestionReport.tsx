import React, { FunctionComponent } from "react";
import { Question } from "../../../models/survey";
import { Progress } from "antd";
import styles from "./QuestionReport.module.css";

interface Props {
  question: Question;
}

const QuestionReport: FunctionComponent<Props> = ({ question }) => {
  const totalCount = question.choices
    .map((choice) => choice.selections)
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <div>
        <p className={styles.questionTitle}>{question.questionTitle}</p>
      </div>
      <div className={styles.choices}>
        {question.choices.map((choice, index) => {
          return (
            <div key={index}>
              <span>{choice.text}</span>
              <Progress
                percent={Math.round((choice.selections / totalCount) * 100)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QuestionReport;
