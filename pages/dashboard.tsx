import React, { FunctionComponent, useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import SurveyCard from "../components/survey/SurveyCard";
import { findSurveys } from "../apis/survey";
import Link from "next/link";
import { Col, Row, Button, Alert } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { SurveyMetadata } from "../models/survey";
import styles from "./dashboard.module.css";

interface Props {}

const Dashboard: FunctionComponent<Props> = () => {
  const [surveyMetatdataList, setSurveyMetatdataList] = useState<
    SurveyMetadata[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>(undefined);

  const userId = "33"; // TODO: Update the logic to read current user id instead of hardcoding it

  useEffect(() => {
    const fetchSurveys = async () => {
      const result = await findSurveys(userId);

      if (result.isError) {
        setErrorMessage(result.error.message);
      } else {
        setSurveyMetatdataList(result.surveyMetadataList);
      }
      setLoading(false);
    };
    fetchSurveys();
  }, []);

  return (
    <div>
      <Layout title="My Surveys">
        <div>
          <p className="title">My Surveys</p>
        </div>
        {loading ? (
          <div>
            <SurveyCard surveyMetadata={null}></SurveyCard>
          </div>
        ) : errorMessage ? (
          <Alert
            message="Failed to load surveys. Please refresh to try again."
            type="error"
          ></Alert>
        ) : (
          <div>
            <Row gutter={16}>
              {surveyMetatdataList.map((surveyMetatdata) => (
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
        )}
      </Layout>
    </div>
  );
};

export default Dashboard;
