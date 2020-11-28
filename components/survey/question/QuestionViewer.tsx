import React, { FunctionComponent, useState } from "react";
import { Radio } from "antd";
import { Question } from "../../../models/survey";
import { RadioChangeEvent } from "antd/lib/radio";
import styles from "./QuestionViewer.module.css";

interface Props {
  question: Question;
  selection: number;
  handleSelectionChange: (selection: number) => void;
  submitWithNoSelection: boolean;
}

const QuestionViewer: FunctionComponent<Props> = ({
  question,
  handleSelectionChange,
  submitWithNoSelection,
  selection: inputSelection,
}) => {
  const [selection, setSelection] = useState<number>(inputSelection);

  const onChange = (event: RadioChangeEvent) => {
    setSelection(event.target.value);
    handleSelectionChange(event.target.value);
  };

  return (
    <>
      <div className={styles.questionContainer}>
        <p className={styles.questionTitle}>{question.questionTitle}</p>
        <div>
          <Radio.Group onChange={onChange} value={selection}>
            {question.choices.map((choice, index) => (
              <Radio className={styles.radioStyle} value={index} key={index}>
                {choice.text}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        {submitWithNoSelection && (
          <div className={styles.choiceErrorMessage}>
            No selection detected. Please select one of the choices.
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionViewer;
