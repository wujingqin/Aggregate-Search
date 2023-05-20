import { createApp } from "vue";
import App from "./App.vue"; // 注意后缀问题
import router from "./router";
import Antd from "ant-design-vue";
import "./antd.css";

createApp(App).use(Antd).use(router).mount("#app");
