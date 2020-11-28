import React, { FunctionComponent, useState } from "react";
import { Form, Input, Button, Result, Alert } from "antd";
import QuestionCreator from "./question/QuestionCreator";
import { postSurvey } from "../../apis/survey";
import { useRouter } from "next/router";

interface Props {}

const SurveyCreator: FunctionComponent<Props> = () => {
  const [form] = Form.useForm();
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(undefined);
  const [posted, setPosted] = useState(false);
  const [surveyId, setSurveyId] = useState("");
  const router = useRouter();

  const handleFormFinish = async (formData: Object) => {
    setPosting(true);
    setPostError(undefined);

    const result = await postSurvey(formData);

    setPostError(result.error);
    setPosted(!result.isError);
    setSurveyId(result.surveyId);
    setPosting(false);
  };

  return (
    <>
      {posted ? (
        <Result
          status="success"
          title="Your survey is posted!"
          subTitle={`Survey ID: ${surveyId}.`}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => router.push(`/survey/${surveyId}`)}
            >
              View my survey
            </Button>,
          ]}
        />
      ) : (
        <>
          <div>
            <p className="title">Create your survey</p>
          </div>
          <Form
            layout="vertical"
            form={form}
            initialValues={{
              questions: [
                {
                  choices: [
                    {
                      text: "",
                    },
                  ],
                },
              ],
            }}
            onFinish={handleFormFinish}
            autoComplete="off"
          >
            <p className="sub-title">Basic Info</p>
            <Form.Item
              label="Survey Title"
              name="surveyTitle"
              rules={[{ required: true, message: "Missing survey title" }]}
            >
              <Input placeholder="Survey Title"></Input>
            </Form.Item>
            <QuestionCreator></QuestionCreator>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={posting}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {postError && (
            <Alert
              message="Failed to create survey. Please try again."
              type="error"
            ></Alert>
          )}
        </>
      )}
    </>
  );
};

export default SurveyCreator;
