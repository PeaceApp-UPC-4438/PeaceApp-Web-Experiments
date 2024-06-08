import {createRouter, createWebHistory} from 'vue-router'

import Authority from '../pages/profile/authority-profile.page.vue'
import User from '../pages/profile/user-profile.page.vue'
import Profile from "../pages/profile/main-profile.page.vue";
import MapCitizen from "../pages/maps/user-map.page.vue"
import MapGovernment from "../pages/maps/authority-map.page.vue"
import EditProfileView from '../pages/profile/user-edit-profile.page.vue';
import editProfileAuthority from '../pages/profile/authority-edit-profile.view.vue';
import ReportFormView from "../pages/reports/report-form.page.vue";
import SendAlert from "../components/alerts/send-alert.component.vue";
import Notification from '../pages/notifications/notifications.page.vue'
import Principal from '../pages/main/main.page.vue'
import muniReport from '../components/reports/authority-report-list.component.vue'
import reportList from '../components/reports/report-list.component.vue'
import passwordRecover from '../pages/recover/password-recover.page.vue'
import finalRecover from '../pages/recover/final-recover.page.vue'

const router= createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Principal},
        {path: '/:pathMatch(.*)*', redirect: '/'},//redirect to home page if path is not found
        {path: '/profile', component: Profile},
        {path: '/profile/user', component: User},
        {path: '/profile/authority', component: Authority},
        {path: '/user/map', component: MapCitizen, name: 'mapcitizen' },
        {path: '/user/edit-profile', component: EditProfileView},
        {path: '/authority/edit-profile', component: editProfileAuthority},
        {path: '/authority/report', component: muniReport},
        {path: '/user/report', component: reportList, name: 'reportlist'},
        {path: '/authority/map', component: MapGovernment, name: 'mapgovernment' },
        {path: '/user/create-report-form', component: ReportFormView},
        {path: '/view-notifications', component: SendAlert},
        {path: '/notifications', component: Notification},
        {path: '/password-recover', component: passwordRecover},
        {path: '/recover', component: finalRecover}
    ]
});

export default router;
