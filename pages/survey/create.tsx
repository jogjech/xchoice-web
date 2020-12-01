import React, { FunctionComponent } from "react";
import Layout from "../../components/layout/Layout";
import SurveyCreator from "../../components/survey/SurveyCreator";
import { BackTop } from "antd";

interface Props {}

const CreateSurveyPage: FunctionComponent<Props> = () => (
  <Layout title="Create Survey" requiredAuth>
    <BackTop></BackTop>
    <SurveyCreator></SurveyCreator>
  </Layout>
);

export default CreateSurveyPage;
