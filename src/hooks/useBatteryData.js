import { useState, useEffect } from 'react';
import { BATTERY_DATA_URL } from '../utils/constants';
import {
  averageSoc,
  peakVoltage,
  minVoltage,
  peakCurrent,
  averageTemp,
  latestSoc,
} from '../utils/calculations';

/**
 * Fetches battery telemetry from static JSON and provides formatted data + stats.
 * @returns {{ data: Array, stats: Object, loading: boolean, error: string | null, refetch: function }}
 */
export function useBatteryData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BATTERY_DATA_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.json();
      const sorted = Array.isArray(raw)
        ? [...raw].sort((a, b) => (a.time ?? 0) - (b.time ?? 0))
        : [];
      setData(sorted);
    } catch (e) {
      setError(e.message || 'Failed to load battery data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = {
    averageSoc: averageSoc(data),
    latestSoc: latestSoc(data),
    peakVoltage: peakVoltage(data),
    minVoltage: minVoltage(data),
    peakCurrent: peakCurrent(data),
    averageTemp: averageTemp(data),
  };

  return { data, stats, loading, error, refetch: fetchData };
}
