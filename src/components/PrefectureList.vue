<template>
  <div class="checkbox">
    <h1>都道府県</h1>
    <div v-for="prefecture in prefectures" :key="prefecture.prefCode">
      <input
        type="checkbox"
        :id="'prefCheck' + prefecture.prefCode"
        :value="prefecture.prefCode"
        v-model="selectedPrefecture"
      />
      <label
        :id="'prefLabel' + prefecture.prefCode"
        :for="'prefCheck' + prefecture.prefCode"
        >{{ prefecture.prefName }}</label
      >
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PrefectureList",
  components: {},
  emits: ["change-prefecture"],
  props: ["prefectures"],
  data() {
    return {
      selectedPrefecture: [],
    };
  },
  watch: {
    selectedPrefecture: function (newVal) {
      this.$emit("change-prefecture", newVal);
    },
  },
};
</script>
