import { Card } from 'antd';
import React from 'react';

const Entry = () => (
  <Card bordered={false} className="height-auto mb-4">
    <h1 className="text-2xl font-bold">
      <span className="text-green-600">+300 USD</span>
    </h1>
    <p className="text-lg font-semibold">3rd Mon, 2024 &nbsp; &#x2022; &nbsp; Pizza Night </p>
  </Card>
);

export default Entry;
