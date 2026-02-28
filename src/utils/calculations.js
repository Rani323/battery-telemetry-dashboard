/**
 * Compute average SoC from telemetry array.
 * @param {Array<{ soc: number }>} data
 * @returns {number}
 */
export function averageSoc(data) {
  if (!Array.isArray(data) || data.length === 0) return 0;
  const sum = data.reduce((acc, d) => acc + (d.soc ?? 0), 0);
  return Math.round(sum / data.length);
}

/**
 * Peak (max) voltage in the dataset.
 * @param {Array<{ battery_voltage: number }>} data
 * @returns {number|null}
 */
export function peakVoltage(data) {
  if (!Array.isArray(data) || data.length === 0) return null;
  const values = data.map((d) => d.battery_voltage).filter((v) => v != null);
  return values.length ? Math.max(...values) : null;
}

/**
 * Minimum voltage in the dataset.
 * @param {Array<{ battery_voltage: number }>} data
 * @returns {number|null}
 */
export function minVoltage(data) {
  if (!Array.isArray(data) || data.length === 0) return null;
  const values = data.map((d) => d.battery_voltage).filter((v) => v != null);
  return values.length ? Math.min(...values) : null;
}

/**
 * Peak (max absolute) current.
 * @param {Array<{ current: number }>} data
 * @returns {number|null}
 */
export function peakCurrent(data) {
  if (!Array.isArray(data) || data.length === 0) return null;
  const values = data.map((d) => Math.abs(d.current ?? 0));
  return values.length ? Math.max(...values) : null;
}

/**
 * Average temperature (ignores null).
 * @param {Array<{ battery_temp: number | null }>} data
 * @returns {number|null}
 */
export function averageTemp(data) {
  if (!Array.isArray(data) || data.length === 0) return null;
  const temps = data.map((d) => d.battery_temp).filter((t) => t != null);
  return temps.length ? Math.round((temps.reduce((a, b) => a + b, 0) / temps.length) * 10) / 10 : null;
}

/**
 * Latest SoC from sorted-by-time data.
 * @param {Array<{ time: number, soc: number }>} data
 * @returns {number|null}
 */
export function latestSoc(data) {
  if (!Array.isArray(data) || data.length === 0) return null;
  const sorted = [...data].sort((a, b) => (b.time ?? 0) - (a.time ?? 0));
  return sorted[0].soc ?? null;
}
