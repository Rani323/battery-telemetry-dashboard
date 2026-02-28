import { useEffect, useMemo, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { formatTimeShort } from '../../utils/formatTime';

export default function SocChart({ data }) {
  const chartDivRef = useRef(null);
  const rootRef = useRef(null);
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);

  const chartData = useMemo(
    () =>
      (data || []).map((d) => ({
    timeLabel: formatTimeShort(d.time),
    soc: d.soc,
      })),
    [data]
  );

  useEffect(() => {
    if (!chartDivRef.current) return;

    const root = am5.Root.new(chartDivRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

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
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: yRenderer,
      })
    );

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'SoC',
        xAxis,
        yAxis,
        categoryXField: 'timeLabel',
        valueYField: 'soc',
        tooltip: am5.Tooltip.new(root, { labelText: '{categoryX}: {valueY}%' }),
      })
    );
    series.strokes.template.setAll({ stroke: am5.color(0x3fb950), strokeWidth: 2 });

    series.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 3,
          fill: am5.color(0x3fb950),
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 2,
        }),
      })
    );

    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, { xAxis }));
    cursor.lineY.set('visible', false);

    rootRef.current = root;
    seriesRef.current = series;
    xAxisRef.current = xAxis;

    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    return () => {
      root.dispose();
      rootRef.current = null;
      seriesRef.current = null;
      xAxisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    xAxisRef.current?.data.setAll(chartData);
    seriesRef.current?.data.setAll(chartData);
  }, [chartData]);

  return (
    <div className="chart chart--soc">
      <h3 className="chart__title">State of Charge (%)</h3>
      <div ref={chartDivRef} className="chart__canvas" aria-label="State of Charge chart" />
    </div>
  );
}
