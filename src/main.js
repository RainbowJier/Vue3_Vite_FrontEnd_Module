import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/tailwind.css";

const app = createApp(App);

// 路由
import router from "@/router";
app.use(router);

// pinia
import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);

//ElmentUI
import ElementPlus from "element-plus";
app.use(ElementPlus, { size: "small", zIndex: 3000 });

app.mount("#app");
