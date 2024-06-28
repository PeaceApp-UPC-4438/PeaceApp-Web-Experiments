import {createRouter, createWebHistory} from 'vue-router'

import Profile from "../pages/profile/profile.page.vue";
import editProfileAuthority from '../components/profile/government/authority-edit-profile.page.vue';
import ReportFormView from "../pages/reports/report-form.page.vue";
import Notification from '../pages/notifications/notifications.page.vue'
import Principal from '../pages/main/main.page.vue'
import muniReport from '../components/reports/authority-report-list.component.vue'
import reportList from '../components/reports/report-list.component.vue'
import passwordRecover from '../pages/recover/password-recover.page.vue'
import finalRecover from '../pages/recover/final-recover.page.vue'
import MapCitizen from '../components/maps/citizenmap/mapCitizen.vue'
import MapAuthority from "../components/maps/authoritymap/mapAuthority.vue";

const router= createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Principal},
        {path: '/:pathMatch(.*)*', redirect: '/'},//redirect to home page if path is not found
        {path: '/profile', component: Profile},
        {path: '/authority/edit-profile', component: editProfileAuthority},
        {path: '/authority/report', component: muniReport},
        {path: '/user/report', component: reportList, name: 'reportlist'},
        {path: '/user/create-report-form', component: ReportFormView},
        {path: '/notifications', component: Notification},
        {path: '/password-recover', component: passwordRecover},
        {path: '/recover', component: finalRecover},
        {path: '/user/map', component: MapCitizen},
        {path: '/authority/map', component: MapAuthority},
    ]
});

export default router;
