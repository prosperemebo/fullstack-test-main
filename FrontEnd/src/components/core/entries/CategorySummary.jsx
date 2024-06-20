import { Button, Card, Flex, Modal, Progress, Row } from 'antd';
import { useState } from 'react';
import NewCategoryModal from './NewCategoryModal';
import useEntriesContext from '../../../helpers/EntriesContext';

const CategorySummary = () => {
  const { categoriesStats, deleteCategory } = useEntriesContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleModalHandler = () => {
    setSelectedCategory(null);
    setIsModalOpen(state => !state);
  };

  const editCategory = category => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card
        bordered={false}
        className="height-auto mb-4"
        title="Budgets"
        extra={
          <Button type="primary" onClick={toggleModalHandler}>
            New Budget
          </Button>
        }
      >
        {categoriesStats.map(category => (
          <Category category={category} key={category._id} onEdit={editCategory} />
        ))}
      </Card>
      <NewCategoryModal isOpen={isModalOpen} handleCancel={toggleModalHandler} updateCategory={selectedCategory} />
    </>
  );
};

const Category = ({ category, onEdit }) => {
  const { deleteCategory } = useEntriesContext();
  const textColor = category.balance <= 0 ? 'text-red-600' : '';
  const percent = Math.max(0, (category.balance / category.budget) * 100);
  const progressStatus = category.balance <= 0 ? 'exception' : 'normal';

  const [isDeleting, setIsDeleting] = useState(false);

  const editCategory = () => onEdit(category);

  const deleteCategoryHandler = () => {
    Modal.confirm({
      title: `Delete ${category.name}?`,
      content: 'Are you sure you want to delete this category? This action cannot be reversed!',
      okText: 'Delete Permanentely',
      okButtonProps: { danger: true },
      onOk: async () => {
        setIsDeleting(true);

        await deleteCategory(category._id);

        setIsDeleting(false);
      }
    });
  };

  return (
    <div className="mb-8" key={category._id}>
      <Flex justify="space-between" className="mb-2">
        <p className={'mb-0 text-lg font-semibold ' + textColor}>
          {category.name} ({category.count})
        </p>
        <p className={'mb-0 ' + textColor}>
          <span className="text-lg font-semibold">{category.balance} USD left</span>
        </p>
      </Flex>
      <Progress percent={percent} status={progressStatus} />
      <Row className="mt-2">
        <Button type="link" onClick={editCategory}>
          Edit
        </Button>
        <Button type="link" danger loading={isDeleting} onClick={deleteCategoryHandler}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

export default CategorySummary;
