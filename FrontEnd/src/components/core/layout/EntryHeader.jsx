import { Button, Row, Typography } from 'antd';

const { Text } = Typography;

const EntryHeader = () => (
  <Row className="mb-6 flex items-center justify-between" wrap={false} align="top">
    <Text className="m-0 truncate text-xl font-normal leading-none">Entries</Text>
    <Button type="primary" size="large">
      Add Entry
    </Button>
  </Row>
);
export default EntryHeader;
