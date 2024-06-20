import React from 'react';
import { Card, Col, Row } from 'antd';
import useEntriesContext from '../../../helpers/EntriesContext';

const EntrySummary = () => {
  const { entriesStats } = useEntriesContext();

  const incomeText = `Income (${entriesStats?.income?.count || 0})`;
  const expenseText = `Expenses (${entriesStats?.expense?.count || 0})`;

  return (
    <Row gutter={16} className="mb-4">
      <Col span={12}>
        <Card title={incomeText} bordered={false}>
          <h1 className="text-2xl font-bold">{entriesStats?.income?.totalAmount || 0} USD</h1>
        </Card>
      </Col>
      <Col span={12}>
        <Card title={expenseText} bordered={false}>
          <h1 className="text-2xl font-bold">{entriesStats?.expense?.totalAmount || 0} USD</h1>
        </Card>
      </Col>
    </Row>
  );
};

export default EntrySummary;
