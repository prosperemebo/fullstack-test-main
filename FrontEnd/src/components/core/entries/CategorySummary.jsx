import { Button, Card, Flex, Progress, Row } from 'antd';
import { useState } from 'react';
import NewCategoryModal from './NewCategoryModal';

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
        <div className="mb-8">
          <Flex justify="space-between" className="mb-2">
            <p className="mb-0 text-lg font-semibold">Food (3) </p>
            <p className="mb-0">
              <span className="text-lg font-semibold">300 USD</span> Left
            </p>
          </Flex>
          <Progress percent={30} />
        </div>
        <div className="mb-0">
        {categoriesStats.map(category => (
          <div className="mb-8">
            <Flex justify="space-between" className="mb-2">
              <p className="mb-0 text-lg font-semibold">Food (3) </p>
              <p className="mb-0">
                <span className="text-lg font-semibold">300 USD</span>
              </p>
            </Flex>
            <Progress percent={30} />
            <Row className="mt-2">
              <Button type="link">Edit</Button>
              <Button type="link" danger>
                Delete
              </Button>
            </Row>
          </div>
        ))}
      </Card>
      <NewCategoryModal isOpen={isModalOpen} handleCancel={toggleModalHandler} />
    </>
  );
};

export default CategorySummary;
