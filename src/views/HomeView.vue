<template>
  <div>
    <Prefecture @change-prefecture="changePrefecture" />
    <Chart :options="chartOptions" />
  </div>
</template>

<script>
import Prefecture from "../components/Prefecture.vue";
import Chart from "../components/Chart.vue";
export default {
  name: "App",
  components: {
    Prefecture,
    Chart,
  },
  data() {
    return {
      chartOptions: {
        series: [
          {
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    changePrefecture: function (selectedPrefecture) {
      this.chartOptions.series[0].data = selectedPrefecture;
    },
  },
};
</script>
