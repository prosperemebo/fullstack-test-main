import React, { useState } from 'react';
import { Button, Card, Modal, Row } from 'antd';
import useEntriesContext, { EntryType } from '../../../helpers/EntriesContext';

const Entry = ({ entry, onEdit }) => {
  const { deleteEntry } = useEntriesContext();
  const sign = entry.type === EntryType.Income ? '+' : '-';
  const textColor = entry.type === EntryType.Income ? 'text-green-600' : 'text-red-600';
  const date = new Date(entry.date).toDateString();

  const [isDeleting, setIsDeleting] = useState(false);

  const editEntry = () => onEdit(entry);

  const deleteEntryHandler = () => {
    Modal.confirm({
      title: 'Delete Entry?',
      content: 'Are you sure you want to delete this entry? This action cannot be reversed!',
      okText: 'Delete Permanentely',
      okButtonProps: { danger: true },
      onOk: async () => {
        setIsDeleting(true);

        await deleteEntry(entry._id);

        setIsDeleting(false);
      }
    });
  };

  return (
    <Card bordered={false} className="height-auto mb-4">
      {entry.type === EntryType.Expense ? (
        <p className="text-sm font-semibold uppercase text-slate-400">
          {entry.category ? entry.category.name : 'Uncategorized'}
        </p>
      ) : null}
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
        <Button type="link" onClick={editEntry}>
          Edit
        </Button>
        <Button type="link" danger loading={isDeleting} onClick={deleteEntryHandler}>
          Delete
        </Button>
      </Row>
    </Card>
  );
};

export default Entry;
