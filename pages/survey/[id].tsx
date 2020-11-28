import React, { FunctionComponent } from "react";
import Layout from "../../components/layout/Layout";
import SurveyViewer from "../../components/survey/SurveyViewer";
import { BackTop } from "antd";
import { useRouter } from "next/router";

interface Props {}

const ViewSurveyPage: FunctionComponent<Props> = () => {
  const router = useRouter();
  const surveyId = router.query.id;

  return (
    <Layout title="View Survey">
      <BackTop></BackTop>
      {surveyId && <SurveyViewer surveyId={surveyId as string}></SurveyViewer>}
    </Layout>
  );
};

export default ViewSurveyPage;
