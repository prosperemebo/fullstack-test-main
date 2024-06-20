import React from 'react';
import { Button, Card, Row } from 'antd';
import { EntryType } from '../../../helpers/EntriesContext';

const Entry = ({ entry }) => {
  const sign = entry.type === EntryType.Income ? '+' : '-';
  const textColor = entry.type === EntryType.Income ? 'text-green-600' : 'text-red-600';
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
