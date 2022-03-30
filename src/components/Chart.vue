<template>
  <div class="chart">
    <highcharts
      v-if="showChart"
      class="hc"
      :options="chartOptions"
    ></highcharts>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Chart",
  components: {},
  props: ["options"],
  data() {
    return {
      showChart: true,
      chartOptions: {},
    };
  },
  mounted: function () {
    this.chartOptions = this.options;
  },
};
</script>
