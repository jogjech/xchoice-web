import React, { FunctionComponent, useState } from "react";
import { Card, Statistic, Tag } from "antd";
import { useRouter } from "next/router";
import { SurveyMetadata } from "../../models/survey";
import { FileTextOutlined } from "@ant-design/icons";
import styles from "./SurveyCard.module.css";

interface Props {
  surveyMetadata: SurveyMetadata;
}

const SurveyCard: FunctionComponent<Props> = ({ surveyMetadata }) => {
  const router = useRouter();

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
              fontSize: "1.4rem",
              backgroundColor: "rgba(26, 119, 213, 0.6)",
            }}
            onClick={() => {
              router.push(`/survey/${surveyMetadata.surveyId}`);
            }}
          >
            <div>
              <Statistic
                title="Responses"
                value={surveyMetadata.responses}
                prefix={<FileTextOutlined />}
              />
              {surveyMetadata.published ? (
                <Tag color="green">published</Tag>
              ) : (
                <Tag color="orange">unpublished</Tag>
              )}
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
