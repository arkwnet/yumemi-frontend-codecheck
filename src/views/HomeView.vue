<template>
  <div>
    <Prefecture @change-prefecture="changePrefecture" />
    <Chart ref="chart" :options="chartOptions" />
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
        plotOptions: {
          series: {
            pointStart: 1960,
            pointInterval: 5,
          },
        },
        series: [],
      },
    };
  },
  methods: {
    changePrefecture: function (selectedPrefecture) {
      this.$refs.chart.hideChart()
      let vm = this;
      let output = [];
      let temp = vm.ResetTemp("Figure");
      for (let i = 0; i < selectedPrefecture.length; i++) {
        this.axios
          .get(
            "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
            {
              headers: { "X-API-KEY": import.meta.env.VITE_APIKEY },
              params: {
                prefCode: selectedPrefecture[i],
                cityCode: "-",
              },
            }
          )
          .then((response) => {
            for (let j = 0; j < response.data.result.data[0].data.length; j++) {
              temp.data.push(response.data.result.data[0].data[j].value);
            }
            output.push(temp);
            temp = vm.ResetTemp("Figure");
            if (i == selectedPrefecture.length - 1) {
              vm.chartOptions.series = output;
              vm.$refs.chart.updateChart();
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    ResetTemp: function (prefectureName) {
      return {name: prefectureName, data: []};
    }
  },
};
</script>
