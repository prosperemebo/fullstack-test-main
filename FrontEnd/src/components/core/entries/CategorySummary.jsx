import { Button, Card, Flex, Progress, Row } from 'antd';
import { useState } from 'react';
import NewCategoryModal from './NewCategoryModal';
import useEntriesContext from '../../../helpers/EntriesContext';

const CategorySummary = () => {
  const { categoriesStats } = useEntriesContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalHandler = () => setIsModalOpen(state => !state);

  return (
    <>
      <Card
        bordered={false}
        className="height-auto mb-4"
        title="Categories"
        extra={
          <Button type="primary" onClick={toggleModalHandler}>
            New Category
          </Button>
        }
      >
        {categoriesStats.map(category => (
          <Category category={category} key={category._id} />
        ))}
      </Card>
      <NewCategoryModal isOpen={isModalOpen} handleCancel={toggleModalHandler} />
    </>
  );
};

const Category = ({ category }) => {
  const textColor = category.balance <= 0 ? 'text-red-600' : '';
  const percent = Math.max(0, (category.balance / category.budget) * 100);
  const progressStatus = category.balance <= 0 ? 'exception' : 'normal';

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
        <Button type="link">Edit</Button>
        <Button type="link" danger>
          Delete
        </Button>
      </Row>
    </div>
  );
};

export default CategorySummary;
