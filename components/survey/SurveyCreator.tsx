import React, { FunctionComponent, useState } from "react";
import { Form, Input, Button, Result, Alert } from "antd";
import QuestionCreator from "./question/QuestionCreator";
import { postSurvey } from "../../apis/survey";
import { useAuth0 } from "@auth0/auth0-react";
import QRCode from "qrcode";
import { useRouter } from "next/router";

interface Props {}

const SurveyCreator: FunctionComponent<Props> = () => {
  const { getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  const [form] = Form.useForm();
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(undefined);
  const [posted, setPosted] = useState(false);
  const [surveyId, setSurveyId] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const [qr, setQR] = useState<string>(undefined);

  const handleFormFinish = async (formData: {
    surveyTitle: string;
    questions: [
      {
        questionTitle: string;
        choices: [{ text: string }];
      }
    ];
  }) => {
    console.log(formData);
    setPosting(true);
    setPostError(undefined);

    const accessToken = await getAccessTokenSilently();
    const result = await postSurvey(formData, accessToken);

    setPostError(result.error);
    setPosted(!result.isError);
    setSurveyId(result.surveyId);
    setPosting(false);

    const generatedQR = await generateQR(
      `${window.location.origin}/survey?id=${result.surveyId}`
    );
    setQR(generatedQR);
  };

  const generateQR = async (text) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {posted ? (
        <>
          <Result
            status="success"
            title={`Your survey is posted! Survey URL: ${window.location.origin}/survey?id=${surveyId}`}
            subTitle={`Please share the QR code below for others to take the survey.`}
            extra={[
              <Button
                type="primary"
                key="console"
                loading={redirecting}
                onClick={() => {
                  setRedirecting(true);
                  router.push(`/dashboard/survey?id=${surveyId}`);
                }}
              >
                View / manage my survey
              </Button>,
            ]}
          ></Result>
          <div>
            <img src={qr} style={{ margin: "auto", display: "block" }}></img>
          </div>
        </>
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
              <Input placeholder="Survey Title" maxLength={100}></Input>
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
