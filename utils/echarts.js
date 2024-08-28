import * as echarts from "echarts/core";

import {
  BarChart,
  GaugeChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
  ScatterChart,
  TreemapChart,
} from "echarts/charts";

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
} from "echarts/components";

import { SVGRenderer } from "echarts/renderers";

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart,
  GaugeChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  SVGRenderer,
  PictorialBarChart,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  ScatterChart,
  TreemapChart,
]);

export default echarts;

