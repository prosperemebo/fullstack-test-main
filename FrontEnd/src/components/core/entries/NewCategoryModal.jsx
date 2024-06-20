import { Form, Modal, Input } from 'antd';
import { useState } from 'react';

const NewCategoryModal = ({ isOpen, handleCancel }) => {
  const [form] = Form.useForm();
  const [entryType, setEntryType] = useState('expense');

  const onEntryTypeChange = ({ type }) => {
    setEntryType(type);
  };

  return (
    <Modal open={isOpen} title="New Category" onCancel={handleCancel}>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          type: entryType
        }}
        onValuesChange={onEntryTypeChange}
      >
        <Form.Item label="Name">
          <Input placeholder="Food" />
        </Form.Item>
        <Form.Item label="Budget">
          <Input placeholder="30000" type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewCategoryModal;
