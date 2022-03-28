<template>
  <div class="checkbox">
    <div v-for="prefecture in prefectures">
      <input
        type="checkbox"
        :id="'prefCheck' + prefecture.prefCode"
        :value="prefecture.prefCode"
        v-model="selectedPrefecture"
      />
      <label :for="'prefCheck' + prefecture.prefCode">{{
        prefecture.prefName
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prefecture",
  components: {},
  emits: ["change-prefecture"],
  data() {
    return {
      prefectures: [],
      selectedPrefecture: [],
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
      })
      .catch((e) => {
        console.log(e);
      });
  },
  watch: {
    selectedPrefecture: function (newVal, oldVal) {
      this.$emit("change-prefecture", newVal);
    },
  },
};
</script>
