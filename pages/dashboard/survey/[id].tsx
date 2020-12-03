import React, { FunctionComponent, useState, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import {
  Tabs,
  Breadcrumb,
  BackTop,
  Row,
  Col,
  Button,
  Alert,
  Tooltip,
} from "antd";
import { Survey, SurveyStatus } from "../../../models/survey";
import { getSurvey, updateSurveyStatus } from "../../../apis/survey";
import SurveyViewer from "../../../components/survey/SurveyViewer";
import ReportViewer from "../../../components/survey/report/ReportViewer";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const { TabPane } = Tabs;

interface Props {}

const ManageSurveyPage: FunctionComponent<Props> = () => {
  const { getAccessTokenSilently } = useAuth0();

  const router = useRouter();
  const surveyId = router.query.id as string;

  const [loading, setLoading] = useState(true);
  const [loadingActions, setLoadingActions] = useState(true);
  const [newStatus, setNewStatue] = useState<SurveyStatus>(undefined);
  const [postError, setPostError] = useState<string>(undefined);
  const [publishing, setPublishing] = useState(false);
  const [unpublishing, setUnpublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [survey, setSurvey] = useState<Survey>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>(undefined);

  useEffect(() => {
    let isMounted = true;
    if (router.asPath !== router.route) {
      // In case of deleting, it doesn't make sense to fetch page again.
      if (deleting) {
        return;
      }
      const fetchSurvey = async () => {
        const accessToken = await getAccessTokenSilently();
        const result = await getSurvey(surveyId, accessToken);

        if (result.isError) {
          if (isMounted) setErrorMessage(result.error.message);
        } else {
          if (isMounted) setSurvey(result.survey);
        }

        if (isMounted) setLoading(false);
        if (isMounted) setLoadingActions(false);
      };
      fetchSurvey();
    }
    return () => {
      isMounted = false;
    };
  }, [router]);

  const updateStatus = (targetStatus: SurveyStatus) => async () => {
    setNewStatue(undefined);
    setPostError(undefined);
    if (targetStatus === SurveyStatus.PUBLISHED) {
      setPublishing(true);
    } else if (targetStatus === SurveyStatus.UNPUBLISHED) {
      setUnpublishing(true);
    } else if (targetStatus === SurveyStatus.DELETED) {
      setDeleting(true);
    }
    const accessToken = await getAccessTokenSilently();
    console.log(router);
    const result = await updateSurveyStatus(
      surveyId,
      targetStatus,
      accessToken
    );
    if (result.isError) {
      setPostError(result.error.message);
      setPublishing(false);
      setUnpublishing(false);
      setDeleting(false);
    } else {
      setPublishing(false);
      setUnpublishing(false);
      setLoadingActions(true);

      if (targetStatus === SurveyStatus.DELETED) {
        router.push(
          `/dashboard?surveyDeleted=true&deletedSurveyTitle=${survey.surveyTitle}`
        );
        return;
      }

      setDeleting(false);
      setNewStatue(SurveyStatus[targetStatus]);
      router.replace(router.asPath);
    }
  };

  const renderTakeSurveyButton = () => {
    if (survey.status !== SurveyStatus.PUBLISHED || loadingActions) {
      return;
    }
    return (
      <Link href={`/survey/${surveyId}`}>
        <Tooltip
          placement="topLeft"
          title="Take the survey as a participant. You'll be redirected to take the survey."
          arrowPointAtCenter
        >
          <Button style={{ marginRight: "0.8rem" }}>Take the survey</Button>
        </Tooltip>
      </Link>
    );
  };

  const renderActionButton = () => {
    if (survey.status == null || loadingActions) {
      return;
    }

    switch (survey.status) {
      case SurveyStatus.PUBLISHED:
        return (
          <Button
            danger
            loading={unpublishing}
            onClick={updateStatus(SurveyStatus.UNPUBLISHED)}
          >
            Unpublish
          </Button>
        );
      case SurveyStatus.UNPUBLISHED:
        return (
          <>
            <Button
              style={{ marginRight: "0.8rem" }}
              type="primary"
              loading={publishing}
              onClick={updateStatus(SurveyStatus.PUBLISHED)}
            >
              Publish
            </Button>
            <Button
              danger
              loading={deleting}
              onClick={updateStatus(SurveyStatus.DELETED)}
            >
              Delete
            </Button>
          </>
        );
    }
  };

  const renderBanner = () => {
    if (!!postError) {
      return (
        <Alert
          message="Failed to perform the update. Please try again later."
          type="error"
          style={{ margin: "1rem 0 0.8rem 0" }}
        ></Alert>
      );
    }
    if (newStatus == null) return;

    let bannerText: string;
    switch (newStatus) {
      case SurveyStatus.PUBLISHED:
        bannerText =
          "Your survey is published! Collecting responses. Come back and check response report later.";
        break;
      case SurveyStatus.UNPUBLISHED:
        bannerText =
          "Your survey is unpublished. Response collection is paused.";
        break;
    }

    if (bannerText == null) return;

    return (
      <Alert
        message={bannerText}
        type="success"
        style={{ margin: "1rem 0 0.8rem 0" }}
      ></Alert>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <div></div>;
    }

    if (!!errorMessage) {
      return (
        <Alert
          message="Failed to load page. Please refresh to try again."
          type="error"
        ></Alert>
      );
    }

    if (survey) {
      return (
        <>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/dashboard">Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{survey.surveyTitle}</Breadcrumb.Item>
          </Breadcrumb>
          {renderBanner()}
          <Row justify="space-between" align="bottom">
            <Col>
              <p className="secondary-title">{survey.surveyTitle}</p>
            </Col>
            <Col style={{ float: "right" }}>
              {renderTakeSurveyButton()}
              {renderActionButton()}
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" centered style={{ paddingTop: "1.5rem" }}>
            <TabPane tab="Questions" key="1">
              <BackTop></BackTop>
              <SurveyViewer surveyId={surveyId} preview></SurveyViewer>
            </TabPane>
            <TabPane tab="Responses Report" key="2">
              <BackTop></BackTop>
              <ReportViewer surveyId={surveyId}></ReportViewer>
            </TabPane>
          </Tabs>
        </>
      );
    }
  };

  return (
    <>
      <Layout title="Manage Survey">{renderContent()}</Layout>
    </>
  );
};

export default withAuthenticationRequired(ManageSurveyPage);
