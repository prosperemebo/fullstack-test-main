import { useState } from 'react';
import { Col, Row } from 'antd';

import ContentPanel from '../components/core/layout/ContentPanel';
import EntryHeader from '../components/core/layout/EntryHeader';
import Stats from '../components/core/entries/Stats';
import Entry from '../components/core/entries/Entry';

const Home = () => {
  const [loading] = useState(false);

  return (
    <ContentPanel title="Fullstack Test" loading={loading}>
      <Row gutter="16">
        <Col span={16}>
          <EntryHeader />
          <Entry />
          <Entry />
          <Entry />
          <Entry />
          <Entry />
        </Col>
        <Col span={8}>
          <Stats />
        </Col>
      </Row>

      {/* <Result
        icon={<FontAwesomeIcon icon={faBook} size="4x" className="text-primary" />}
        title="Expense and Income Diary"
        subTitle="Create an application to track daily expenses and incomes. Users should be able
        to add, read, update, and delete expense and income entries."
      /> */}
    </ContentPanel>
  );
};

export default Home;
