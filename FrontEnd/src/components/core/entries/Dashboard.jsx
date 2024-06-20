import { Col, Row } from 'antd';
import React from 'react';
import useEntriesContext, { ViewState } from '../../../helpers/EntriesContext';
import ContentPanel from '../layout/ContentPanel';
import Stats from './Stats';
import EntriesList from './EntriesList';

const Dashboard = () => {
  const entriesContext = useEntriesContext();

  return (
    <ContentPanel title="Fullstack Test" loading={entriesContext.viewState === ViewState.loading}>
      <Row gutter="16">
        <Col span={14}>
          <EntriesList />
        </Col>
        <Col span={10}>
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
