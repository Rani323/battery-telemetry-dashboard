export default function StatusCard({ title, value, unit = '', variant = 'default', icon }) {
  return (
    <div className={`status-card status-card--${variant}`}>
      <div className="status-card__content">
        <span className="status-card__title">{title}</span>
        <span className="status-card__value">
          {value != null ? `${value}${unit}` : '—'}
        </span>
      </div>
      {icon && (
        <img src={icon} alt="" className="status-card__icon" aria-hidden />
      )}
    </div>
  );
}
