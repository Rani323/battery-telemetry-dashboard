import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/formatTime';

const ROWS_PER_PAGE = 10;

export default function DataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data?.length]);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <section className="data-table">
        <h2 className="data-table__heading">Telemetry Data</h2>
        <p className="data-table__empty">No data available.</p>
      </section>
    );
  }

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
  const startIdx = (currentPage - 1) * ROWS_PER_PAGE;
  const endIdx = Math.min(startIdx + ROWS_PER_PAGE, data.length);
  const pageData = data.slice(startIdx, endIdx);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }
    for (const i of range) {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const showPagination = data.length > ROWS_PER_PAGE;

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
            {pageData.map((row, i) => (
              <tr key={row.time ?? startIdx + i}>
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
      {showPagination && (
        <div className="data-table__pagination">
          <span className="data-table__pagination-info">
            Showing {startIdx + 1}–{endIdx} of {data.length}
          </span>
          <div className="data-table__pagination-controls">
            <button
              type="button"
              className="data-table__pagination-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            <div className="data-table__pagination-numbers">
              {getPageNumbers().map((page, i) =>
                page === '...' ? (
                  <span key={`ellipsis-${i}`} className="data-table__pagination-ellipsis">…</span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    className={`data-table__pagination-num ${page === currentPage ? 'data-table__pagination-num--active' : ''}`}
                    onClick={() => goToPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              className="data-table__pagination-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
