import { Form, Modal, Radio, Input, Select, Button } from 'antd';
import { useMemo, useState } from 'react';
import useEntriesContext, { EntryType } from '../../../helpers/EntriesContext';

const NewEntryModal = ({ isOpen, handleCancel }) => {
  const { categoriesStats, addEntry } = useEntriesContext();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [entryType, setEntryType] = useState(EntryType.Expense);
  const [selectedCategory, setSelectedCategory] = useState('null');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const onEntryTypeChange = formData => {
    if (formData.type) setEntryType(formData.type);

    if (formData.amount) setAmount(formData.amount);

    if (formData.description) setDescription(formData.description);

    if (formData.category) setSelectedCategory(formData.category);
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
      entry.category = selectedCategory;
    }

    await addEntry(entry);
    setLoading(false);
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
        onValuesChange={onEntryTypeChange}
      >
        <Form.Item label="Entry Type" name="type">
          <Radio.Group value={entryType}>
            <Radio.Button value={EntryType.Expense}>Expense</Radio.Button>
            <Radio.Button value={EntryType.Income}>Income</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <Input placeholder="3000" type="number" value={amount} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="New iPhone" value={description} />
        </Form.Item>
        {entryType === 'expense' && (
          <Form.Item label="Category" name="category">
            <Select value={selectedCategory} options={categoryOptions} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default NewEntryModal;
