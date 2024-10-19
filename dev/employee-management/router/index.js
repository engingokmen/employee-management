import {Router} from '@vaadin/router';

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes([
  {path: '/', component: 'employee-records'},
  {path: '/add-edit-employee', component: 'add-edit-employee'},
]);
