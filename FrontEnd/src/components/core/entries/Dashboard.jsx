import { Col, Row } from 'antd';
import React from 'react';
import useEntriesContext, { ViewState } from '../../../helpers/EntriesContext';
import ContentPanel from '../layout/ContentPanel';
import EntryHeader from '../layout/EntryHeader';
import Entry from './Entry';
import Stats from './Stats';

const Dashboard = () => {
  const entriesContext = useEntriesContext();

  return (
    <ContentPanel title="Fullstack Test" loading={entriesContext.viewState === ViewState.loading}>
      <Row gutter="16">
        <Col span={16}>
          <EntryHeader />
          {entriesContext.entries.map(entry => (
            <Entry key={entry._id} entry={entry} />
          ))}
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

export default Dashboard;
