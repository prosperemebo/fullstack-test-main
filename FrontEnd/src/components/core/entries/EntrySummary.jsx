import { Card, Col, Row } from 'antd';
import React from 'react';

const EntrySummary = () => (
  <Row gutter={16} className="mb-4">
    <Col span={12}>
      <Card title="Income" bordered={false}>
        <h1 className="text-2xl font-bold">300 USD</h1>
      </Card>
    </Col>
    <Col span={12}>
      <Card title="Expenses" bordered={false}>
        <h1 className="text-2xl font-bold">300 USD</h1>
      </Card>
    </Col>
  </Row>
);

export default EntrySummary;
