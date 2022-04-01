import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import HighchartsVue from "highcharts-vue";

const app = createApp(App);

app.use(router).use(VueAxios, axios).use(HighchartsVue);

app.mount("#app");
