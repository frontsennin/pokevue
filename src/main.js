import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ToastPlugin from 'vue-toast-notification';
import {LoadingPlugin} from 'vue-loading-overlay';
import './styles/main.scss';

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(ToastPlugin);
app.use(LoadingPlugin);

app.mount('#app');
