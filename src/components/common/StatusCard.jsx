export default function StatusCard({ title, value, unit = '', variant = 'default' }) {
  return (
    <div className={`status-card status-card--${variant}`}>
      <span className="status-card__title">{title}</span>
      <span className="status-card__value">
        {value != null ? `${value}${unit}` : '—'}
      </span>
    </div>
  );
}
