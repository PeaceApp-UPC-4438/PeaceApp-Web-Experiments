import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import router from './router/index.js'
import PrimeVue from "primevue/config";
import "primeflex/primeflex.css";
import OrderList from "primevue/orderlist";
import Panel from "primevue/panel";
import Button from "primevue/button";
import Card from "primevue/card";
import Dialog from 'primevue/dialog';
import 'primevue/resources/themes/aura-light-green/theme.css';

import 'primeicons/primeicons.css'

import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";

import InputGroup from "primevue/inputgroup";

import { GoogleMap, Marker, HeatmapLayer} from "vue3-google-map";


createApp(App)
    .use(router)
    .use(PrimeVue, { ripple: true })
    .component('Dialog', Dialog)
    .component('pv-toolbar', Toolbar)
    .component('pv-button', Button)
    .component('pv-inputtext', InputText)
    .component('pv-inputgroup', InputGroup)
    .component('google-map', GoogleMap)
    .component('marker-map', Marker)
    .component('heatmap', HeatmapLayer)
    .component('pv-button', Button)
    .component('pv-panel', Panel)
    .component('pv-data-view', DataView)
    .component('pv-card', Card)
    .component('pv-order-list', OrderList)
    .mount('#app')
