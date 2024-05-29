import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de haber importado Vue Router correctamente
import store from './store'; // Asegúrate de haber importado Vuex correctamente

const app = createApp(App);

app.use(router); // Utiliza Vue Router como un plugin
app.use(store); // Utiliza Vuex como un plugin

app.mount('#app');
