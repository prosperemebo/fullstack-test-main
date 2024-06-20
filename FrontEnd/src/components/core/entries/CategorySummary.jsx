import { Card, Flex, Progress } from 'antd';

const CategorySummary = () => (
  <Card bordered={false} className="height-auto mb-4" title="Categories">
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
      <Flex justify="space-between" className="mb-2">
        <p className="mb-0 text-lg font-semibold">Food (3) </p>
        <p className="mb-0">
          <span className="text-lg font-semibold">300 USD</span> Left
        </p>
      </Flex>
      <Progress percent={30} />
    </div>
  </Card>
);

export default CategorySummary;
