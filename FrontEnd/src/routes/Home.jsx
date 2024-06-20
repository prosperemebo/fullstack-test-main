import Dashboard from '../components/core/entries/Dashboard';
import { EntriesProvider } from '../helpers/EntriesContext';

const Home = () => (
  <EntriesProvider>
    <Dashboard />
  </EntriesProvider>
);
export default Home;
