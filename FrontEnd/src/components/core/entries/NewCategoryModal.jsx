import { Form, Modal, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import useEntriesContext from '../../../helpers/EntriesContext';

const NewCategoryModal = ({ isOpen, handleCancel, updateCategory }) => {
  const { addCategory, editCategory } = useEntriesContext();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    setLoading(true);
    const values = await form.validateFields();

    const category = {
      name: values.name,
      budget: values.budget
    };

    if (updateCategory) {
      await editCategory(updateCategory._id, category);
    } else {
      await addCategory(category);
    }
    setLoading(false);
    form.resetFields();
    handleCancel();
  };

  useEffect(() => {
    form.setFieldsValue({ name: updateCategory?.name || '', budget: updateCategory?.budget || 0 });
  }, [updateCategory, form]);

  return (
    <Modal
      open={isOpen}
      title={updateCategory ? 'Edit Category' : 'New Category'}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="link" type="primary" loading={loading} onClick={handleOk}>
          {updateCategory ? 'Update' : 'Add'}
        </Button>
      ]}
    >
      <Form layout="vertical" form={form} key={updateCategory?._id}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Food" />
        </Form.Item>
        <Form.Item label="Budget" name="budget">
          <Input placeholder="30000" type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewCategoryModal;
