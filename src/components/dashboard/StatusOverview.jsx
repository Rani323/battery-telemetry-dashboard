import StatusCard from '../common/StatusCard';

export default function StatusOverview({ stats }) {
  if (!stats) return null;

  return (
    <section className="status-overview">
      <h2 className="status-overview__heading">Status Overview</h2>
      <div className="status-overview__grid">
        <StatusCard title="Latest SoC" value={stats.latestSoc} unit="%" />
        <StatusCard title="Average SoC" value={stats.averageSoc} unit="%" />
        <StatusCard title="Peak Voltage" value={stats.peakVoltage != null ? stats.peakVoltage.toFixed(2) : null} unit=" V" />
        <StatusCard title="Min Voltage" value={stats.minVoltage != null ? stats.minVoltage.toFixed(2) : null} unit=" V" />
        <StatusCard title="Peak Current" value={stats.peakCurrent != null ? stats.peakCurrent.toFixed(2) : null} unit=" A" />
        <StatusCard title="Avg Temperature" value={stats.averageTemp} unit=" °C" />
      </div>
    </section>
  );
}
