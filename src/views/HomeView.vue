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
        plotOptions: {
          series: {
            pointStart: 1960,
            pointInterval: 5,
          },
        },
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
      let vm = this;
      let output = [];
      this.axios
        .get(
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
          {
            headers: { "X-API-KEY": import.meta.env.VITE_APIKEY },
            params: {
              prefCode: selectedPrefecture[0],
              cityCode: "-",
            },
          }
        )
        .then((response) => {
          for (let i = 0; i < response.data.result.data[0].data.length; i++) {
            output.push(response.data.result.data[0].data[i].value);
          }
          vm.chartOptions.series[0].data = output;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
