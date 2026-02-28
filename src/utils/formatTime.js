/**
 * Convert epoch timestamp (ms) to readable date/time string.
 * @param {number} epoch - Timestamp in milliseconds
 * @returns {string} Formatted date-time string
 */
export function formatTime(epoch) {
  if (epoch == null || typeof epoch !== 'number') return '—';
  const date = new Date(epoch);
  return date.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

/**
 * Format epoch for chart axis (short time).
 * @param {number} epoch
 * @returns {string}
 */
export function formatTimeShort(epoch) {
  if (epoch == null || typeof epoch !== 'number') return '';
  return new Date(epoch).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
