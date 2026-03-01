import StatusCard from '../common/StatusCard';
import iconLatestSoc from '../../assets/images/battery_latest_soc.svg';
import iconAverageSoc from '../../assets/images/average_soc_chart.svg';
import iconPeakVoltage from '../../assets/images/peak_voltage_lightning.svg';
import iconMinVoltage from '../../assets/images/min_voltage_low.svg';
import iconPeakCurrent from '../../assets/images/peak_current_flow.svg';
import iconAvgTemp from '../../assets/images/avg_temperature_thermometer.svg';

const CARD_CONFIG = [
  { title: 'Latest SoC', valueKey: 'latestSoc', unit: '%', icon: iconLatestSoc },
  { title: 'SoH', valueKey: 'latestSoh', unit: '%', icon: iconAverageSoc },
  { title: 'Average SoC', valueKey: 'averageSoc', unit: '%', icon: iconAverageSoc },
  { title: 'Charge Cycle', valueKey: 'chargeCycle', unit: '', icon: iconPeakVoltage },
  { title: 'Peak Voltage', valueKey: 'peakVoltage', unit: ' V', format: (v) => v != null ? v.toFixed(2) : null, icon: iconPeakVoltage },
  { title: 'Min Voltage', valueKey: 'minVoltage', unit: ' V', format: (v) => v != null ? v.toFixed(2) : null, icon: iconMinVoltage },
  { title: 'Peak Current', valueKey: 'peakCurrent', unit: ' A', format: (v) => v != null ? v.toFixed(2) : null, icon: iconPeakCurrent },
  { title: 'Avg Temperature', valueKey: 'averageTemp', unit: ' °C', icon: iconAvgTemp },
];

export default function StatusOverview({ stats }) {
  if (!stats) return null;

  return (
    <section className="status-overview">
      <h2 className="status-overview__heading">Status Overview</h2>
      <div className="row charts_row" >
        {CARD_CONFIG.map(({ title, valueKey, unit, format, icon }) => (
          <div key={valueKey} className="col-md-2 resp-mb-20">
            <StatusCard
              title={title}
              value={format ? format(stats[valueKey]) : stats[valueKey]}
              unit={unit}
              icon={icon}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
