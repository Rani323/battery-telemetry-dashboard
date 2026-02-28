import { useBatteryData } from './hooks/useBatteryData';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import StatusOverview from './components/dashboard/StatusOverview';
import ChartsSection from './components/dashboard/ChartsSection';
import DataTable from './components/dashboard/DataTable';
import './styles/global.css';

export default function App() {
  const { data, stats, loading, error, refetch } = useBatteryData();

  if (loading) {
    return (
      <div className="app">
        <header className="app__header">
          <h1>Battery Telemetry Dashboard</h1>
        </header>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <header className="app__header">
          <h1>Battery Telemetry Dashboard</h1>
        </header>
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Battery Telemetry Dashboard</h1>
      </header>
      <StatusOverview stats={stats} />
      <ChartsSection data={data} />
      <DataTable data={data} />
    </div>
  );
}
