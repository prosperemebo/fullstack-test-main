import { Form, Modal, Radio, Input, Select, Button } from 'antd';
import { useMemo, useState } from 'react';
import useEntriesContext, { EntryType } from '../../../helpers/EntriesContext';

const NewEntryModal = ({ isOpen, handleCancel, updateEntry }) => {
  const { categoriesStats, addEntry } = useEntriesContext();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [entryType, setEntryType] = useState(EntryType.Expense);

  const onFormValueChange = ({ type }) => {
    if (type) setEntryType(type);
  };

  const handleOk = async () => {
    setLoading(true);
    const values = await form.validateFields();

    const entry = {
      type: values.type,
      amount: values.amount,
      description: values.description
    };

    if (values.type === EntryType.Expense) {
      entry.category = values.category;
    } else {
      entry.category = null;
    }

    await addEntry(entry);
    setLoading(false);
    form.resetFields();
    handleCancel();
  };

  const categoryOptions = useMemo(() => {
    const defaultOption = { value: 'null', label: <span>Select Category</span> };
    const options = categoriesStats.map(category => ({
      value: category._id,
      label: <span>{category.name}</span>
    }));

    return [defaultOption, ...options];
  }, [categoriesStats]);

  return (
    <Modal
      open={isOpen}
      title="Add Entry"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="link" type="primary" loading={loading} onClick={handleOk}>
          Add
        </Button>
      ]}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          type: entryType
        }}
        onValuesChange={onFormValueChange}
      >
        <Form.Item label="Entry Type" name="type">
          <Radio.Group value={entryType}>
            <Radio.Button value={EntryType.Expense}>Expense</Radio.Button>
            <Radio.Button value={EntryType.Income}>Income</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <Input placeholder="3000" type="number" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="New iPhone" />
        </Form.Item>
        {entryType === EntryType.Expense && (
          <Form.Item label="Category" name="category">
            <Select options={categoryOptions} placeholder="Select Category" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default NewEntryModal;
