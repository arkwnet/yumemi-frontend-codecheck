<template>
  <div class="chart">
    <highcharts v-if="showChart" class="hc" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { nextTick } from "vue";
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
  methods: {
    updateChart: function () {
      nextTick(() => {
        this.showChart = true;
      })
    },
    hideChart: function () {
      this.showChart = false;
    }
  }
};
</script>
