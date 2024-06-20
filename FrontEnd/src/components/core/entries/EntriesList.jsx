import { Button, Row, Typography } from 'antd';
import { useState } from 'react';
import NewEntryModal from './NewEntryModal';
import Entry from './Entry';
import useEntriesContext from '../../../helpers/EntriesContext';

const { Text } = Typography;

const EntriesList = () => {
  const { entries } = useEntriesContext();
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const toggleEntryModalHandler = () => {
    setSelectedEntry(null);
    setIsEntryModalOpen(state => !state);
  };

  const editEntry = entry => {
    setSelectedEntry(entry);
    setIsEntryModalOpen(true);
  };

  return (
    <>
      <Row className="mb-6 flex items-center justify-between" wrap={false} align="top">
        <Text className="m-0 truncate text-xl font-normal leading-none">Income and Expenses Entries</Text>
        <Button type="primary" size="large" onClick={toggleEntryModalHandler}>
          Add Entry
        </Button>
      </Row>
      {entries.map(entry => (
        <Entry key={entry._id} entry={entry} onEdit={editEntry} />
      ))}
      <NewEntryModal isOpen={isEntryModalOpen} handleCancel={toggleEntryModalHandler} updateEntry={selectedEntry} />
    </>
  );
};

export default EntriesList;
