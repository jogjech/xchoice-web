import React, { FunctionComponent } from "react";
import Layout from "../../../components/layout/Layout";
import SurveyViewer from "../../../components/survey/SurveyViewer";
import { BackTop } from "antd";
import { useRouter } from "next/router";

interface Props {}

const ViewResponsePage: FunctionComponent<Props> = () => {
  const router = useRouter();
  const responseSlug = router.query.slug;
  return (
    <Layout title="View Response">
      <BackTop></BackTop>
      {responseSlug && (
        <SurveyViewer slug={responseSlug as string}></SurveyViewer>
      )}
    </Layout>
  );
};

export default ViewResponsePage;
