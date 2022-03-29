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
  methods: {
    init: function (data) {
      this.prefectures = data;
    }
  },
  watch: {
    selectedPrefecture: function (newVal, oldVal) {
      this.$emit("change-prefecture", newVal);
    },
  },
};
</script>
