<template>
  <Prefecture />
  <Chart />
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
    return {};
  },
};
</script>
