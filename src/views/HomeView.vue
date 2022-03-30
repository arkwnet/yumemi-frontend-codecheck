<template>
  <div>
    <Prefecture ref="prefecture" @change-prefecture="changePrefecture" />
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
      prefectures: [],
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
  mounted: function () {
    let vm = this;
    this.axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": import.meta.env.VITE_APIKEY },
      })
      .then((response) => {
        vm.prefectures = response.data.result;
        vm.$refs.prefecture.init(vm.prefectures);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    changePrefecture: function (selectedPrefecture) {
      let vm = this;
      let output = [];
      let count = 0;
      if (selectedPrefecture.length > 0) {
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
              let temp = {
                name: vm.prefectures[selectedPrefecture[i] - 1].prefName,
                data: [],
              };
              // eslint-disable-next-line prettier/prettier
              for (let j = 0; j < response.data.result.data[0].data.length; j++) {
                temp.data.push(response.data.result.data[0].data[j].value);
              }
              output.push(temp);
              count++;
              if (count >= selectedPrefecture.length) {
                vm.chartOptions.series = output;
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } else {
        vm.chartOptions.series = [];
      }
    },
  },
};
</script>
