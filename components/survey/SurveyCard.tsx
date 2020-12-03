import React, { FunctionComponent, useState } from "react";
import { Card, Statistic, Tag } from "antd";
import { useRouter } from "next/router";
import { SurveyMetadata, SurveyStatus } from "../../models/survey";
import { FileTextOutlined } from "@ant-design/icons";
import styles from "./SurveyCard.module.css";

interface Props {
  surveyMetadata: SurveyMetadata;
}

const SurveyCard: FunctionComponent<Props> = ({ surveyMetadata }) => {
  const router = useRouter();

  const renderTag = () => {
    switch (surveyMetadata.status) {
      case SurveyStatus.PUBLISHED:
        return <Tag color="green">published</Tag>;
      case SurveyStatus.UNPUBLISHED:
        return <Tag color="orange">unpublished</Tag>;
      case SurveyStatus.DRAFT:
        return <Tag color="default">draft</Tag>;
    }
    return null;
  };

  return (
    <>
      {!!surveyMetadata ? (
        <div>
          <Card
            title={surveyMetadata.title}
            hoverable
            bordered
            className={styles.surveyCard}
            headStyle={{
              fontSize: "1.3rem",
              backgroundColor: "rgba(26, 119, 213, 0.6)",
            }}
            onClick={() => {
              router.push(`/dashboard/survey?id=${surveyMetadata.surveyId}`);
            }}
          >
            <div>
              <Statistic
                title="Responses"
                value={surveyMetadata.responses}
                prefix={<FileTextOutlined />}
              />
              {renderTag()}
            </div>
          </Card>
        </div>
      ) : (
        <div>
          <Card loading bordered className={styles.surveyCard}>
            <div></div>
          </Card>
        </div>
      )}
    </>
  );
};

export default SurveyCard;
