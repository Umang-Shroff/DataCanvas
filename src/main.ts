import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";

import { loadProject } from "./services/persistence";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");

// loading after mount
loadProject();
