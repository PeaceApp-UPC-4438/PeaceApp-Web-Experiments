import {createRouter, createWebHistory} from 'vue-router'

import Profile from "../pages/profile/profile.page.vue";
import ReportFormView from "../pages/reports/report-form.page.vue";
import Principal from '../pages/main/main.page.vue'
import UserReportListComponent from '../components/reports/user-report-list.component.vue'
import reportList from '../components/reports/report-list.component.vue'
import passwordRecover from '../pages/recover/password-recover.page.vue'
import finalRecover from '../pages/recover/final-recover.page.vue'
import MapCitizen from '../components/maps/citizenmap/mapCitizen.vue'
import ViewNotificationsComponent from "../components/notifications/view-notifications.component.vue";
import ReportComment from "../pages/reportComments/report-comments.vue";
const router= createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Principal},
        {path: '/:pathMatch(.*)*', redirect: '/'},//redirect to home page if path is not found
        {path: '/profile', component: Profile},
        {path: '/authority/report', component: UserReportListComponent},
        {path: '/user/report', component: reportList, name: 'reports'},
        {path: '/user/create-report-form', component: ReportFormView},
        {path: '/password-recover', component: passwordRecover},
        {path: '/recover', component: finalRecover},
        {path: '/user/map', component: MapCitizen},
        {path: '/user/notifications', component: ViewNotificationsComponent},
        { path: '/user/report/:reportId/comments', component: ReportComment, name: 'report-comments' },
    ]
});

export default router;
