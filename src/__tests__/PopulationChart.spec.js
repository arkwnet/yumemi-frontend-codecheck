import { it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import PopulationChart from "../components/PopulationChart.vue";

const props = {
  chartOptions: {
    plotOptions: {
      series: {
        pointStart: 1960,
        pointInterval: 5,
      },
    },
    series: [],
  },
};
const wrapper = mount(PopulationChart, { props: props });

// コンポーネントを描画
it("Draw component", async () => {
  expect(wrapper.exists()).toBe(true);
  expect(wrapper.classes()).toContain("chart");
});

// Highchartsでグラフを生成
it("Generate chart by use Highcharts", async () => {
  expect(wrapper.find(".hc").exists()).toBe(true);
});
