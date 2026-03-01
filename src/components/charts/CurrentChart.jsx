import { useEffect, useMemo, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { formatTimeShort } from '../../utils/formatTime';

export default function CurrentChart({ data }) {
  const chartDivRef = useRef(null);
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);

  const chartData = useMemo(
    () =>
      (data || []).map((d) => ({
    timeLabel: formatTimeShort(d.time),
    current: d.current,
      })),
    [data]
  );

  useEffect(() => {
    if (!chartDivRef.current) return;

    const root = am5.Root.new(chartDivRef.current);
    root.setThemes([am5themes_Animated.new(root)]);
    setTimeout(() => root._logo?.dispose(), 100);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
      })
    );

    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({ fill: am5.color(0x8b949e), fontSize: 12 });
    xRenderer.grid.template.setAll({ stroke: am5.color(0x2d3a4f), strokeOpacity: 0.6 });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'timeLabel',
        renderer: xRenderer,
      })
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.labels.template.setAll({ fill: am5.color(0x8b949e), fontSize: 12 });
    yRenderer.grid.template.setAll({ stroke: am5.color(0x2d3a4f), strokeOpacity: 0.6 });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
      })
    );

    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Current',
        xAxis,
        yAxis,
        categoryXField: 'timeLabel',
        valueYField: 'current',
        tooltip: am5.Tooltip.new(root, { labelText: '{categoryX}: {valueY} A' }),
      })
    );
    series.strokes.template.setAll({ stroke: am5.color(0xd2a8ff), strokeWidth: 2.5 });

    series.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: am5.color(0xd2a8ff),
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 2,
        }),
      })
    );

    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, { xAxis }));
    cursor.lineY.set('visible', false);

    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    xAxisRef.current = xAxis;
    seriesRef.current = series;

    return () => {
      root.dispose();
      xAxisRef.current = null;
      seriesRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    xAxisRef.current?.data.setAll(chartData);
    seriesRef.current?.data.setAll(chartData);
  }, [chartData]);

  return (
    <div className="chart chart--current">
      <h3 className="chart__title">Current (A)</h3>
      <div ref={chartDivRef} className="chart__canvas" aria-label="Current chart" />
    </div>
  );
}
