import React, { FunctionComponent } from "react";
import { Form, Input, Button } from "antd";
import { FormListFieldData } from "antd/lib/form/FormList";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  questionField: FormListFieldData;
}

const ChoiceCreator: FunctionComponent<Props> = ({ questionField }) => {
  return (
    <Form.List name={[questionField.name, "choices"]}>
      {(fields, { add: addChoice, remove: removeChoice }) => (
        <>
          {fields.map((field) => (
            <div key={field.key}>
              <Form.Item
                {...field}
                name={[field.name, "text"]}
                fieldKey={[field.fieldKey, "text"]}
                label={`Choice ${field.key + 1}`}
                rules={[{ required: true, message: "Missing choice" }]}
              >
                <Input placeholder="Choice" maxLength={100} />
              </Form.Item>
            </div>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => addChoice()}
              block
              icon={<PlusOutlined />}
            >
              Add choice
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default ChoiceCreator;
