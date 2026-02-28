import { formatTime } from '../../utils/formatTime';

export default function DataTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <section className="data-table">
        <h2 className="data-table__heading">Telemetry Data</h2>
        <p className="data-table__empty">No data available.</p>
      </section>
    );
  }

  return (
    <section className="data-table">
      <h2 className="data-table__heading">Telemetry Data</h2>
      <div className="data-table__wrapper">
        <table className="data-table__table">
          <thead>
            <tr>
              <th>Time</th>
              <th>SoC (%)</th>
              <th>SoH (%)</th>
              <th>Voltage (V)</th>
              <th>Current (A)</th>
              <th>Charge Cycle</th>
              <th>Temp (°C)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.time ?? i}>
                <td>{formatTime(row.time)}</td>
                <td>{row.soc != null ? row.soc : '—'}</td>
                <td>{row.soh != null ? row.soh : '—'}</td>
                <td>{row.battery_voltage != null ? row.battery_voltage.toFixed(2) : '—'}</td>
                <td>{row.current != null ? row.current : '—'}</td>
                <td>{row.charge_cycle != null ? row.charge_cycle : '—'}</td>
                <td>{row.battery_temp != null ? row.battery_temp : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
