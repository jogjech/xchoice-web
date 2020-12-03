import React, { FunctionComponent, useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import SurveyCard from "../components/survey/SurveyCard";
import { findSurveys } from "../apis/survey";
import Link from "next/link";
import { Col, Row, Button, Alert } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { SurveyMetadata, SurveyStatus } from "../models/survey";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import styles from "./dashboard.module.css";

interface Props {}

const Dashboard: FunctionComponent<Props> = () => {
  const { getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  const [surveyMetatdataList, setSurveyMetatdataList] = useState<
    SurveyMetadata[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>(undefined);

  useEffect(() => {
    const fetchSurveys = async () => {
      const accessToken = await getAccessTokenSilently();

      const result = await findSurveys(accessToken);

      if (result.isError) {
        setErrorMessage(result.error.message);
      } else {
        console.log(result);
        setSurveyMetatdataList(result.surveyMetadataList);
      }
      setLoading(false);
    };
    fetchSurveys();
  }, []);

  const closeBanner = () => {
    window.history.replaceState({}, "My Surveys", router.asPath.split("?")[0]);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div>
          <SurveyCard surveyMetadata={null}></SurveyCard>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <Alert
          message="Failed to load surveys. Please refresh to try again."
          type="error"
        ></Alert>
      );
    }

    return (
      <div>
        {router.query.surveyDeleted && (
          <Alert
            message={`Sucessfully deleted survey ${
              router.query.deletedSurveyTitle || ""
            }`}
            type="success"
            style={{ marginBottom: "1.3rem" }}
            closable
            onClose={closeBanner}
          ></Alert>
        )}
        <Row gutter={16}>
          {surveyMetatdataList
            .filter(
              (surveyMetatdata) =>
                surveyMetatdata &&
                (surveyMetatdata.status === SurveyStatus.PUBLISHED ||
                  surveyMetatdata.status === SurveyStatus.DRAFT ||
                  surveyMetatdata.status === SurveyStatus.UNPUBLISHED)
            )
            .map((surveyMetatdata) => (
              <Col span={8} key={surveyMetatdata.surveyId}>
                <SurveyCard surveyMetadata={surveyMetatdata}></SurveyCard>
              </Col>
            ))}
          <Col span={8} key="createNew">
            <Link href="/survey/create">
              <Button type="dashed" className={styles.createNewCard}>
                <div>
                  <PlusSquareOutlined></PlusSquareOutlined> Create New
                </div>
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <Layout title="My Surveys">
        <div>
          <p className="title">My Surveys</p>
        </div>
        {renderContent()}
      </Layout>
    </div>
  );
};

export default withAuthenticationRequired(Dashboard);
