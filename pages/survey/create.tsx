import React, { FunctionComponent } from "react";
import Layout from "../../components/layout/Layout";
import SurveyCreator from "../../components/survey/SurveyCreator";
import { BackTop } from "antd";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface Props {}

const CreateSurveyPage: FunctionComponent<Props> = () => (
  <Layout title="Create Survey">
    <BackTop></BackTop>
    <SurveyCreator></SurveyCreator>
  </Layout>
);

export default withAuthenticationRequired(CreateSurveyPage);
