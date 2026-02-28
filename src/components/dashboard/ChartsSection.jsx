import SocChart from '../charts/SocChart';
import VoltageChart from '../charts/VoltageChart';
import CurrentChart from '../charts/CurrentChart';
import TemperatureChart from '../charts/TemperatureChart';

export default function ChartsSection({ data }) {
  return (
    <section className="charts-section">
      <h2 className="charts-section__heading">Charts</h2>
      <div className="charts-section__grid">
        <SocChart data={data} />
        <VoltageChart data={data} />
        <CurrentChart data={data} />
        <TemperatureChart data={data} />
      </div>
    </section>
  );
}
