import React, { useMemo } from 'react';
import { Card, Col, Row } from 'antd';
import useEntriesContext from '../../../helpers/EntriesContext';

const EntrySummary = () => {
  const { entriesStats } = useEntriesContext();

  const incomeAmount = entriesStats?.income?.totalAmount || 0;
  const expenseAmount = entriesStats?.expense?.totalAmount || 0;
  const balanceAmount = incomeAmount - expenseAmount;

  const incomeText = `Income (${entriesStats?.income?.count || 0})`;
  const expenseText = `Expenses (${entriesStats?.expense?.count || 0})`;

  const textColor = balanceAmount > 0 ? 'text-green-500' : 'text-red-500';
  const sign = balanceAmount > 0 ? '+' : '-';

  return (
    <Row gutter={16} className="mb-4">
      <Col span={8}>
        <Card title={incomeText} bordered={false}>
          <h1 className="text-2xl font-bold">{incomeAmount} USD</h1>
        </Card>
      </Col>
      <Col span={8}>
        <Card title={expenseText} bordered={false}>
          <h1 className="text-2xl font-bold">{expenseAmount} USD</h1>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Net Income" bordered={false}>
          <h1 className={'text-2xl font-bold ' + textColor}>
            {sign}
            {balanceAmount} USD
          </h1>
        </Card>
      </Col>
    </Row>
  );
};

export default EntrySummary;
