import { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import NewEntryModal from '../entries/NewEntryModal';

const { Text } = Typography;

const EntryHeader = () => {
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);

  const toggleEntryModalHandler = () => setIsEntryModalOpen(state => !state);

  return (
    <>
      <Row className="mb-6 flex items-center justify-between" wrap={false} align="top">
        <Text className="m-0 truncate text-xl font-normal leading-none">Entries</Text>
        <Button type="primary" size="large" onClick={toggleEntryModalHandler}>
          Add Entry
        </Button>
      </Row>
      <NewEntryModal isOpen={isEntryModalOpen} handleCancel={toggleEntryModalHandler} />
    </>
  );
};
export default EntryHeader;
