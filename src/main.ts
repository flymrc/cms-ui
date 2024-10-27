import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";
import ElementPlus from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createLocaleI18n } from './i18n/locale.ts'

const app = createApp(App);

app.use(createLocaleI18n())
app.use(ElementPlus, { locale: zhCn });
app.mount("#app");
app.use(router);
