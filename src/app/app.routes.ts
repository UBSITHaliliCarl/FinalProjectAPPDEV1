import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { inventoryList } from './inventory-list/inventory-list';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Carl² Enterprises Inventory"
  },
  {
    path: 'dashboard',
    component: inventoryList,
    title: "Dashboard | Carl² Enterprises Inventory"
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
