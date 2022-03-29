<template>
  <div class="chart">
    <highcharts v-if="showChart" class="hc" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
export default {
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
