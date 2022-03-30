<template>
  <div class="checkbox">
    <div v-for="prefecture in prefectures" :key="prefecture.prefCode">
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Prefecture",
  components: {},
  emits: ["change-prefecture"],
  data() {
    return {
      prefectures: [],
      selectedPrefecture: [],
    };
  },
  methods: {
    init: function (data) {
      this.prefectures = data;
    },
  },
  watch: {
    selectedPrefecture: function (newVal) {
      this.$emit("change-prefecture", newVal);
    },
  },
};
</script>
