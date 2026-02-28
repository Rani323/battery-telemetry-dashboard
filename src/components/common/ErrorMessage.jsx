export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button type="button" className="error-message__retry" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
