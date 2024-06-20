import { Form, Modal, Radio, Input, Button, Select } from 'antd';
import { useState } from 'react';

const NewEntryModal = ({ isOpen, handleCancel }) => {
  const [form] = Form.useForm();
  const [entryType, setEntryType] = useState('expense');

  const onEntryTypeChange = ({ type }) => {
    setEntryType(type);
  };

  return (
    <Modal open={isOpen} title="Add Entry" onCancel={handleCancel}>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          type: entryType
        }}
        onValuesChange={onEntryTypeChange}
      >
        <Form.Item label="Entry Type" name="type">
          <Radio.Group value={entryType}>
            <Radio.Button value="expense">Expense</Radio.Button>
            <Radio.Button value="income">Income</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Amount">
          <Input placeholder="3000" type="number" />
        </Form.Item>
        <Form.Item label="Description">
          <Input placeholder="New iPhone" />
        </Form.Item>
        {entryType === 'expense' && (
          <Form.Item label="Category">
            <Select
              value="null"
              options={[
                { value: 'null', label: <span>Select Category</span> },
                { value: '12345', label: <span>Food</span> },
                { value: '12345', label: <span>Transport</span> },
                { value: '12345', label: <span>Food</span> }
              ]}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default NewEntryModal;
