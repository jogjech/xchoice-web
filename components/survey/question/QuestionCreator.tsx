import React, { FunctionComponent } from "react";
import { Form, Input, Button } from "antd";
import ChoiceCreator from "./choice/ChoiceCreator";
import { PlusOutlined } from "@ant-design/icons";

interface Props {}

const QuestionCreator: FunctionComponent<Props> = () => {
  return (
    <Form.List name="questions">
      {(questions, { add: addQuestion, remove: removeQuestion }) => (
        <>
          {questions.map((question) => (
            <div key={question.key}>
              <p className="sub-title">Question {question.key + 1}</p>
              <Form.Item
                {...question}
                name={[question.name, "questionTitle"]}
                fieldKey={[question.fieldKey, "questionTitle"]}
                label="Question Title"
                rules={[{ required: true, message: "Missing question title" }]}
              >
                <Input placeholder="Question Title" maxLength={100} />
              </Form.Item>
              <ChoiceCreator questionField={question}></ChoiceCreator>
            </div>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() =>
                addQuestion({
                  choices: [
                    {
                      text: "",
                    },
                  ],
                })
              }
              block
              icon={<PlusOutlined />}
            >
              Add question
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default QuestionCreator;
