<template>
  <div class="chart">
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
export default {
  name: "Chart",
  components: {},
  props: ["options"],
  data() {
    return {
      chartOptions: {},
    };
  },
  mounted: function () {
    this.chartOptions = this.options;
  },
};
</script>
