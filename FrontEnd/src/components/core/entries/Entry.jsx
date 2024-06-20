import { Button, Card, Row } from 'antd';
import React from 'react';

export const EntryTypes = {
  Income: 'income',
  Expense: 'expense'
};

const Entry = ({ entry }) => {
  const sign = entry.type === EntryTypes.Income ? '+' : '-';
  const textColor = entry.type === EntryTypes.Income ? 'text-green-600' : 'text-red-600';
  const date = new Date(entry.date).toDateString();

  return (
    <Card bordered={false} className="height-auto mb-4">
      <h1 className="text-2xl font-bold">
        <span className={textColor}>
          {sign}
          {entry.amount} USD
        </span>
      </h1>
      <p className="text-lg font-semibold">
        {date} &nbsp; &#x2022; &nbsp; {entry.description}
      </p>
      <Row className="mt-2">
        <Button type="link">Edit</Button>
        <Button type="link" danger>
          Delete
        </Button>
      </Row>
    </Card>
  );
};

export default Entry;
